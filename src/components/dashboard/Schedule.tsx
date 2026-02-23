import React from 'react';
import type { ScheduleItem } from '../../types';
import { Calendar, AlignLeft } from 'lucide-react';

interface ScheduleProps {
    items: ScheduleItem[];
}

export const Schedule: React.FC<ScheduleProps> = ({ items }) => {
    const now = new Date();

    // Clean, minimal timeline
    return (
        <section className="card">
            <h3 className="font-bold text-lg mb-lg">Today</h3>

            {items.length === 0 ? (
                <p className="text-secondary text-sm">No scheduled events today.</p>
            ) : (
                <div className="flex flex-col relative pl-md">
                    {/* Vertical timeline line */}
                    <div
                        className="absolute left-0 top-2 bottom-4"
                        style={{ width: '1px', backgroundColor: 'var(--border-subtle)' }}
                    />

                    {items.map((item) => {
                        const start = new Date(item.startTime);
                        const end = new Date(item.endTime);
                        const isPast = end < now;
                        const isCurrent = start <= now && end >= now;

                        return (
                            <div key={item.id} className={`flex gap-md mb-md relative ${isPast ? 'opacity-50' : ''}`}>
                                {/* Timeline dot */}
                                <div
                                    className="absolute"
                                    style={{
                                        left: '-16px',
                                        top: '8px',
                                        width: '9px',
                                        height: '9px',
                                        borderRadius: '50%',
                                        backgroundColor: isCurrent ? 'var(--accent-primary)' : 'var(--bg-card)',
                                        border: `2px solid ${isCurrent ? 'var(--accent-primary)' : 'var(--text-tertiary)'}`,
                                        transform: 'translateX(-50%)'
                                    }}
                                />

                                <div className="text-xs font-medium tabular-nums" style={{ color: isCurrent ? 'var(--text-primary)' : 'var(--text-tertiary)', width: '60px', flexShrink: 0 }}>
                                    {start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                                </div>

                                <div className="flex flex-col gap-xs flex-grow">
                                    <div className={`text-sm ${isCurrent ? 'font-bold' : 'font-medium text-secondary'}`}>
                                        {item.title}
                                    </div>
                                    <div className="flex items-center gap-xs text-xs" style={{ color: 'var(--text-tertiary)' }}>
                                        {item.source === 'calendar' ? <Calendar size={12} /> : <AlignLeft size={12} />}
                                        <span>
                                            {start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - {end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};
