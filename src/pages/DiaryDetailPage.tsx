import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Banknote, ArrowLeft, ArrowRight, Plane, ChefHat, Lightbulb } from 'lucide-react';
import { diaries } from '../data/diaries';
import TagBadge from '../components/ui/TagBadge';
import PhotoWall from '../components/ui/PhotoWall';

export default function DiaryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const diary = diaries.find((d) => d.slug === slug);
  const idx = diaries.findIndex((d) => d.slug === slug);
  const prev = idx > 0 ? diaries[idx - 1] : null;
  const next = idx < diaries.length - 1 ? diaries[idx + 1] : null;

  if (!diary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">😢</div>
          <p className="text-gray-500">找不到这篇日记</p>
          <Link to="/diary" className="mt-4 text-primary underline">返回日记列表</Link>
        </div>
      </div>
    );
  }

  const totalExpense = diary.expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="min-h-screen bg-cream pt-16">
      {/* Cover */}
      <div className="relative h-72 md:h-[480px] overflow-hidden">
        <img src={diary.coverImage} alt={diary.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>{diary.destination}, {diary.country}</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-2">{diary.title}</h1>
          <p className="text-white/80 text-base md:text-lg">{diary.subtitle}</p>
        </div>
        <Link
          to="/diary"
          className="absolute top-20 left-4 md:left-8 flex items-center gap-1.5 text-white/80 hover:text-white text-sm transition-colors bg-black/20 rounded-full px-3 py-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          返回
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Trip info bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {[
            { icon: <Calendar className="w-4 h-4" />, label: '出发时间', value: diary.startDate },
            { icon: <Clock className="w-4 h-4" />, label: '旅行天数', value: `${diary.days} 天` },
            { icon: <Banknote className="w-4 h-4" />, label: '人均花费', value: `¥${diary.budget.toLocaleString()}` },
            { icon: <Plane className="w-4 h-4" />, label: '交通方式', value: diary.transport },
          ].map((item, i) => (
            <div key={i} className="bg-mint/20 rounded-2xl p-4 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-teal-600 text-xs font-medium">
                {item.icon}{item.label}
              </div>
              <div className="text-sm font-semibold text-gray-700">{item.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {diary.tags.map((tag) => <TagBadge key={tag} label={tag} />)}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-3xl p-6 shadow-soft mb-10">
          <p className="text-gray-600 leading-8 text-base">{diary.summary}</p>
        </div>

        {/* Day Routes */}
        <h2 className="font-display font-bold text-2xl text-gray-800 mb-6">📍 每日路线</h2>
        <div className="relative mb-12">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />
          <div className="flex flex-col gap-6">
            {diary.dayRoutes.map((route) => (
              <motion.div
                key={route.day}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="md:pl-14 relative"
              >
                <div className="absolute left-0 top-4 w-10 h-10 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center shadow-soft hidden md:flex">
                  D{route.day}
                </div>
                <div className="bg-white rounded-3xl overflow-hidden shadow-soft">
                  {route.image && (
                    <img src={route.image} alt={route.title} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="md:hidden text-xs bg-primary text-white px-2 py-0.5 rounded-full font-bold">Day {route.day}</span>
                      <h3 className="font-display font-bold text-lg text-gray-800">{route.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-7 mb-3">{route.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {route.highlights.map((h) => (
                        <span key={h} className="text-xs bg-cream-yellow/30 text-yellow-700 px-2.5 py-0.5 rounded-full">{h}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Foods */}
        <h2 className="font-display font-bold text-2xl text-gray-800 mb-6">
          <ChefHat className="inline w-6 h-6 mr-2 text-primary" />
          美食打卡
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {diary.foods.map((food) => (
            <div key={food.name} className="bg-white rounded-3xl overflow-hidden shadow-soft">
              <img src={food.image} alt={food.name} className="w-full h-36 object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-800 text-sm">{food.name}</h4>
                  <span className="text-xs text-yellow-500">{'★'.repeat(food.rating)}</span>
                </div>
                <p className="text-xs text-gray-500 leading-5">{food.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Expenses */}
        <h2 className="font-display font-bold text-2xl text-gray-800 mb-6">💰 花费清单</h2>
        <div className="bg-white rounded-3xl p-6 shadow-soft mb-12">
          <div className="divide-y divide-gray-100">
            {diary.expenses.map((exp) => (
              <div key={exp.category} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{exp.icon}</span>
                  <div>
                    <div className="font-medium text-gray-700 text-sm">{exp.category}</div>
                    <div className="text-xs text-gray-400">{exp.note}</div>
                  </div>
                </div>
                <div className="font-semibold text-gray-800">¥{exp.amount.toLocaleString()}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-dashed border-primary/30">
            <div className="font-bold text-gray-700">合计总花费</div>
            <div className="font-display font-extrabold text-2xl text-primary">¥{totalExpense.toLocaleString()}</div>
          </div>
        </div>

        {/* Tips */}
        <h2 className="font-display font-bold text-2xl text-gray-800 mb-6">
          <Lightbulb className="inline w-6 h-6 mr-2 text-cream-yellow" />
          实用Tips
        </h2>
        <div className="bg-white rounded-3xl p-6 shadow-soft mb-12">
          <ul className="space-y-3">
            {diary.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-600 text-sm leading-6">
                <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Photo Wall */}
        <h2 className="font-display font-bold text-2xl text-gray-800 mb-6">📷 旅行相册</h2>
        <div className="mb-12">
          <PhotoWall photos={diary.photos} />
        </div>

        {/* Prev / Next */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prev && (
            <Link to={`/diary/${prev.slug}`} className="group bg-white rounded-3xl p-5 shadow-soft hover:shadow-hover transition-all flex items-center gap-4">
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-xs text-gray-400 mb-1">上一篇</div>
                <div className="font-semibold text-gray-700 text-sm truncate group-hover:text-primary transition-colors">{prev.title}</div>
              </div>
            </Link>
          )}
          {next && (
            <Link to={`/diary/${next.slug}`} className="group bg-white rounded-3xl p-5 shadow-soft hover:shadow-hover transition-all flex items-center justify-end gap-4 md:ml-auto">
              <div className="min-w-0 text-right">
                <div className="text-xs text-gray-400 mb-1">下一篇</div>
                <div className="font-semibold text-gray-700 text-sm truncate group-hover:text-primary transition-colors">{next.title}</div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors flex-shrink-0" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
