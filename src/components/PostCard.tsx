import { ScheduledPost } from '@/types/post';
import { PlatformBadge } from './PlatformBadge';
import { Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface PostCardProps {
  post: ScheduledPost;
  onDelete: (id: string) => void;
}

export function PostCard({ post, onDelete }: PostCardProps) {
  const formattedDate = format(parseISO(post.scheduledDate), 'MMM dd, yyyy');
  
  return (
    <div className="bg-card rounded-lg border border-border card-shadow animate-fade-in p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-card-foreground">{post.title}</h3>
        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
          {formattedDate}, {post.scheduledTime}
        </span>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.content}</p>
      
      {post.image && (
        <div className="mb-3 rounded-md overflow-hidden bg-muted">
          <img 
            src={post.image} 
            alt="Post preview" 
            className="w-full h-32 object-contain"
          />
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {post.platforms.map(platform => (
            <PlatformBadge key={platform} platform={platform} selected size="sm" />
          ))}
        </div>
        
        <button
          onClick={() => onDelete(post.id)}
          className="p-1.5 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
          aria-label="Delete post"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
