import { motion } from 'framer-motion';
import { diaries } from '../data/diaries';
import { MapPin, Mic2, Camera, ExternalLink } from 'lucide-react';
import TagBadge from '../components/ui/TagBadge';

const preferences = [
  '背包客', '独自旅行', '美食探索', '城市漫步', '文化体验', '摄影记录',
  '小众目的地', '博物馆控', '夜市爱好者', '公共交通出行',
];

const gears = [
  { icon: '📷', name: '索尼 A7C II', desc: '主力旅拍相机，轻便全画幅' },
  { icon: '🎒', name: 'Osprey 38L', desc: '旅行背包，可登机，够用' },
  { icon: '👟', name: 'Salomon XT-6', desc: '步行舒适，颜值在线' },
  { icon: '📱', name: 'iPhone 15 Pro', desc: '日常随手记录+轻度剪辑' },
  { icon: '🔋', name: '倍思氮化镓充电器', desc: '4孔快充，出行必备' },
  { icon: '📓', name: '旅行笔记本', desc: '写每天的感受和碎碎念' },
];

export default function AboutPage() {
  const countries = new Set(diaries.map((d) => d.country)).size;
  const totalDays = diaries.reduce((s, d) => s + d.days, 0);

  return (
    <div className="min-h-screen bg-cream pt-16">
      {/* Header with profile */}
      <div className="bg-gradient-to-br from-cream-pink via-cream to-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-6 right-12 text-4xl animate-float">🌸</div>
        <div className="absolute bottom-8 left-10 text-3xl animate-float" style={{ animationDelay: '1s' }}>✨</div>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            {/* Avatar */}
            <div className="relative inline-block mb-6">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary shadow-hover mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&q=80"
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 text-2xl">✈️</div>
            </div>
            <h1 className="font-display font-extrabold text-4xl text-gray-800 mb-2">Hi，我是小旅 🌏</h1>
            <p className="text-gray-500 text-lg mb-6">
              一个喜欢把世界塞进背包的女孩<br />
              用镜头和文字，记录每一段真实的旅程
            </p>
            {/* Mini stats */}
            <div className="flex justify-center gap-8">
              {[
                { value: countries, label: '国家' },
                { value: diaries.length, label: '城市' },
                { value: totalDays + '+', label: '旅行天数' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-display font-extrabold text-3xl text-primary">{s.value}</div>
                  <div className="text-sm text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 shadow-soft mb-8"
        >
          <h2 className="font-display font-bold text-2xl text-gray-800 mb-5 flex items-center gap-2">
            <Mic2 className="w-5 h-5 text-primary" /> 旅行故事
          </h2>
          <div className="space-y-4 text-gray-600 leading-8">
            <p>
              第一次独自旅行是在大学时去了一趟重庆，完全没有攻略，坐着两路公交就出发了。
              迷路了3次，却意外发现了洪崖洞旁最好喝的豌杂粉，从那以后我就爱上了这种"带着不确定感出发"的旅行方式。
            </p>
            <p>
              这些年走过了日本、希腊、法国、印尼，也探索了中国很多被忽略的小城市。
              我喜欢用镜头记录普通人的日常，喜欢找那些没有出现在攻略里的街角小店，
              喜欢在异乡的早晨独自喝一杯当地咖啡，感受那个城市慢慢苏醒的节奏。
            </p>
            <p>
              这个博客是我的旅行账本，写给未来的自己，也写给和我一样爱旅行的你。
              希望每一篇日记都能成为你出发前的一点小小勇气 🌟
            </p>
          </div>
        </motion.div>

        {/* Travel preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 shadow-soft mb-8"
        >
          <h2 className="font-display font-bold text-2xl text-gray-800 mb-5 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" /> 旅行偏好
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {preferences.map((p) => <TagBadge key={p} label={p} />)}
          </div>
        </motion.div>

        {/* Gear */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-display font-bold text-2xl text-gray-800 mb-5 flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" /> 常用装备
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gears.map((gear, i) => (
              <motion.div
                key={gear.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-5 shadow-soft text-center hover:shadow-hover transition-all hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">{gear.icon}</div>
                <div className="font-semibold text-gray-800 text-sm mb-1">{gear.name}</div>
                <div className="text-xs text-gray-400">{gear.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 shadow-soft text-center"
        >
          <h2 className="font-display font-bold text-2xl text-gray-800 mb-3">📬 联系我</h2>
          <p className="text-gray-500 mb-6">有旅行问题想聊？有城市想推荐给我？欢迎来找我！</p>
          <div className="flex justify-center gap-4">
            {[
              { icon: <Camera className="w-5 h-5" />, label: '小红书', color: 'bg-red-50 text-red-500 border-red-100' },
              { icon: <ExternalLink className="w-5 h-5" />, label: 'Instagram', color: 'bg-purple-50 text-purple-500 border-purple-100' },
              { icon: <MapPin className="w-5 h-5" />, label: '微博', color: 'bg-orange-50 text-orange-500 border-orange-100' },
            ].map((social) => (
              <button
                key={social.label}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer ${social.color}`}
              >
                {social.icon}
                {social.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
