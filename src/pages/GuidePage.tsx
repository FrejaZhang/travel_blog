import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { guides } from '../data/guides';
import SearchBar from '../components/ui/SearchBar';
import TagBadge from '../components/ui/TagBadge';

const allCategories = Array.from(new Set(guides.map((g) => g.category)));

export default function GuidePage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  const filtered = useMemo(() => {
    return guides.filter((g) => {
      const matchSearch = !query || g.title.includes(query) || g.destination.includes(query) || g.country.includes(query);
      const matchCat = !activeCategory || g.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen bg-cream pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-mint/30 to-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-6 left-12 text-4xl animate-float">🗺️</div>
        <div className="absolute top-8 right-16 text-3xl animate-float" style={{ animationDelay: '1s' }}>🧭</div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-gray-800 mb-3">🧭 目的地攻略</h1>
          <p className="text-gray-500 text-lg">精心整理的旅行干货，出发前必读</p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Filter */}
        <div className="bg-white rounded-3xl p-6 shadow-soft mb-8">
          <div className="max-w-lg mb-5">
            <SearchBar value={query} onChange={setQuery} placeholder="搜索目的地、攻略关键词…" />
          </div>
          <div className="flex flex-wrap gap-2">
            <TagBadge label="全部" active={activeCategory === ''} onClick={() => setActiveCategory('')} />
            {allCategories.map((cat) => (
              <TagBadge key={cat} label={cat} active={activeCategory === cat} onClick={() => setActiveCategory(activeCategory === cat ? '' : cat)} />
            ))}
          </div>
        </div>

        {/* Guide Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((guide, i) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300"
            >
              <Link to={`/guide/${guide.slug}`}>
                <div className="relative overflow-hidden h-48">
                  <img
                    src={guide.coverImage}
                    alt={guide.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{guide.destination}, {guide.country}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-mint text-teal-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    {guide.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-gray-800 mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-6">{guide.summary}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {guide.tags.slice(0, 2).map((tag) => <TagBadge key={tag} label={tag} />)}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {guide.readTime} 分钟
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    阅读攻略 <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <div className="text-5xl mb-4">🧭</div>
            <p>暂无相关攻略，先去探索吧~</p>
          </div>
        )}
      </div>
    </div>
  );
}
