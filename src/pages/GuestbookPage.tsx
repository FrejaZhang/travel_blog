import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle } from 'lucide-react';
import { GuestMessage } from '../types/index';

const STORAGE_KEY = 'travel_guestbook_messages';

const avatarOptions = ['🐼', '🐨', '🦊', '🐰', '🐸', '🦁', '🐷', '🐻', '🦋', '🌸', '⭐', '🌈'];

const initialMessages: GuestMessage[] = [
  {
    id: 'seed-1',
    nickname: '小橙子',
    avatar: '🌸',
    content: '看了你的京都攻略，我也要去赏樱花！已经订好机票了，好期待啊～',
    createdAt: '2024-04-05 14:23',
  },
  {
    id: 'seed-2',
    nickname: '旅行er阿杰',
    avatar: '✈️',
    content: '圣托里尼的日落真的绝了！看你的照片就已经心动了，希望有一天也能站在那里看日落。',
    createdAt: '2024-08-12 20:11',
  },
  {
    id: 'seed-3',
    nickname: '热爱火锅的Lily',
    avatar: '🐼',
    content: '成都火锅那篇！！！大龙燚真的排队很久但值得，毛肚是人间美味～下次来成都一起吃火锅！',
    createdAt: '2024-10-06 18:45',
  },
];

export default function GuestbookPage() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [nickname, setNickname] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      setMessages(JSON.parse(raw));
    } else {
      setMessages(initialMessages);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMessages));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || !content.trim()) return;

    setSubmitting(true);
    const newMsg: GuestMessage = {
      id: Date.now().toString(),
      nickname: nickname.trim(),
      avatar: selectedAvatar,
      content: content.trim(),
      createdAt: new Date().toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
    };

    setTimeout(() => {
      const updated = [newMsg, ...messages];
      setMessages(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setNickname('');
      setContent('');
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-cream pt-16">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-700 py-16 px-4 text-center overflow-hidden">
        {/* Stars decoration */}
        {['⭐', '✨', '💫', '🌟', '⭐', '✨'].map((star, i) => (
          <div
            key={i}
            className="absolute text-white/20 animate-float"
            style={{
              left: `${(i * 17 + 5) % 90}%`,
              top: `${(i * 23 + 10) % 70}%`,
              fontSize: `${12 + (i % 3) * 4}px`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            {star}
          </div>
        ))}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <div className="text-5xl mb-3">💌</div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-3">来留言吧</h1>
          <p className="text-white/60 text-base">有什么想说的，都可以留在这里 ✨</p>
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Submit form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-hover mb-10"
        >
          <h2 className="font-display font-bold text-xl text-gray-800 mb-5 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            写下你的留言
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Nickname */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1.5">昵称</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="你的昵称"
                maxLength={20}
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-gray-700 transition-all"
              />
            </div>

            {/* Avatar picker */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">选个头像</label>
              <div className="flex flex-wrap gap-2">
                {avatarOptions.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedAvatar(emoji)}
                    className={`w-9 h-9 rounded-full text-xl flex items-center justify-center transition-all cursor-pointer ${
                      selectedAvatar === emoji
                        ? 'bg-primary/20 ring-2 ring-primary scale-110'
                        : 'bg-gray-100 hover:bg-primary/10'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-600 mb-1.5">留言内容</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="写下你想说的话，旅行感悟、推荐建议、或者单纯打个招呼都欢迎～"
                rows={4}
                maxLength={300}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-gray-700 resize-none transition-all"
              />
              <div className="text-right text-xs text-gray-300 mt-1">{content.length}/300</div>
            </div>

            <button
              type="submit"
              disabled={submitting || !nickname.trim() || !content.trim()}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white py-3.5 rounded-full font-medium transition-all hover:-translate-y-0.5 hover:shadow-soft disabled:cursor-not-allowed cursor-pointer"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                  发送中…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  发送留言
                </>
              )}
            </button>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 text-center text-sm text-green-500 font-medium"
                >
                  🎉 留言已发送，谢谢你～
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* Messages */}
        <h2 className="font-display font-bold text-xl text-gray-800 mb-5 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          留言墙 <span className="text-sm text-gray-400 font-normal">({messages.length} 条)</span>
        </h2>
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-start gap-3 ${i % 2 === 0 ? '' : 'flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                  {msg.avatar}
                </div>
                {/* Bubble */}
                <div className={`max-w-[80%] ${i % 2 === 0 ? '' : 'items-end'} flex flex-col gap-1`}>
                  <div className={`flex items-center gap-2 ${i % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                    <span className="font-medium text-sm text-gray-700">{msg.nickname}</span>
                    <span className="text-xs text-gray-400">{msg.createdAt}</span>
                  </div>
                  <div
                    className={`rounded-3xl px-4 py-3 text-sm leading-6 text-gray-700 shadow-soft ${
                      i % 2 === 0
                        ? 'bg-white rounded-tl-none'
                        : 'bg-primary/10 rounded-tr-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {messages.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">💬</div>
            <p>还没有留言，来做第一个！</p>
          </div>
        )}

        <div className="text-center mt-12 text-gray-400 text-sm">
          <div className="text-2xl mb-2">⭐ ✨ 💫</div>
          每一条留言都是旅途中最温暖的相遇
        </div>
      </div>
    </div>
  );
}
