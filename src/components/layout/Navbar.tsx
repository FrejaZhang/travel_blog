import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane } from 'lucide-react';

const navItems = [
  { label: '旅行日记', path: '/diary' },
  { label: '目的地攻略', path: '/guide' },
  { label: '旅行地图', path: '/map' },
  { label: '关于我', path: '/about' },
  { label: '留言板', path: '/guestbook' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-soft border-b border-primary/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
            <Plane className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-700 text-xl text-gradient">旅途小记</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  active
                    ? 'bg-primary text-white shadow-soft'
                    : 'text-gray-600 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5 text-primary" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-primary/10 px-4 py-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                  active ? 'bg-primary text-white' : 'text-gray-600 hover:bg-primary/10'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
