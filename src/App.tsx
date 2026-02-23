import { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/layout/Layout';
import { PrimaryBottleneck } from './components/dashboard/PrimaryBottleneck';
import { UrgentQueue } from './components/dashboard/UrgentQueue';
import { Schedule } from './components/dashboard/Schedule';
import { MetricsStrip } from './components/dashboard/MetricsStrip';
import { TaskBacklog } from './components/dashboard/TaskBacklog';
import { QuickLinks } from './components/dashboard/QuickLinks';
import { RevenueTracker } from './components/dashboard/RevenueTracker';
import { CompletedToday } from './components/dashboard/CompletedToday';
import { 
  fetchTasks, 
  updateTask as apiUpdateTask, 
  fetchSchedule, 
  fetchMetrics, 
  updateMetrics as apiUpdateMetrics,
  fetchQuickLinks,
  fetchLeadMetrics
} from './api/dashboard';
import type { Task, ScheduleItem, DashboardMetrics, QuickLink, LeadMetrics } from './types';

const DEFAULT_METRICS: DashboardMetrics = {
  deepWorkSecondsToday: 0,
  tasksCompletedToday: 0,
  currentStreakDays: 0,
  bottleneckAgeDays: 0,
  apiUsageRate: 0,
  currentSpendToday: 0
};

const DEFAULT_LEAD_METRICS: LeadMetrics = {
  totalLeads: 0,
  leadsToday: 0,
  adSpend: 0,
  cpl: 0,
  conversions: 0,
  conversionRate: 0,
  projectedRevenue: 0,
  impressions: 0,
  clicks: 0,
  ctr: 0,
  landingPageViews: 0,
  formFills: 0,
  bookings: 0,
  bookingRate: 0,
  shows: 0,
  showRate: 0,
  closes: 0,
  closeRate: 0,
  revenue: 0,
  roas: 0,
  lastUpdated: new Date().toISOString()
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>(DEFAULT_METRICS);
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>([]);
  const [leadMetrics, setLeadMetrics] = useState<LeadMetrics>(DEFAULT_LEAD_METRICS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all data on mount
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [tasksData, scheduleData, metricsData, linksData, leadData] = await Promise.all([
          fetchTasks(),
          fetchSchedule(),
          fetchMetrics(),
          fetchQuickLinks(),
          fetchLeadMetrics()
        ]);
        setTasks(tasksData);
        setSchedule(scheduleData);
        setMetrics(metricsData);
        setQuickLinks(linksData);
        setLeadMetrics(leadData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const primaryTask = tasks.find(t => t.status === 'in_progress') || null;
  const urgentQueueTasks = tasks.filter(t => t.status !== 'in_progress' && t.status !== 'completed');

  const promoteTask = useCallback(async (taskId: string) => {
    setTasks(prevTasks => prevTasks.map(task => {
      if (task.id === taskId) return { ...task, status: 'in_progress' as const };
      if (task.status === 'in_progress') return { ...task, status: 'todo' as const };
      return task;
    }));

    try {
      const currentPrimary = tasks.find(t => t.status === 'in_progress');
      if (currentPrimary) {
        await apiUpdateTask({ id: currentPrimary.id, status: 'todo' });
      }
      await apiUpdateTask({ id: taskId, status: 'in_progress' });
    } catch (err) {
      console.error('Failed to promote task:', err);
    }
  }, [tasks]);

  const updateTaskTitle = useCallback(async (taskId: string, newTitle: string) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === taskId ? { ...task, title: newTitle } : task
    ));
    try {
      await apiUpdateTask({ id: taskId, title: newTitle });
    } catch (err) {
      console.error('Failed to update task title:', err);
    }
  }, []);

  const toggleUrgent = useCallback(async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    setTasks(prevTasks => prevTasks.map(t =>
      t.id === taskId ? { ...t, isUrgent: !t.isUrgent } : t
    ));
    try {
      await apiUpdateTask({ id: taskId, isUrgent: !task.isUrgent });
    } catch (err) {
      console.error('Failed to toggle urgent:', err);
    }
  }, [tasks]);

  const markComplete = useCallback(async (taskId: string) => {
    const now = new Date().toISOString();
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === taskId ? { ...task, status: 'completed' as const, completedAt: now } : task
    ));
    const newCompletedCount = metrics.tasksCompletedToday + 1;
    setMetrics(prev => ({
      ...prev,
      tasksCompletedToday: newCompletedCount
    }));
    
    try {
      await apiUpdateTask({ id: taskId, status: 'completed' });
      await apiUpdateMetrics({ tasksCompletedToday: newCompletedCount });
    } catch (err) {
      console.error('Failed to mark complete:', err);
    }
  }, [metrics.tasksCompletedToday]);

  const handleSessionLog = useCallback(async (taskId: string, durationSeconds: number) => {
    console.log(`Session logged for task ${taskId}: ${durationSeconds}s`);
    const newDeepWork = metrics.deepWorkSecondsToday + durationSeconds;
    setMetrics(prev => ({
      ...prev,
      deepWorkSecondsToday: newDeepWork
    }));
    try {
      await apiUpdateMetrics({ deepWorkSecondsToday: newDeepWork });
    } catch (err) {
      console.error('Failed to log session:', err);
    }
  }, [metrics.deepWorkSecondsToday]);

  if (loading) {
    return (
      <Layout>
        <div style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
          Loading dashboard...
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div style={{ padding: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--status-error)' }}>
          Error: {error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* FOCUS TASK - TOP OF PAGE */}
      <div style={{ gridColumn: '1 / -1', marginBottom: 'var(--spacing-xl)' }}>
        <PrimaryBottleneck
          task={primaryTask}
          onUpdateTitle={(title) => primaryTask && updateTaskTitle(primaryTask.id, title)}
          onSessionLog={handleSessionLog}
          totalTimeTodaySeconds={metrics.deepWorkSecondsToday}
        />
      </div>

      {/* Quick Links Bar */}
      <div style={{ gridColumn: '1 / -1', marginBottom: 'var(--spacing-lg)' }}>
        <QuickLinks links={quickLinks} />
      </div>

      {/* Revenue Tracker - slightly different color */}
      <div style={{ gridColumn: '1 / -1', marginBottom: 'var(--spacing-xl)' }}>
        <div style={{ backgroundColor: '#1a1925', borderRadius: 'var(--radius-lg)', border: '1px solid #2a2640' }}>
          <RevenueTracker metrics={leadMetrics} />
        </div>
      </div>

      <main className="dashboard-main col-span-1 border-r" style={{ gridColumn: '1', borderRight: '1px solid var(--border-subtle)', paddingRight: 'var(--spacing-xl)' }}>
        {/* Metrics Strip - teal tint */}
        <div style={{ backgroundColor: '#151a1f', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-lg)', border: '1px solid #1e2a32' }}>
          <MetricsStrip metrics={metrics} />
        </div>

        {/* Completed Today - green tint */}
        <div className="mt-xl" style={{ backgroundColor: '#151f1a', borderRadius: 'var(--radius-lg)', border: '1px solid #1e322a' }}>
          <CompletedToday tasks={tasks} />
        </div>
      </main>

      <aside className="dashboard-sidebar col-span-1" style={{ gridColumn: '2' }}>
        {/* Urgent Queue - red/warm tint */}
        <div style={{ backgroundColor: '#1f1719', borderRadius: 'var(--radius-lg)', border: '1px solid #3a2428' }}>
          <UrgentQueue
            tasks={urgentQueueTasks}
            onPromoteTask={promoteTask}
          />
        </div>

        {/* Schedule - blue tint */}
        <div className="mt-xl" style={{ backgroundColor: '#171a1f', borderRadius: 'var(--radius-lg)', border: '1px solid #242a38' }}>
          <Schedule items={schedule} />
        </div>
      </aside>

      <div className="dashboard-bottom">
        <TaskBacklog
          tasks={tasks}
          onPromoteTask={promoteTask}
          onMarkUrgent={toggleUrgent}
          onMarkComplete={markComplete}
        />
      </div>
    </Layout>
  );
}

export default App;
