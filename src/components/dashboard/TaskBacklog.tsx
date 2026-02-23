import React, { useState } from 'react';
import type { Task } from '../../types';
import { ChevronDown, ChevronRight, AlertCircle, ArrowUpCircle, CheckCircle2 } from 'lucide-react';

interface TaskBacklogProps {
    tasks: Task[];
    onPromoteTask: (taskId: string) => void;
    onMarkUrgent: (taskId: string) => void;
    onMarkComplete: (taskId: string) => void;
}

export const TaskBacklog: React.FC<TaskBacklogProps> = ({
    tasks,
    onPromoteTask,
    onMarkUrgent,
    onMarkComplete
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const backlogTasks = tasks.filter(t => t.status !== 'completed');

    return (
        <section className="card flex flex-col mt-xl" style={{ border: isExpanded ? '1px solid var(--border-subtle)' : '1px solid transparent', backgroundColor: isExpanded ? 'var(--bg-card)' : 'transparent', padding: isExpanded ? 'var(--spacing-lg)' : 0 }}>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full p-md rounded-md hover-bg text-left border-none"
                style={{ padding: 'var(--spacing-md)' }}
            >
                <div className="flex items-center gap-sm">
                    {isExpanded ? <ChevronDown size={20} className="text-secondary" /> : <ChevronRight size={20} className="text-secondary" />}
                    <h3 className="font-bold text-lg">Backlog & Archive</h3>
                    <span className="pill text-xs ml-sm">{backlogTasks.length} Pending</span>
                </div>
            </button>

            {isExpanded && (
                <div className="mt-md px-md pb-md overflow-x-auto">
                    <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                                <th className="pb-sm text-xs text-secondary font-medium uppercase tracking-wider w-1/2">Task</th>
                                <th className="pb-sm text-xs text-secondary font-medium uppercase tracking-wider w-1/4">Client</th>
                                <th className="pb-sm text-xs text-secondary font-medium uppercase tracking-wider">Due</th>
                                <th className="pb-sm text-xs text-secondary font-medium uppercase tracking-wider text-right pr-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {backlogTasks.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-lg text-center text-secondary text-sm">
                                        No tasks in backlog.
                                    </td>
                                </tr>
                            ) : (
                                backlogTasks.map((task) => (
                                    <tr key={task.id} className="group" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                        <td className="py-md pr-md">
                                            <div className="flex flex-col gap-xs">
                                                <div className="flex items-center gap-sm">
                                                    <span className="font-medium text-sm">{task.title}</span>
                                                    {task.isUrgent && <span className="pill urgent hidden lg:inline-flex" style={{ transform: 'scale(0.8)', transformOrigin: 'left center' }}>Urgent</span>}
                                                    {task.project && <span className="pill text-xs" style={{ transform: 'scale(0.8)', transformOrigin: 'left center' }}>{task.project}</span>}
                                                </div>
                                                {task.notes && (
                                                    <span className="text-xs text-tertiary" style={{ fontStyle: 'italic' }}>
                                                        📝 {task.notes}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-md text-sm text-secondary">{task.client}</td>
                                        <td className="py-md text-sm tabular-nums text-secondary">
                                            {new Date(task.dueDate).toLocaleDateString()}
                                        </td>
                                        <td className="py-md text-right">
                                            <div className="flex items-center justify-end gap-sm opacity-0 group-hover:opacity-100 transition-fast">
                                                <button
                                                    onClick={() => onPromoteTask(task.id)}
                                                    className="p-xs text-secondary hover:text-primary transition-fast"
                                                    title="Promote to Primary Bottleneck"
                                                >
                                                    <ArrowUpCircle size={18} />
                                                </button>
                                                <button
                                                    onClick={() => onMarkUrgent(task.id)}
                                                    className="p-xs text-secondary hover:text-danger transition-fast"
                                                    title="Toggle Urgent"
                                                >
                                                    <AlertCircle size={18} />
                                                </button>
                                                <button
                                                    onClick={() => onMarkComplete(task.id)}
                                                    className="p-xs text-secondary hover:text-success transition-fast"
                                                    title="Mark Complete"
                                                >
                                                    <CheckCircle2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};
