import React, { useState } from 'react';
import type { Task } from '../../types';
import { TimerModule } from './TimerModule';
import { Edit2, Lock, CheckCircle2 } from 'lucide-react';

interface FocusSectionProps {
    currentTask: Task | null;
    nextTasks: Task[];
    onUpdateTitle: (newTitle: string) => void;
    onSessionLog: (taskId: string, durationSeconds: number) => void;
    onCompleteTask: (taskId: string) => void;
    totalTimeTodaySeconds: number;
}

export const FocusSection: React.FC<FocusSectionProps> = ({
    currentTask,
    nextTasks,
    onUpdateTitle,
    onSessionLog,
    onCompleteTask,
    totalTimeTodaySeconds
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(currentTask?.title || '');
    const [timerStatus, setTimerStatus] = useState<'idle' | 'running' | 'paused'>('idle');

    React.useEffect(() => {
        if (currentTask) {
            setEditTitle(currentTask.title);
        }
    }, [currentTask]);

    const handleTitleSubmit = () => {
        if (editTitle.trim() !== currentTask?.title) {
            onUpdateTitle(editTitle.trim());
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleTitleSubmit();
        if (e.key === 'Escape') {
            setEditTitle(currentTask?.title || '');
            setIsEditing(false);
        }
    };

    if (!currentTask) {
        return (
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr', 
                gap: 'var(--spacing-xl)',
                padding: 'var(--spacing-xxl)',
                backgroundColor: '#251d38',
                borderRadius: 'var(--radius-lg)',
                border: '2px solid #5a3d8a',
                minHeight: '300px',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}>
                <p className="text-secondary" style={{ fontSize: '18px' }}>No active task. Select one from the queue below.</p>
            </div>
        );
    }

    return (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1.5fr 1fr', 
            gap: 'var(--spacing-xl)',
            minHeight: '400px'
        }}>
            {/* LEFT: Current Major Task */}
            <div style={{ 
                backgroundColor: '#251d38',
                borderRadius: 'var(--radius-lg)',
                border: '2px solid #5a3d8a',
                boxShadow: '0 0 40px rgba(138, 79, 255, 0.15)',
                padding: 'var(--spacing-xl)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {timerStatus === 'running' && (
                    <div style={{
                        position: 'absolute',
                        top: 0, right: 0, bottom: 0, left: 0,
                        boxShadow: 'inset 0 0 0 2px rgba(16, 185, 129, 0.3)',
                        pointerEvents: 'none',
                        zIndex: 0
                    }} />
                )}

                <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div className="flex items-center gap-sm" style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <span style={{ 
                            padding: '8px 16px', 
                            borderRadius: '8px', 
                            fontSize: '14px', 
                            fontWeight: 700, 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.1em',
                            backgroundColor: '#7c3aed',
                            color: '#fff',
                            boxShadow: '0 2px 8px rgba(124, 58, 237, 0.4)'
                        }}>🎯 CURRENT FOCUS</span>
                        {currentTask.isUrgent && <span className="pill urgent">URGENT</span>}
                    </div>

                    <div className="group" style={{ marginBottom: 'var(--spacing-lg)' }}>
                        {isEditing ? (
                            <input
                                autoFocus
                                className="font-bold w-full bg-transparent text-primary"
                                style={{ fontSize: '28px', letterSpacing: '-0.02em', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '4px' }}
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                onBlur={handleTitleSubmit}
                                onKeyDown={handleKeyDown}
                            />
                        ) : (
                            <h2
                                className="font-bold cursor-pointer"
                                style={{ fontSize: '28px', letterSpacing: '-0.02em', lineHeight: 1.3 }}
                                onClick={() => setIsEditing(true)}
                            >
                                {currentTask.title}
                                <Edit2 size={16} className="inline-block ml-sm opacity-0 group-hover:opacity-50 transition-fast" />
                            </h2>
                        )}
                    </div>

                    <div className="flex items-center gap-md text-secondary" style={{ fontSize: '16px', marginBottom: 'var(--spacing-xl)' }}>
                        <span>{currentTask.client}</span>
                        <span style={{ opacity: 0.5 }}>•</span>
                        <span>Due: {new Date(currentTask.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>

                    {currentTask.notes && (
                        <div style={{ 
                            padding: 'var(--spacing-md)', 
                            backgroundColor: 'rgba(255,255,255,0.05)', 
                            borderRadius: 'var(--radius-md)',
                            marginBottom: 'var(--spacing-xl)',
                            fontSize: '15px',
                            color: 'var(--text-secondary)'
                        }}>
                            📝 {currentTask.notes}
                        </div>
                    )}

                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TimerModule
                            onSessionComplete={(duration) => onSessionLog(currentTask.id, duration)}
                            onStatusChange={setTimerStatus}
                            totalTimeTodaySeconds={totalTimeTodaySeconds}
                        />
                    </div>

                    <button
                        onClick={() => onCompleteTask(currentTask.id)}
                        style={{
                            marginTop: 'var(--spacing-lg)',
                            padding: 'var(--spacing-md) var(--spacing-xl)',
                            backgroundColor: '#10B981',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '16px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 'var(--spacing-sm)'
                        }}
                    >
                        <CheckCircle2 size={20} /> Mark Complete
                    </button>
                </div>
            </div>

            {/* RIGHT: Next Steps Queue */}
            <div style={{ 
                backgroundColor: '#1a1722',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid #2a2640',
                padding: 'var(--spacing-xl)',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: 600, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.1em',
                    marginBottom: 'var(--spacing-lg)',
                    color: 'var(--text-secondary)'
                }}>
                    🔓 Next Steps
                </h3>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                    {nextTasks.length === 0 ? (
                        <p className="text-tertiary" style={{ fontSize: '15px' }}>No tasks queued after this one.</p>
                    ) : (
                        nextTasks.slice(0, 5).map((task, idx) => (
                            <div 
                                key={task.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 'var(--spacing-md)',
                                    padding: 'var(--spacing-md)',
                                    backgroundColor: idx === 0 ? 'rgba(124, 58, 237, 0.1)' : 'rgba(255,255,255,0.02)',
                                    border: idx === 0 ? '1px solid rgba(124, 58, 237, 0.3)' : '1px solid rgba(255,255,255,0.05)',
                                    borderRadius: 'var(--radius-md)',
                                    opacity: idx === 0 ? 1 : 0.6
                                }}
                            >
                                <div style={{ 
                                    width: '28px', 
                                    height: '28px', 
                                    borderRadius: '50%', 
                                    backgroundColor: idx === 0 ? '#7c3aed' : 'rgba(255,255,255,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    flexShrink: 0
                                }}>
                                    {idx === 0 ? '→' : <Lock size={14} />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '15px', fontWeight: 500, marginBottom: '4px' }}>
                                        {task.title}
                                    </div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                                        {task.client}
                                    </div>
                                </div>
                                {task.isUrgent && (
                                    <span className="pill urgent" style={{ fontSize: '10px', padding: '2px 6px' }}>!</span>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {nextTasks.length > 5 && (
                    <div style={{ marginTop: 'var(--spacing-md)', fontSize: '14px', color: 'var(--text-tertiary)' }}>
                        +{nextTasks.length - 5} more tasks
                    </div>
                )}
            </div>
        </div>
    );
};
