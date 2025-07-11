"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import { Calendar } from "@/components/ui/calendar";
import TiltedCard from "@/components/Components/TiltedCard/TiltedCard";

const Test = () => {
  const [date, setDate] = React.useState(new Date());
  const [festivals, setFestivals] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchFromHolidayAPI = async (year, month, day) => {
    try {
      const response = await fetch(
        `https://date.nager.at/api/v3/PublicHolidays/${year}/US`
      );
      const holidays = await response.json();
      return holidays.filter(holiday => {
        const d = new Date(holiday.date);
        return d.getMonth() + 1 === month && d.getDate() === day;
      }).map(holiday => ({
        name: holiday.name,
        description: holiday.localName || "",
        source: "Holiday API"
      }));
    } catch (error) {
      console.error("Holiday API error:", error);
      return [];
    }
  };

  const fetchFromWikipedia = async (monthName, day) => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/html/${monthName}_${day}`
      );
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      
      // Find the holidays section more reliably
      const sections = Array.from(doc.querySelectorAll("h2"));
      const holidaysHeading = sections.find(h2 => 
        ["Holidays and observances", "Observances"].some(
          text => h2.textContent?.toLowerCase().includes(text.toLowerCase())
      ));

      if (!holidaysHeading) return [];

      const listItems = [];
      let nextElement = holidaysHeading.nextElementSibling;
      
      while (nextElement && !["H2", "H3"].includes(nextElement.tagName)) {
        if (nextElement.tagName === "UL") {
          listItems.push(...Array.from(nextElement.querySelectorAll("li")));
        }
        nextElement = nextElement.nextElementSibling;
      }

      return listItems.map(li => ({
        name: li.textContent?.split(/[;(\[]/)[0].trim() || "",
        description: "",
        source: "Wikipedia"
      }));
    } catch (error) {
      console.error("Wikipedia error:", error);
      return [];
    }
  };

  const fetchFestivals = async (selectedDate) => {
    setLoading(true);
    setFestivals([]);
    
    try {
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();
      const monthName = monthNames[selectedDate.getMonth()];

      // Try multiple sources in parallel
      const [apiResults, wikiResults] = await Promise.all([
        fetchFromHolidayAPI(year, month, day),
        fetchFromWikipedia(monthName, day)
      ]);

      // Combine and deduplicate results
      const combined = [...apiResults, ...wikiResults];
      const uniqueFestivals = combined.filter(
        (festival, index, self) =>
          index === self.findIndex(f => 
            f.name.toLowerCase() === festival.name.toLowerCase()
          )
      );

      // Add default image based on festival name
      const withImages = uniqueFestivals.map(festival => ({
        ...festival,
        imageUrl: getFestivalImage(festival.name)
      }));

      setFestivals(withImages);
    } catch (error) {
      console.error("Error fetching festivals:", error);
      setFestivals([]);
    } finally {
      setLoading(false);
    }
  };

  const getFestivalImage = (name) => {
    const lowerName = name.toLowerCase();
    if (/christmas|nativity|xmas/i.test(lowerName)) return "/christmas.webp";
    if (/new year|eve|january 1/i.test(lowerName)) return "/newyear.webp";
    if (/easter/i.test(lowerName)) return "/easter.webp";
    if (/thanksgiving/i.test(lowerName)) return "/thanksgiving.webp";
    if (/holi/i.test(lowerName)) return "/holi.webp";
    return "/default-festival.webp";
  };

  const handleDateSelect = (selectedDate) => {
    if (!selectedDate) return;
    setDate(selectedDate);
    fetchFestivals(selectedDate);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground">
      <div className="w-screen flex items-center justify-center">
        <Navbar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 flex-grow bg-background text-foreground">
        <div className="flex items-center justify-center bg-card text-card-foreground p-4 rounded-lg shadow-md">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="w-[40vw] rounded-lg border border-border bg-popover text-popover-foreground"
          />
        </div>

        <div className="h-screen overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 bg-background text-foreground p-4 rounded-lg shadow-md border border-border">
          {loading ? (
            <div className="col-span-2 flex items-center justify-center">
              <p>Loading festivals...</p>
            </div>
          ) : festivals.length > 0 ? (
            festivals.map((festival, index) => (
              <TiltedCard
                key={index}
                className="bg-card text-card-foreground"
                imageSrc={festival.imageUrl}
                captionText={festival.name}
                overlayContent={festival.description || `Source: ${festival.source}`}
                rotateAmplitude={index % 2 === 0 ? 10 : 5}
              >
                <div className="p-4">
                  <h3 className="text-lg font-bold">{festival.name}</h3>
                  <p className="text-sm mt-2">
                    {festival.description || `From ${festival.source}`}
                  </p>
                </div>
              </TiltedCard>
            ))
          ) : (
            <div className="col-span-2 flex items-center justify-center">
              <p>No festivals found for this date</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;