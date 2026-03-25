import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { diaries } from '../data/diaries';
import ArticleCard from '../components/ui/ArticleCard';
import SearchBar from '../components/ui/SearchBar';
import TagBadge from '../components/ui/TagBadge';

const allTags = Array.from(new Set(diaries.flatMap((d) => d.tags)));

export default function DiaryListPage() {
  const [searchParams] = useSearchParams();
  const initialTag = searchParams.get('tag') || '';
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState(initialTag);

  const filtered = useMemo(() => {
    return diaries.filter((d) => {
      const matchSearch = !query || d.title.includes(query) || d.destination.includes(query) || d.country.includes(query);
      const matchTag = !activeTag || d.tags.includes(activeTag);
      return matchSearch && matchTag;
    });
  }, [query, activeTag]);

  return (
    <div className="min-h-screen bg-cream pt-16">
      {/* Page header */}
      <div className="bg-gradient-to-br from-cream-pink to-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-4 left-10 text-4xl animate-float">📖</div>
        <div className="absolute top-8 right-16 text-3xl animate-float" style={{ animationDelay: '1s' }}>✈️</div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-gray-800 mb-3">
            🌸 旅行日记
          </h1>
          <p className="text-gray-500 text-lg">共 {diaries.length} 篇旅行故事，等你来读</p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Search & Filter */}
        <div className="bg-white rounded-3xl p-6 shadow-soft mb-8">
          <div className="max-w-lg mb-5">
            <SearchBar value={query} onChange={setQuery} placeholder="搜索目的地、国家、关键词…" />
          </div>
          <div className="flex flex-wrap gap-2">
            <TagBadge
              label="全部"
              active={activeTag === ''}
              onClick={() => setActiveTag('')}
            />
            {allTags.map((tag) => (
              <TagBadge
                key={tag}
                label={tag}
                active={activeTag === tag}
                onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
              />
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 text-sm text-gray-400">
          找到 <span className="text-primary font-semibold">{filtered.length}</span> 篇日记
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p>没有找到相关日记，换个关键词试试吧~</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((diary, i) => (
              <ArticleCard key={diary.id} {...diary} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
