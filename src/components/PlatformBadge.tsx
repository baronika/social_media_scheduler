import { Platform } from '@/types/post';
import { cn } from '@/lib/utils';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

interface PlatformBadgeProps {
  platform: Platform;
  selected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

const platformConfig: Record<Platform, { label: string; icon: typeof Twitter }> = {
  twitter: { label: 'Twitter/X', icon: Twitter },
  facebook: { label: 'Facebook', icon: Facebook },
  instagram: { label: 'Instagram', icon: Instagram },
  linkedin: { label: 'LinkedIn', icon: Linkedin },
};

export function PlatformBadge({ platform, selected = false, onClick, size = 'md' }: PlatformBadgeProps) {
  const config = platformConfig[platform];
  const Icon = config.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium transition-all duration-200',
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        selected
          ? 'bg-platform text-platform-foreground'
          : 'bg-secondary text-secondary-foreground hover:bg-muted',
        onClick && 'cursor-pointer'
      )}
    >
      <Icon className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
      {config.label}
    </button>
  );
}
