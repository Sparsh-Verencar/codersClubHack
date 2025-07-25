"use client";

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '@/components/Navbar.jsx';
import L from 'leaflet';
import { Skeleton } from "@/components/ui/skeleton.jsx"

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const hardcodedFestivalData = [
  { id: 1, name: 'Holi', date: '2025-07-11', coords: [28.6139, 77.2090], countryCode: 'in', description: 'Festival of colors in India.' },
  { id: 2, name: 'Diwali', date: '2025-11-02', coords: [19.0760, 72.8777], countryCode: 'in', description: 'Festival of lights celebrated across India.' },
  { id: 3, name: 'Oktoberfest', date: '2025-10-03', coords: [48.1351, 11.5820], countryCode: 'de', description: 'Beer festival in Munich, Germany.' },
  { id: 4, name: 'Carnival', date: '2025-02-15', coords: [-22.9068, -43.1729], countryCode: 'br', description: 'Rio de Janeiro Carnival, Brazil.' },
  { id: 5, name: 'Songkran', date: '2025-04-13', coords: [13.7563, 100.5018], countryCode: 'th', description: 'Thai New Year water festival.' },
];

const geocodePlace = async (place) => {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place)}&format=json&limit=1`, {
      headers: {
        'User-Agent': 'FestivalCalendarApp/1.0 (your_email@example.com)',
      },
    });
    const data = await res.json();
    if (data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
  } catch (err) {
    console.error("Geocoding error:", err);
  }
  return [20.5937, 78.9629]; 
};

const reverseGeocodeCountryCode = async (lat, lon) => {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`, {
      headers: {
        'User-Agent': 'FestivalCalendarApp/1.0 (your_email@example.com)',
      },
    });
    const data = await res.json();
    return data.address?.country_code || 'us';
  } catch (err) {
    console.error('Reverse geocoding error:', err);
    return 'us';
  }
};

const getFestivalImage = (name, countryCode = 'us') => {
  if (!name) return {
    url: 'https://source.unsplash.com/200x150/?festival',
    fallback: `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`,
  };

  const keyword = name
    .split(/[\u2013:–-]/)[0]
    .replace(/[^À-ɏ\w\s]/g, '')
    .split(' ')
    .slice(0, 2)
    .join(' ');

  return {
    url: `https://source.unsplash.com/200x150/?${encodeURIComponent(keyword)},festival`,
    fallback: `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`,
  };
};

