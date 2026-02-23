export interface Task {
    id: string;
    title: string;
    client: string;
    project?: string; // Project grouping
    dueDate: string; // ISO string
    dueTime?: string; // HH:MM
    isUrgent: boolean;
    status: 'todo' | 'in_progress' | 'completed';
    notes?: string; // Task notes
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
    completedAt?: string; // ISO string
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

export interface QuickLink {
    id: string;
    label: string;
    url: string;
    icon?: string; // emoji
}

export interface LeadMetrics {
    // Ad metrics
    adSpend: number;
    impressions: number;
    clicks: number;
    ctr: number; // click-through rate
    
    // Landing page
    landingPageViews: number;
    
    // Lead gen
    formFills: number;
    cpl: number; // cost per lead
    
    // Bookings
    bookings: number;
    bookingRate: number; // % of leads that book
    
    // Shows
    shows: number;
    showRate: number; // % that show up
    
    // Closes
    closes: number;
    closeRate: number; // % that close
    
    // Revenue
    revenue: number;
    roas: number; // return on ad spend
    
    // Legacy compat
    totalLeads: number;
    leadsToday: number;
    conversions: number;
    conversionRate: number;
    projectedRevenue: number;
    
    lastUpdated: string; // ISO string
}

export interface DashboardMetrics {
    deepWorkSecondsToday: number;
    tasksCompletedToday: number;
    currentStreakDays: number;
    bottleneckAgeDays: number;
    apiUsageRate: number; // requests per minute
    currentSpendToday: number; // in dollars
}

export interface DashboardData {
    tasks: Task[];
    schedule: ScheduleItem[];
    metrics: DashboardMetrics;
    quickLinks: QuickLink[];
    leadMetrics: LeadMetrics;
}
