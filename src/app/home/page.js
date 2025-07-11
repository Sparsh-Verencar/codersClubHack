'use client'
import React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Navbar from '@/components/Navbar'
import L from 'leaflet';

// Use Leaflet’s default marker icon (the classic pin)
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});


// Demo festival list; swap this out for your real API call
const festivalData = [
  { id: 1, name: 'Holi', date: '2025-07-11', coords: [28.6139, 77.2090] },
  { id: 2, name: 'Diwali', date: '2025-11-02', coords: [19.0760, 72.8777] },
  { id: 3, name: 'Oktoberfest', date: '2025-10-03', coords: [48.1351, 11.5820] },
  // …more…
];

export default function SectionMap() {
  const [date, setDate] = React.useState(null);
  const [markers, setMarkers] = React.useState([]);

  React.useEffect(() => {
    if (!date) return setMarkers([]);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd}`;

    const todaysFestivals = festivalData.filter(f => f.date === formatted);
    setMarkers(todaysFestivals);
  }, [date]);

  return (
    <>
      <Navbar />
      <section
        id="section-map"
        className="flex flex-col md:flex-row w-full p-2 h-[60vh] overflow-hidden"
      >
        {/* Calendar Panel */}
        <div className="w-full md:w-1/3 p-4 shadow-md flex justify-center items-center overflow-auto">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-[90%] max-w-[300px] h-auto max-h-full"
          />
        </div>

        {/* Map Panel */}
        <div className="w-full md:w-2/3 h-1/2 md:h-full relative">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={5}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {markers.map(f => (
              <Marker key={f.id} position={f.coords} icon={customIcon}>
                <Popup>{f.name}</Popup>
              </Marker>

            ))}
          </MapContainer>
        </div>
      </section>
    </>
  )
}
