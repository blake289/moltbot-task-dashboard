import React from 'react';
import type { Task } from '../../types';

interface CompletedTodayProps {
    tasks: Task[];
}

export const CompletedToday: React.FC<CompletedTodayProps> = ({ tasks }) => {
    const today = new Date().toDateString();
    const completedToday = tasks.filter(t => {
        if (t.status !== 'completed' || !t.completedAt) return false;
        return new Date(t.completedAt).toDateString() === today;
    });

    if (completedToday.length === 0) {
        return (
            <div className="card" style={{ padding: 'var(--spacing-md)' }}>
                <div className="flex items-center gap-sm">
                    <span style={{ fontSize: '16px' }}>✅</span>
                    <span className="text-tertiary text-sm">No tasks completed today yet</span>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="flex items-center gap-sm mb-md">
                <span style={{ fontSize: '16px' }}>✅</span>
                <h3 className="font-medium text-sm uppercase tracking-wider">
                    Completed Today ({completedToday.length})
                </h3>
            </div>
            
            <div className="flex flex-col gap-sm">
                {completedToday.map((task) => (
                    <div 
                        key={task.id}
                        className="flex items-center gap-sm"
                        style={{ 
                            padding: 'var(--spacing-xs) 0',
                            borderBottom: '1px solid var(--border-subtle)'
                        }}
                    >
                        <span className="text-success">✓</span>
                        <span className="text-secondary text-sm" style={{ textDecoration: 'line-through', opacity: 0.7 }}>
                            {task.title}
                        </span>
                        {task.project && (
                            <span className="pill text-xs" style={{ marginLeft: 'auto' }}>
                                {task.project}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
