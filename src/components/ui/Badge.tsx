import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'purple' | 'blue' | 'cyan' | 'green' | 'red' | 'yellow' | 'orange' | 'pink';
  size?: 'sm' | 'md';
  className?: string;
}

const variantClasses = {
  default: 'bg-white/10 text-gray-300 border-white/20',
  purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  cyan: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  green: 'bg-green-500/20 text-green-300 border-green-500/30',
  red: 'bg-red-500/20 text-red-300 border-red-500/30',
  yellow: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  orange: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  pink: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
};

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
};

export default function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-full border font-medium',
      variantClasses[variant],
      sizeClasses[size],
      className
    )}>
      {children}
    </span>
  );
}
