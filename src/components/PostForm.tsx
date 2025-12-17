import { useState, useRef } from 'react';
import { Platform, ScheduledPost } from '@/types/post';
import { PlatformBadge } from './PlatformBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PostFormProps {
  onSubmit: (post: Omit<ScheduledPost, 'id' | 'createdAt'>) => void;
}

const platforms: Platform[] = ['twitter', 'facebook', 'instagram', 'linkedin'];

export function PostForm({ onSubmit }: PostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | undefined>();
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({ title: "Title required", description: "Please enter a post title", variant: "destructive" });
      return;
    }
    if (!content.trim()) {
      toast({ title: "Content required", description: "Please enter post content", variant: "destructive" });
      return;
    }
    if (selectedPlatforms.length === 0) {
      toast({ title: "Platform required", description: "Please select at least one platform", variant: "destructive" });
      return;
    }
    if (!scheduledDate || !scheduledTime) {
      toast({ title: "Schedule required", description: "Please set date and time", variant: "destructive" });
      return;
    }

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      image,
      platforms: selectedPlatforms,
      scheduledDate,
      scheduledTime,
    });

    // Reset form
    setTitle('');
    setContent('');
    setImage(undefined);
    setSelectedPlatforms([]);
    setScheduledDate('');
    setScheduledTime('');
    if (fileInputRef.current) fileInputRef.current.value = '';

    toast({
      title: "Post scheduled!",
      description: "Your post has been scheduled successfully",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border card-shadow p-6">
      <h2 className="text-lg font-semibold text-card-foreground mb-4">Create New Post</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className="mt-1.5"
            maxLength={100}
          />
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="mt-1.5 min-h-[100px] resize-y"
            maxLength={1000}
          />
        </div>

        <div>
          <Label>Image (optional)</Label>
          <div className="mt-1.5 border-2 border-dashed border-border rounded-lg p-4 text-center bg-muted/30">
            {image ? (
              <div className="relative">
                <img src={image} alt="Preview" className="max-h-32 mx-auto rounded object-contain" />
                <button
                  type="button"
                  onClick={() => { setImage(undefined); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                  className="mt-2 text-sm text-destructive hover:underline"
                >
                  Remove image
                </button>
              </div>
            ) : (
              <div className="text-muted-foreground">
                <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No image selected</p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Image
          </Button>
        </div>

        <div>
          <Label>Platforms</Label>
          <div className="flex flex-wrap gap-2 mt-1.5">
            {platforms.map(platform => (
              <PlatformBadge
                key={platform}
                platform={platform}
                selected={selectedPlatforms.includes(platform)}
                onClick={() => togglePlatform(platform)}
              />
            ))}
          </div>
        </div>

        <div>
          <Label>Schedule Date & Time</Label>
          <div className="grid grid-cols-2 gap-3 mt-1.5">
            <Input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
            <Input
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Schedule Post
        </Button>
      </div>
    </form>
  );
}
