import type { Task, ScheduleItem, DashboardMetrics } from '../types';

// Mock initial state data
export const INITIAL_TASKS: Task[] = [
    {
        id: 't-1',
        title: 'Finalize Pricing Strategy Deck',
        client: 'Acme Corp',
        dueDate: '2026-02-23T00:00:00Z',
        isUrgent: true,
        status: 'in_progress',
        createdAt: '2026-02-20T10:00:00Z',
        updatedAt: '2026-02-21T14:00:00Z'
    },
    {
        id: 't-2',
        title: 'Review Q1 Legal Contracts',
        client: 'Stark Industries',
        dueDate: new Date().toISOString(), // Due today
        isUrgent: true,
        status: 'todo',
        createdAt: '2026-02-18T09:00:00Z',
        updatedAt: '2026-02-18T09:00:00Z'
    },
    {
        id: 't-3',
        title: 'Update Onboarding Flow Wireframes',
        client: 'Globex',
        dueDate: '2026-02-25T00:00:00Z',
        isUrgent: false,
        status: 'todo',
        createdAt: '2026-02-21T11:00:00Z',
        updatedAt: '2026-02-21T11:00:00Z'
    },
    {
        id: 't-4',
        title: 'Prepare Q2 Hiring Budget',
        client: 'Internal',
        dueDate: '2026-03-01T00:00:00Z',
        isUrgent: false,
        status: 'todo',
        createdAt: '2026-02-15T08:00:00Z',
        updatedAt: '2026-02-15T08:00:00Z'
    }
];

export const MOCK_SCHEDULE: ScheduleItem[] = [
    {
        id: 's-1',
        title: 'Daily Standup',
        startTime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
        endTime: new Date(new Date().setHours(10, 30, 0, 0)).toISOString(),
        source: 'calendar'
    },
    {
        id: 's-2',
        title: 'Acme Sync / Blockers',
        startTime: new Date(new Date().setHours(13, 0, 0, 0)).toISOString(),
        endTime: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
        source: 'calendar'
    },
    {
        id: 's-3',
        title: 'Deep Work Block (Manual)',
        startTime: new Date(new Date().setHours(15, 0, 0, 0)).toISOString(),
        endTime: new Date(new Date().setHours(17, 30, 0, 0)).toISOString(),
        source: 'manual'
    }
];

export const MOCK_METRICS: DashboardMetrics = {
    deepWorkSecondsToday: 14400, // 4 hours
    tasksCompletedToday: 2,
    currentStreakDays: 14,
    bottleneckAgeDays: 2,
    apiUsageRate: 142,
    currentSpendToday: 14.50
};
