import React from 'react';
import type { Task } from '../../types';

interface UrgentQueueProps {
    tasks: Task[];
    onPromoteTask: (taskId: string) => void;
}

export const UrgentQueue: React.FC<UrgentQueueProps> = ({ tasks, onPromoteTask }) => {
    if (tasks.length === 0) {
        return (
            <section className="card flex-grow">
                <h3 className="font-bold text-lg mb-md">Urgent Queue</h3>
                <p className="text-secondary text-sm">No urgent tasks right now.</p>
            </section>
        );
    }

    // Sort: overdue first, then today, then others
    const sortedTasks = [...tasks].sort((a, b) => {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }).slice(0, 5); // Max 5 items

    return (
        <section className="card flex-grow">
            <div className="flex items-center justify-between mb-lg">
                <h3 className="font-bold text-lg">Urgent Queue</h3>
                <span className="text-xs text-secondary font-medium">{tasks.length} {tasks.length === 1 ? 'item' : 'items'}</span>
            </div>

            <div className="flex flex-col gap-sm">
                {sortedTasks.map((task) => {
                    const isOverdue = new Date(task.dueDate).getTime() < new Date().getTime();

                    return (
                        <div
                            key={task.id}
                            onClick={() => onPromoteTask(task.id)}
                            className="group flex flex-col p-md rounded-md border border-transparent transition-fast cursor-pointer"
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                                e.currentTarget.style.borderColor = 'transparent';
                            }}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-sm mb-sm">
                                    <div className={`status-dot ${isOverdue ? 'urgent' : ''}`} style={{ backgroundColor: isOverdue ? 'var(--accent-danger)' : 'var(--text-secondary)' }} />
                                    <span className="font-medium text-sm group-hover:text-primary transition-fast" style={{ color: 'var(--text-secondary)' }}>
                                        {task.title}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-tertiary)', paddingLeft: '20px' }}>
                                <span>{task.client}</span>
                                <span style={{ color: isOverdue ? 'var(--accent-danger)' : 'inherit' }}>
                                    {isOverdue ? 'Overdue' : new Date(task.dueDate).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                                </span>
                            </div>

                            {task.notes && (
                                <div className="text-xs mt-sm" style={{ color: 'var(--text-tertiary)', paddingLeft: '20px', fontStyle: 'italic' }}>
                                    📝 {task.notes}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
