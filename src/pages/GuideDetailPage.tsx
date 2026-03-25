import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, Car, Home, Calendar, Banknote } from 'lucide-react';
import { guides } from '../data/guides';
import TagBadge from '../components/ui/TagBadge';

export default function GuideDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const guide = guides.find((g) => g.slug === slug);

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">😢</div>
          <p className="text-gray-500">找不到这篇攻略</p>
          <Link to="/guide" className="mt-4 text-primary underline">返回攻略列表</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-16">
      {/* Cover */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img src={guide.coverImage} alt={guide.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
            <MapPin className="w-4 h-4" />
            {guide.destination}, {guide.country}
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-2">{guide.title}</h1>
          <div className="flex items-center gap-4 text-white/70 text-sm">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{guide.publishDate}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />阅读约 {guide.readTime} 分钟</span>
          </div>
        </div>
        <Link
          to="/guide"
          className="absolute top-20 left-4 md:left-8 flex items-center gap-1.5 text-white/80 hover:text-white text-sm bg-black/20 rounded-full px-3 py-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />返回
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Quick info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {[
            { icon: <Car className="w-4 h-4" />, label: '交通', value: guide.traffic.slice(0, 16) + (guide.traffic.length > 16 ? '…' : '') },
            { icon: <Home className="w-4 h-4" />, label: '住宿', value: guide.accommodation.slice(0, 16) + '…' },
            { icon: <Calendar className="w-4 h-4" />, label: '最佳季节', value: guide.bestSeason.split('（')[0] },
            { icon: <Banknote className="w-4 h-4" />, label: '日均预算', value: `¥${guide.avgBudget}/天` },
          ].map((item, i) => (
            <div key={i} className="bg-mint/20 rounded-2xl p-4">
              <div className="flex items-center gap-1.5 text-teal-600 text-xs font-medium mb-1">{item.icon}{item.label}</div>
              <div className="text-sm font-semibold text-gray-700">{item.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {guide.tags.map((tag) => <TagBadge key={tag} label={tag} />)}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-3xl p-6 shadow-soft mb-10">
          <p className="text-gray-600 leading-8">{guide.summary}</p>
        </div>

        {/* Content sections */}
        <div className="space-y-8">
          {guide.content.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-6 shadow-soft"
            >
              <h2 className="font-display font-bold text-xl text-gray-800 mb-4">{section.title}</h2>
              {section.body && <p className="text-gray-600 leading-8 mb-4">{section.body}</p>}
              {section.items && (
                <ul className="space-y-3">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-600 text-sm leading-6">
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">
                        {j + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/guide"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            查看更多攻略
          </Link>
        </div>
      </div>
    </div>
  );
}
