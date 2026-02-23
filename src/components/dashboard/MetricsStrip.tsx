import React, { useState, useEffect } from 'react';
import type { DashboardMetrics } from '../../types';

interface MetricsStripProps {
    metrics: DashboardMetrics;
}

export const MetricsStrip: React.FC<MetricsStripProps> = ({ metrics }) => {
    const [liveApiRate, setLiveApiRate] = useState(metrics.apiUsageRate);
    const [liveSpend, setLiveSpend] = useState(metrics.currentSpendToday);

    // Simulate live updating API and billing data
    useEffect(() => {
        const interval = setInterval(() => {
            // Randomly fluctuate API rate between -5 and +15
            setLiveApiRate(prev => Math.max(0, prev + Math.floor(Math.random() * 20) - 5));

            // Slowly increase spend every few seconds
            if (Math.random() > 0.7) {
                setLiveSpend(prev => prev + (Math.random() * 0.05));
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    const metricCards = [
        { label: 'Deep Work Today', value: formatDuration(metrics.deepWorkSecondsToday) },
        { label: 'Tasks Completed', value: metrics.tasksCompletedToday.toString() },
        {
            label: 'API Usage Rate (Mock)',
            value: `${liveApiRate} Req / Min`,
            live: true
        },
        {
            label: 'Current Spend (Mock)',
            value: `$${liveSpend.toFixed(2)}`,
            live: true
        }
    ];

    return (
        <div className="flex gap-md w-full flex-wrap">
            {metricCards.map((metric, idx) => (
                <div key={idx} className="card flex-1 flex flex-col items-start justify-center min-w-[140px]" style={{ padding: 'var(--spacing-md)' }}>
                    <div className="flex items-center gap-xs mb-xs">
                        <span className="text-secondary text-xs font-semibold uppercase tracking-wider">
                            {metric.label}
                        </span>
                        {metric.live && (
                            <div
                                className="status-dot active animate-pulse"
                                style={{ width: '6px', height: '6px' }}
                                title="Live Updating"
                            />
                        )}
                    </div>
                    <span className="text-primary font-bold tabular-nums" style={{ fontSize: '24px', lineHeight: 1 }}>
                        {metric.value}
                    </span>
                </div>
            ))}
        </div>
    );
};
