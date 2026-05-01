export interface ActionItem {
  id: string;
  title: string;
  url?: string;
  isCompleted?: boolean;
}

export interface ElectionTimeline {
  id: string;
  title: string;
  date: Date | null;
  description: string;
  status: 'upcoming' | 'active' | 'completed';
  actionItems: ActionItem[];
  icon?: string;
}

export interface UserProgress {
  userId: string;
  completedModules: string[];
  quizScores: Record<string, number>;
  lastVisited: Date;
  registered: boolean;
}
