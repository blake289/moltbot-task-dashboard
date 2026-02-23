import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { PrimaryBottleneck } from './components/dashboard/PrimaryBottleneck';
import { UrgentQueue } from './components/dashboard/UrgentQueue';
import { Schedule } from './components/dashboard/Schedule';
import { MetricsStrip } from './components/dashboard/MetricsStrip';
import { TaskBacklog } from './components/dashboard/TaskBacklog';
import { INITIAL_TASKS, MOCK_SCHEDULE, MOCK_METRICS } from './data/mockState';
import type { Task } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [metrics, setMetrics] = useState(MOCK_METRICS);

  const primaryTask = tasks.find(t => t.status === 'in_progress') || null;
  const urgentQueueTasks = tasks.filter(t => t.status !== 'in_progress' && t.status !== 'completed');

  const promoteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.map(task => {
      if (task.id === taskId) return { ...task, status: 'in_progress' };
      if (task.status === 'in_progress') return { ...task, status: 'todo' };
      return task;
    }));
  };

  const updateTaskTitle = (taskId: string, newTitle: string) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === taskId ? { ...task, title: newTitle } : task
    ));
  };

  const toggleUrgent = (taskId: string) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === taskId ? { ...task, isUrgent: !task.isUrgent } : task
    ));
  };

  const markComplete = (taskId: string) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === taskId ? { ...task, status: 'completed' } : task
    ));
    setMetrics(prev => ({
      ...prev,
      tasksCompletedToday: prev.tasksCompletedToday + 1
    }));
  };

  const handleSessionLog = (taskId: string, durationSeconds: number) => {
    console.log(`Session logged for task ${taskId}: ${durationSeconds}s`);
    // In a real app we'd save this to `FocusSession` array
    setMetrics(prev => ({
      ...prev,
      deepWorkSecondsToday: prev.deepWorkSecondsToday + durationSeconds
    }));
  };

  return (
    <Layout>
      <main className="dashboard-main col-span-1 border-r" style={{ gridColumn: '1', borderRight: '1px solid var(--border-subtle)', paddingRight: 'var(--spacing-xl)' }}>
        <PrimaryBottleneck
          task={primaryTask}
          onUpdateTitle={(title) => primaryTask && updateTaskTitle(primaryTask.id, title)}
          onSessionLog={handleSessionLog}
          totalTimeTodaySeconds={metrics.deepWorkSecondsToday}
        />

        <div className="mt-xl">
          <MetricsStrip metrics={metrics} />
        </div>
      </main>

      <aside className="dashboard-sidebar col-span-1" style={{ gridColumn: '2' }}>
        <UrgentQueue
          tasks={urgentQueueTasks}
          onPromoteTask={promoteTask}
        />

        <Schedule items={MOCK_SCHEDULE} />
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
