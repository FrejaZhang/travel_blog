import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Star } from 'lucide-react';
import { diaries } from '../data/diaries';
import ArticleCard from '../components/ui/ArticleCard';
import WaveDivider from '../components/ui/WaveDivider';
import TagBadge from '../components/ui/TagBadge';

export default function HomePage() {
  const featured = diaries.filter((d) => d.featured).slice(0, 3);
  const latest = diaries.slice(0, 4);
  const stats = [
    { label: '个国家', value: new Set(diaries.map((d) => d.country)).size },
    { label: '座城市', value: diaries.length },
    { label: '篇日记', value: diaries.length },
    { label: '段旅程', value: diaries.reduce((s, d) => s + d.days, 0) + '天' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-cream-pink via-cream to-white pt-16">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 text-5xl animate-float" style={{ animationDelay: '0s' }}>✈️</div>
        <div className="absolute top-32 right-16 text-4xl animate-float" style={{ animationDelay: '1s' }}>🌸</div>
        <div className="absolute bottom-24 left-20 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>🗺️</div>
        <div className="absolute bottom-16 right-24 text-4xl animate-float" style={{ animationDelay: '1.5s' }}>⭐</div>
        <div className="absolute top-1/2 left-[8%] text-2xl animate-bounce-soft">☁️</div>
        <div className="absolute top-1/3 right-[12%] text-2xl animate-bounce-soft" style={{ animationDelay: '0.8s' }}>☁️</div>

        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center md:text-left"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <Star className="w-3.5 h-3.5 fill-primary" />
                <span>一个人的世界旅行日记</span>
              </div>
              <h1 className="font-display font-extrabold text-5xl md:text-6xl leading-tight text-gray-800 mb-4">
                把世界的每个角落
                <br />
                <span className="text-gradient">变成故事</span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
                记录每一段旅程的温度与色彩，分享真实的路线、美食与感动。
                愿每篇日记都能点燃你出发的勇气 ✨
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Link
                  to="/diary"
                  className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-7 py-3.5 rounded-full font-medium shadow-soft hover:shadow-hover transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  探索日记
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/map"
                  className="flex items-center gap-2 bg-white hover:bg-cream text-primary border border-primary/30 px-7 py-3.5 rounded-full font-medium transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  旅行地图
                </Link>
              </div>
            </motion.div>

            {/* Hero image cluster */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 relative hidden md:block"
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="rounded-3xl overflow-hidden shadow-hover rotate-2 w-72 h-72 ml-auto">
                  <img src={diaries[0].coverImage} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 rounded-3xl overflow-hidden shadow-hover -rotate-3 w-48 h-48">
                  <img src={diaries[1].coverImage} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-4 -left-8 rounded-3xl overflow-hidden shadow-hover rotate-1 w-36 h-36">
                  <img src={diaries[2].coverImage} alt="" className="w-full h-full object-cover" />
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-2 right-0 bg-white rounded-2xl shadow-hover p-3 flex items-center gap-2">
                  <div className="text-2xl">🌍</div>
                  <div>
                    <div className="font-display font-bold text-sm text-gray-800">已探索</div>
                    <div className="text-xs text-gray-400">{new Set(diaries.map(d => d.country)).size} 个国家</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-2xl mx-auto md:mx-0"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-soft">
                <div className="font-display font-extrabold text-3xl text-primary">{s.value}</div>
                <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <WaveDivider topColor="#FFF0F5" bottomColor="#FFFFFF" />

      {/* Featured section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-3xl text-gray-800">✨ 精选旅行</h2>
              <p className="text-gray-500 mt-1">最精彩的旅程，最真实的记录</p>
            </div>
            <Link
              to="/diary"
              className="flex items-center gap-1.5 text-primary font-medium text-sm hover:gap-2.5 transition-all"
            >
              查看全部 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((diary, i) => (
              <ArticleCard
                key={diary.id}
                {...diary}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <WaveDivider topColor="#FFFFFF" bottomColor="#FFF7F0" />

      {/* Latest */}
      <section className="py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display font-bold text-3xl text-gray-800 mb-2">📖 最新日记</h2>
          <p className="text-gray-500 mb-8">刚刚回来，墨迹未干</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {latest.map((diary, i) => (
              <ArticleCard key={diary.id} {...diary} index={i} />
            ))}
          </div>
        </div>
      </section>

      <WaveDivider topColor="#FFF7F0" bottomColor="#A0E7E5" />

      {/* Map CTA */}
      <section className="py-16 bg-mint">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-5xl mb-4">🗺️</div>
            <h2 className="font-display font-bold text-3xl text-gray-800 mb-3">查看我的旅行地图</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              在世界地图上，每一个小标记都是我到过的地方<br />
              点击每个地点，跳转到对应的旅行日记
            </p>
            <Link
              to="/map"
              className="inline-flex items-center gap-2 bg-white hover:bg-cream text-primary border-2 border-primary/20 px-8 py-4 rounded-full font-bold text-lg shadow-soft hover:shadow-hover transition-all hover:-translate-y-1 cursor-pointer"
            >
              <MapPin className="w-5 h-5" />
              打开旅行地图
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <WaveDivider topColor="#A0E7E5" bottomColor="#FFF7F0" />

      {/* Tags cloud */}
      <section className="py-12 bg-cream">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-2xl text-gray-800 mb-6">🏷️ 旅行标签</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {Array.from(new Set(diaries.flatMap((d) => d.tags))).map((tag) => (
              <Link key={tag} to={`/diary?tag=${encodeURIComponent(tag)}`}>
                <TagBadge label={tag} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
