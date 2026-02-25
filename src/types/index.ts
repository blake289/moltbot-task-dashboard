export interface Task {
    id: string;
    title: string;
    client: string;
    project?: string;
    dueDate: string;
    dueTime?: string;
    isUrgent: boolean;
    status: 'todo' | 'in_progress' | 'completed';
    notes?: string;
    createdAt: string;
    updatedAt: string;
    completedAt?: string;
}

export interface FocusSession {
    id: string;
    taskId: string;
    startTime: string;
    endTime?: string;
    durationSeconds: number;
}

export interface ScheduleItem {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    source: 'calendar' | 'manual';
}

export interface QuickLink {
    id: string;
    label: string;
    url: string;
    icon?: string;
}

export interface LeadMetrics {
    // Top of Funnel
    adSpend: number;
    newLeads: number;
    
    // Pipeline
    scheduledConsults: number;
    liveConsults: number;
    showRate: number; // Show %
    
    // Conversions
    closes: number;
    closeRate: number; // Close %
    
    // Unit Economics
    cac: number; // Customer Acquisition Cost
    aov: number; // Average Order Value
    
    // Revenue
    newContractedRevenue: number;
    upfrontCashCollected: number;
    totalCashCollected: number;
    netOperatingProfit: number;
    
    lastUpdated: string;
}

export interface DashboardMetrics {
    deepWorkSecondsToday: number;
    tasksCompletedToday: number;
    currentStreakDays: number;
    bottleneckAgeDays: number;
    apiUsageRate: number;
    currentSpendToday: number;
}

export interface DashboardData {
    tasks: Task[];
    schedule: ScheduleItem[];
    metrics: DashboardMetrics;
    quickLinks: QuickLink[];
    leadMetrics: LeadMetrics;
}
