import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Banknote } from 'lucide-react';
import TagBadge from './TagBadge';

interface ArticleCardProps {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  coverImage: string;
  destination: string;
  country: string;
  startDate: string;
  days?: number;
  budget?: number;
  tags: string[];
  linkPrefix?: string;
  index?: number;
}

export default function ArticleCard({
  slug,
  title,
  subtitle,
  coverImage,
  destination,
  country,
  startDate,
  days,
  budget,
  tags,
  linkPrefix = '/diary',
  index = 0,
}: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer"
    >
      <Link to={`${linkPrefix}/${slug}`}>
        {/* Cover */}
        <div className="relative overflow-hidden h-52">
          <img
            src={coverImage}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-sm font-medium">
            <MapPin className="w-3.5 h-3.5" />
            <span>{destination}, {country}</span>
          </div>
          {days && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-2.5 py-1 rounded-full">
              {days}天
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display font-bold text-lg text-gray-800 mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{subtitle}</p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {startDate}
            </span>
            {budget && (
              <span className="flex items-center gap-1">
                <Banknote className="w-3 h-3" />
                约¥{budget.toLocaleString()}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag} label={tag} />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
