import type { Task, ScheduleItem, DashboardMetrics } from '../types';

const BASE_PATH = '/data';

export async function fetchTasks(): Promise<Task[]> {
    const res = await fetch(`${BASE_PATH}/tasks.json?t=${Date.now()}`);
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return res.json();
}

export async function fetchSchedule(): Promise<ScheduleItem[]> {
    const res = await fetch(`${BASE_PATH}/schedule.json?t=${Date.now()}`);
    if (!res.ok) throw new Error('Failed to fetch schedule');
    return res.json();
}

export async function fetchMetrics(): Promise<DashboardMetrics> {
    const res = await fetch(`${BASE_PATH}/metrics.json?t=${Date.now()}`);
    if (!res.ok) throw new Error('Failed to fetch metrics');
    return res.json();
}

// These are no-ops in static mode - MoltBot updates the JSON files directly
export async function updateTask(task: Partial<Task> & { id: string }): Promise<Task> {
    console.log('Task update requested (static mode):', task);
    return task as Task;
}

export async function deleteTask(taskId: string): Promise<void> {
    console.log('Task delete requested (static mode):', taskId);
}

export async function updateScheduleItem(item: Partial<ScheduleItem> & { id: string }): Promise<ScheduleItem> {
    console.log('Schedule update requested (static mode):', item);
    return item as ScheduleItem;
}

export async function updateMetrics(metrics: Partial<DashboardMetrics>): Promise<DashboardMetrics> {
    console.log('Metrics update requested (static mode):', metrics);
    return metrics as DashboardMetrics;
}
