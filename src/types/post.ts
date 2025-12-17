export type Platform = 'twitter' | 'facebook' | 'instagram' | 'linkedin';

export interface ScheduledPost {
  id: string;
  title: string;
  content: string;
  image?: string;
  platforms: Platform[];
  scheduledDate: string;
  scheduledTime: string;
  createdAt: string;
}
