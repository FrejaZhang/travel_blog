import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mapPoints } from '../data/mapPoints';
import { diaries } from '../data/diaries';
import { ArrowRight, Globe, MapPin, BookOpen } from 'lucide-react';

// Fix leaflet default icon
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const customIcon = new L.DivIcon({
  html: `<div style="
    width:32px;height:32px;border-radius:50%;
    background:linear-gradient(135deg,#FF8FB1,#FF6B9D);
    border:3px solid white;
    box-shadow:0 4px 12px rgba(255,143,177,0.5);
    display:flex;align-items:center;justify-content:center;
    font-size:14px;
  ">✈️</div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -20],
});

export default function MapPage() {
  const [loaded, setLoaded] = useState(false);
  const countries = new Set(diaries.map((d) => d.country)).size;

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-cream pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-mint/20 to-white py-12 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-gray-800 mb-3">🗺️ 旅行地图</h1>
          <p className="text-gray-500">每一个标记，都是一段故事的起点</p>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { icon: <Globe className="w-5 h-5" />, value: countries, label: '个国家' },
            { icon: <MapPin className="w-5 h-5" />, value: mapPoints.length, label: '座城市' },
            { icon: <BookOpen className="w-5 h-5" />, value: diaries.length, label: '篇日记' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-soft text-center">
              <div className="flex justify-center text-primary mb-1">{s.icon}</div>
              <div className="font-display font-extrabold text-2xl text-primary">{s.value}</div>
              <div className="text-xs text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <div className="rounded-3xl overflow-hidden shadow-hover" style={{ height: '500px' }}>
          {loaded && (
            <MapContainer
              center={[25, 50]}
              zoom={2}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {mapPoints.map((point) => (
                <Marker key={point.id} position={[point.lat, point.lng]} icon={customIcon}>
                  <Popup>
                    <div className="w-48">
                      <img src={point.coverImage} alt={point.title} className="w-full h-24 object-cover rounded-lg mb-2" />
                      <div className="font-bold text-sm text-gray-800 mb-1">{point.title}</div>
                      <div className="text-xs text-gray-500 mb-2">📍 {point.destination}, {point.country}</div>
                      <a
                        href={`/diary/${point.slug}`}
                        className="inline-flex items-center gap-1 text-xs text-white bg-primary px-3 py-1.5 rounded-full hover:bg-primary-dark transition-colors"
                      >
                        查看日记 <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>

        {/* Destination list */}
        <h2 className="font-display font-bold text-2xl text-gray-800 mt-10 mb-5">📍 打卡城市列表</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {mapPoints.map((point, i) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/diary/${point.slug}`}
                className="group flex items-center gap-3 bg-white rounded-2xl p-4 shadow-soft hover:shadow-hover transition-all hover:-translate-y-0.5"
              >
                <img src={point.coverImage} alt={point.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-semibold text-gray-800 text-sm truncate group-hover:text-primary transition-colors">
                    {point.destination}
                  </div>
                  <div className="text-xs text-gray-400">{point.country}</div>
                  <div className="text-xs text-primary mt-0.5 truncate">{point.title}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors flex-shrink-0 ml-auto" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
