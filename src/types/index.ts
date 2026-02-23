export interface Task {
    id: string;
    title: string;
    client: string;
    dueDate: string; // ISO string
    dueTime?: string; // HH:MM
    isUrgent: boolean;
    status: 'todo' | 'in_progress' | 'completed';
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
}

export interface FocusSession {
    id: string;
    taskId: string;
    startTime: string; // ISO string
    endTime?: string; // ISO string
    durationSeconds: number;
}

export interface ScheduleItem {
    id: string;
    title: string;
    startTime: string; // ISO string
    endTime: string; // ISO string
    source: 'calendar' | 'manual';
}

export interface DashboardMetrics {
    deepWorkSecondsToday: number;
    tasksCompletedToday: number;
    currentStreakDays: number;
    bottleneckAgeDays: number;
    apiUsageRate: number; // requests per minute
    currentSpendToday: number; // in dollars
}
