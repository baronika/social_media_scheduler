import { PostForm } from '@/components/PostForm';
import { PostCard } from '@/components/PostCard';
import { useScheduledPosts } from '@/hooks/useScheduledPosts';
import { CalendarDays } from 'lucide-react';

const Index = () => {
  const { posts, addPost, deletePost } = useScheduledPosts();

  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(`${a.scheduledDate}T${a.scheduledTime}`);
    const dateB = new Date(`${b.scheduledDate}T${b.scheduledTime}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="header-gradient py-6 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">
            Social Media Scheduler
          </h1>
          <p className="text-primary-foreground/80 mt-2">
            Plan and schedule your social media content in one place
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Create Post Section */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              Create Post
            </h2>
            <PostForm onSubmit={addPost} />
          </section>

          {/* Scheduled Posts Section */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Scheduled Posts
            </h2>
            <div className="bg-card rounded-lg border border-border card-shadow min-h-[400px] p-4">
              {sortedPosts.length === 0 ? (
                <div className="flex items-center justify-center h-[350px] text-muted-foreground">
                  <p>No posts scheduled. Create your first post!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedPosts.map(post => (
                    <PostCard key={post.id} post={post} onDelete={deletePost} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
