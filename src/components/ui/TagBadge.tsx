const tagColors = [
  'bg-primary/15 text-primary-dark',
  'bg-mint/20 text-teal-600',
  'bg-cream-yellow/30 text-yellow-700',
  'bg-sage/30 text-green-700',
  'bg-coral/15 text-red-500',
  'bg-purple-100 text-purple-600',
];

function hashColor(label: string): string {
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = label.charCodeAt(i) + ((hash << 5) - hash);
  }
  return tagColors[Math.abs(hash) % tagColors.length];
}

interface TagBadgeProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function TagBadge({ label, active, onClick }: TagBadgeProps) {
  const colorClass = active ? 'bg-primary text-white shadow-soft' : hashColor(label);
  return (
    <span
      onClick={onClick}
      className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full transition-all ${colorClass} ${onClick ? 'cursor-pointer hover:scale-105' : ''}`}
      style={{ transform: `rotate(${(label.charCodeAt(0) % 3) - 1}deg)` }}
    >
      {label}
    </span>
  );
}