const fetchFromHolidayAPI = async (year, month, day) => {
  try {
    const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/US`);
    const list = await res.json();
    const filtered = list.filter(h => {
      const d = new Date(h.date);
      return d.getFullYear() === year && d.getMonth() + 1 === month && d.getDate() === day;
    });

    return await Promise.all(
      filtered.map(async h => {
        const coords = await geocodePlace(h.name);
        const countryCode = await reverseGeocodeCountryCode(coords[0], coords[1]);
        return {
          id: `holiday-${h.date}`,
          name: h.name,
          date: h.date,
          coords,
          description: h.localName || '',
          countryCode,
          image: getFestivalImage(h.name, countryCode),
        };
      })
    );
  } catch (err) {
    console.error("Holiday API error:", err);
    return [];
  }
};

const fetchFromWikipedia = async (monthName, day, year) => {
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/html/${monthName}_${day}`);
    const html = await res.text();

    if (typeof window === 'undefined') return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const heading = Array.from(doc.querySelectorAll('h2')).find(h => /Holidays and observances/i.test(h.textContent || ''));
    if (!heading) return [];

    const items = [];
    let sib = heading.nextElementSibling;
    while (sib && !/^H[2-3]$/.test(sib.tagName)) {
      if (sib.tagName === 'UL') {
        const liElements = Array.from(sib.querySelectorAll('li'));
        for (const li of liElements) {
          const name = li.textContent.split(/[;([\n]/)[0].trim();
          const desc = li.textContent.trim();
          const possiblePlace = /in ([A-Z][a-z]+(?: [A-Z][a-z]+)*)/.exec(desc)?.[1];
          const coords = possiblePlace ? await geocodePlace(possiblePlace) : await geocodePlace(name);
          const countryCode = await reverseGeocodeCountryCode(coords[0], coords[1]);
          const image = getFestivalImage(name, countryCode);
          items.push({
            id: `wiki-${monthName}-${day}-${items.length}`,
            name,
            date: `${year}-${String(new Date(`${monthName} 1`).getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
            coords,
            description: desc,
            countryCode,
            image,
          });
        }
      }
      sib = sib.nextElementSibling;
    }
    return items;
  } catch (err) {
    console.error("Wikipedia error:", err);
    return [];
  }
};


export default function FestivalCalendar() {
  const [date, setDate] = useState(null);
  const [festivals, setFestivals] = useState([]);
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFestivals = async (selectedDate) => {
    if (!selectedDate) return;
    setLoading(true);

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    const monthName = selectedDate.toLocaleDateString('en-US', { month: 'long' });
    const isoDate = `${ year } - ${ String(month).padStart(2, '0') } - ${ String(day).padStart(2, '0') }`;

    const hardcoded = hardcodedFestivalData.filter(f => f.date === isoDate).map(f => ({
      ...f,
      image: getFestivalImage(f.name, f.countryCode),
    }));
    if (hardcoded.length > 0) {
      setFestivals(hardcoded);
      setLoading(false);
      return;
    }

    const [api, wiki] = await Promise.all([
      fetchFromHolidayAPI(year, month, day),
      fetchFromWikipedia(monthName, day, year)
    ]);

    const combined = [...api, ...wiki];
    const unique = combined.filter((f, i, arr) => i === arr.findIndex(o => o.name.toLowerCase() === f.name.toLowerCase()));

    const fallback = unique.length > 0 ? unique : [{
      id: 'none',
      name: 'No major festivals found',
      date: isoDate,
      coords: [20.5937, 78.9629],
      description: 'Check back later or try another date.',
      image: getFestivalImage('calendar', 'us'),
    }];

    setFestivals(fallback);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <section className="flex flex-col md:flex-row h-[60vh]">
        <div className="md:w-1/3 p-4 flex items-center justify-center">
          <Calendar selected={date} onSelect={(d) => { setDate(d); fetchFestivals(d); }} mode="single" />
        </div>
        <div className="md:w-2/3 -z-0">
          <MapContainer center={[20.5937, 78.9629]} zoom={4} minZoom={2} maxZoom={10} style={{ height: '100%' }} maxBounds={[[ -90, -180 ], [ 90, 180 ]]}>            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors'
            />
            {festivals.map(f => (
              <Marker key={f.id} position={f.coords} icon={customIcon}>
                <Popup>{f.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>

      <section className="p-4 bg-background">
        <h2 className="text-xl font-semibold mb-4">
          {date ? `Festivals on ${ date.toLocaleDateString() }` : 'Select a date'}
        </h2>

        {loading ? (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {festivals.map(f => (
              <div key={f.id} onClick={() => setSelectedFestival(f)} className="bg-card rounded-lg shadow cursor-pointer hover:shadow-xl">
                <img
                  src={f.image.url}
                  alt={f.name}
                  className="w-full h-32 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = f.image.fallback;
                  }}
                />
                <div className="p-3">
                  <h3 className="text-lg font-bold">{f.name}</h3>
                  <p className="text-sm text-primary">Date: {f.date}</p>
                  <p className="text-sm text-primary">Location: {f.coords.join(', ')}</p>
                  <p className="text-sm text-primary mt-1">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {selectedFestival && (
        <div className="fixed inset-0 z-50 bg-black/40 overflow-auto flex justify-center items-center p-4" onClick={() => setSelectedFestival(null)}>
          <div className="bg-card rounded-xl p-6 max-w-2xl w-full shadow-lg relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-2xl" onClick={() => setSelectedFestival(null)}>
              ✕
            </button>
            <img
              src={selectedFestival.image.url}
              alt={selectedFestival.name}
              className="w-full h-64 object-cover rounded mb-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = selectedFestival.image.fallback;
              }}
            />
            <h2 className="text-2xl font-bold mb-2">{selectedFestival.name}</h2>
            <p>
              <strong>Date:</strong> {selectedFestival.date}
            </p>
            <p>
              <strong>Location:</strong> {selectedFestival.coords.join(', ')}
            </p>
            <p className="mt-2">{selectedFestival.description}</p>
          </div>
        </div>

      )}
    </>
  );
}
