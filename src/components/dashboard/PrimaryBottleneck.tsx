import React, { useState } from 'react';
import type { Task } from '../../types';
import { TimerModule } from './TimerModule';
import { Edit2 } from 'lucide-react';

interface PrimaryBottleneckProps {
    task: Task | null;
    onUpdateTitle: (newTitle: string) => void;
    onSessionLog: (taskId: string, durationSeconds: number) => void;
    totalTimeTodaySeconds: number;
}

export const PrimaryBottleneck: React.FC<PrimaryBottleneckProps> = ({
    task,
    onUpdateTitle,
    onSessionLog,
    totalTimeTodaySeconds
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task?.title || '');
    const [timerStatus, setTimerStatus] = useState<'idle' | 'running' | 'paused'>('idle');

    // Update local state when task changes
    React.useEffect(() => {
        if (task) {
            setEditTitle(task.title);
        }
    }, [task]);

    const handleTitleSubmit = () => {
        if (editTitle.trim() !== task?.title) {
            onUpdateTitle(editTitle.trim());
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleTitleSubmit();
        if (e.key === 'Escape') {
            setEditTitle(task?.title || '');
            setIsEditing(false);
        }
    };

    if (!task) {
        return (
            <section className="card flex flex-col items-center justify-center p-xl" style={{ minHeight: '400px' }}>
                <p className="text-secondary mb-md">No primary bottleneck selected.</p>
                <button className="pill cursor-pointer hover:bg-white hover:text-black">
                    Select Task from Queue
                </button>
            </section>
        );
    }

    const isComplete = task.status === 'completed';

    return (
        <section className="card flex flex-col h-full relative overflow-hidden" style={{ minHeight: '520px', padding: 'var(--spacing-xl)' }}>
            {/* Background active pulse indicator if running */}
            {timerStatus === 'running' && (
                <div style={{
                    position: 'absolute',
                    top: 0, right: 0, bottom: 0, left: 0,
                    boxShadow: 'inset 0 0 0 1px rgba(16, 185, 129, 0.2)',
                    pointerEvents: 'none',
                    zIndex: 0
                }} />
            )}

            <div className="relative z-10 flex flex-col h-full">
                <header className="flex items-start justify-between mb-xl">
                    <div>
                        <div className="flex items-center gap-sm mb-md">
                            <span className="pill text-xs">FOCUS TARGET</span>
                            {task.isUrgent && <span className="pill urgent text-xs">URGENT</span>}
                        </div>

                        <div className="group relative">
                            {isEditing ? (
                                <input
                                    autoFocus
                                    className="font-bold w-full bg-transparent text-primary"
                                    style={{ fontSize: '32px', letterSpacing: '-0.02em', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '4px' }}
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    onBlur={handleTitleSubmit}
                                    onKeyDown={handleKeyDown}
                                />
                            ) : (
                                <h2
                                    className={`font-bold transition-fast cursor-pointer ${isComplete ? 'text-secondary line-through' : ''}`}
                                    style={{ fontSize: '32px', letterSpacing: '-0.02em', lineHeight: 1.2 }}
                                    onClick={() => setIsEditing(true)}
                                    title="Click to edit"
                                >
                                    {task.title}
                                    <Edit2 size={16} className="inline-block ml-sm opacity-0 group-hover:opacity-50 transition-fast" />
                                </h2>
                            )}
                        </div>

                        <div className="flex items-center gap-md mt-sm text-secondary font-medium text-sm">
                            <span>{task.client}</span>
                            <span className="opacity-50">•</span>
                            <span>Due: {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                    </div>
                </header>

                <div className="flex-grow flex items-center justify-center">
                    <TimerModule
                        onSessionComplete={(duration) => onSessionLog(task.id, duration)}
                        onStatusChange={setTimerStatus}
                        totalTimeTodaySeconds={totalTimeTodaySeconds}
                    />
                </div>
            </div>
        </section>
    );
};
