"use client";

import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '@/components/Navbar';
import L from 'leaflet';

// Use Leaflet’s default marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Hardcoded festival data (add descriptions as needed)
const festivalData = [
  { id: 1, name: 'Holi', date: '2025-07-11', coords: [28.6139, 77.2090], image: 'https://source.unsplash.com/200x150/?holi', description: 'Festival of colors in India.' },
  { id: 2, name: 'Diwali', date: '2025-11-02', coords: [19.0760, 72.8777], image: 'https://source.unsplash.com/200x150/?diwali', description: 'Festival of lights celebrated across India.' },
  { id: 3, name: 'Oktoberfest', date: '2025-10-03', coords: [48.1351, 11.5820], image: 'https://source.unsplash.com/200x150/?oktoberfest', description: 'Beer festival in Munich, Germany.' },
  { id: 4, name: 'Carnival', date: '2025-02-15', coords: [-22.9068, -43.1729], image: 'https://source.unsplash.com/200x150/?carnival', description: 'Rio de Janeiro Carnival, Brazil.' },
  { id: 5, name: 'Songkran', date: '2025-04-13', coords: [13.7563, 100.5018], image: 'https://source.unsplash.com/200x150/?songkran', description: 'Thai New Year water festival.' },
];

export default function SectionMap() {
  const [date, setDate] = React.useState(null);
  const [markers, setMarkers] = React.useState([]);
  const [selectedFestival, setSelectedFestival] = React.useState(null);

  React.useEffect(() => {
    if (!date) {
      setMarkers([]);
      return;
    }
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd}`;
    setMarkers(festivalData.filter(f => f.date === formatted));
  }, [date]);

  return (
    <>
      <Navbar />

      {/* Map & Calendar Section */}
      <section id="section-map" className="flex flex-col md:flex-row w-full p-2 h-[60vh] overflow-hidden">
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
            center={[20.5937, 78.9629]}
            zoom={4}
            scrollWheelZoom
            style={{ height: '100%', width: '100%' }}
          >
<TileLayer
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
  attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors'
/>
            {markers.map(f => (
              <Marker key={f.id} position={f.coords} icon={customIcon}>
                <Popup>{f.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>

      {/* Featured Festivals Grid */}
      <section className="w-full p-4 bg-gray-200">
        <h2 className="text-xl font-semibold mb-3 text-black">Featured Festivals</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {festivalData.map(f => (
            <div
              key={f.id}
              onClick={() => setSelectedFestival(f)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition"
            >
              <img src={f.image} alt={f.name} className="w-full h-32 object-cover" />
              <div className="p-2">
                <h3 className="text-base font-bold">{f.name}</h3>
                <p className="text-xs text-gray-600">{f.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Overlay (20% black) */}
      {selectedFestival && (
  <div
    className="fixed inset-0 bg-black/20 flex items-center justify-center z-[1000]"
    onClick={() => setSelectedFestival(null)}
  >
    <div
      className="bg-white rounded-2xl p-8 max-w-5xl w-11/12 max-h-[90vh] overflow-y-auto relative shadow-2xl"
      onClick={e => e.stopPropagation()}
    >
      <button
        onClick={() => setSelectedFestival(null)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
      >
        ✕
      </button>

      <img
        src={selectedFestival.image}
        alt={selectedFestival.name}
        className="w-full h-72 object-cover rounded-lg mb-6"
      />
      <h3 className="text-3xl font-bold mb-4">{selectedFestival.name}</h3>
      <p className="text-base text-gray-600 mb-2">
        Date: <strong>{selectedFestival.date}</strong>
      </p>
      <p className="text-base text-gray-600 mb-6">
        Location: <strong>{selectedFestival.coords.join(', ')}</strong>
      </p>
      <p className="text-lg text-gray-700">{selectedFestival.description}</p>
    </div>
  </div>
)}

    </>
  );
}
