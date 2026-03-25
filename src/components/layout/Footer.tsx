import { Link } from 'react-router-dom';
import { Plane, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-primary/10 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <Plane className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-gradient">旅途小记</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/diary" className="hover:text-primary transition-colors">旅行日记</Link>
            <Link to="/guide" className="hover:text-primary transition-colors">目的地攻略</Link>
            <Link to="/map" className="hover:text-primary transition-colors">旅行地图</Link>
            <Link to="/about" className="hover:text-primary transition-colors">关于我</Link>
            <Link to="/guestbook" className="hover:text-primary transition-colors">留言板</Link>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {['📸', '🌸', '✈️'].map((emoji, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full bg-cream flex items-center justify-center text-base hover:scale-110 transition-transform cursor-pointer"
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-400 flex items-center justify-center gap-1">
          <span>用</span>
          <Heart className="w-3.5 h-3.5 fill-primary text-primary" />
          <span>记录每一段旅程 · © 2024 旅途小记</span>
        </div>
      </div>
    </footer>
  );
}
