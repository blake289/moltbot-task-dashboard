import React from 'react';
import type { LeadMetrics } from '../../types';

interface RevenueTrackerProps {
    metrics: LeadMetrics;
}

export const RevenueTracker: React.FC<RevenueTrackerProps> = ({ metrics }) => {
    const formatCurrency = (value: number) => {
        if (value >= 10000) {
            return `$${(value / 1000).toFixed(1)}k`;
        }
        if (value >= 1000) {
            return `$${(value / 1000).toFixed(2)}k`;
        }
        return `$${value.toFixed(0)}`;
    };

    const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

    const allMetrics = [
        { label: 'Ad Spend', value: formatCurrency(metrics.adSpend), section: 'funnel' },
        { label: 'New Leads', value: metrics.newLeads?.toString() || '0', highlight: metrics.newLeads > 0, section: 'funnel' },
        { label: 'Scheduled', value: metrics.scheduledConsults?.toString() || '0', section: 'pipeline' },
        { label: 'Live Consults', value: metrics.liveConsults?.toString() || '0', section: 'pipeline' },
        { label: 'Show %', value: formatPercent(metrics.showRate || 0), highlight: (metrics.showRate || 0) > 0.7, section: 'pipeline' },
        { label: 'Closes', value: metrics.closes?.toString() || '0', highlight: metrics.closes > 0, section: 'conversion' },
        { label: 'Close %', value: formatPercent(metrics.closeRate || 0), highlight: (metrics.closeRate || 0) > 0.2, section: 'conversion' },
        { label: 'CAC', value: formatCurrency(metrics.cac || 0), section: 'unit' },
        { label: 'AOV', value: formatCurrency(metrics.aov || 0), highlight: metrics.aov > 0, section: 'unit' },
        { label: 'Contracted Rev', value: formatCurrency(metrics.newContractedRevenue || 0), section: 'revenue' },
        { label: 'Upfront Cash', value: formatCurrency(metrics.upfrontCashCollected || 0), section: 'revenue' },
        { label: 'Total Cash', value: formatCurrency(metrics.totalCashCollected || 0), highlight: true, section: 'revenue' },
        { label: 'Net Profit', value: formatCurrency(metrics.netOperatingProfit || 0), highlight: metrics.netOperatingProfit > 0, section: 'revenue' },
    ];

    return (
        <div className="card" style={{ padding: 'var(--spacing-lg)' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700 }}>📊 KPIs</h3>
                <span className="text-tertiary" style={{ fontSize: '13px' }}>
                    {new Date(metrics.lastUpdated).toLocaleString()}
                </span>
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                gap: 'var(--spacing-md)'
            }}>
                {allMetrics.map((stat, idx) => (
                    <div key={idx} style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '6px',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 'var(--radius-sm)',
                        padding: 'var(--spacing-md)'
                    }}>
                        <span className="text-tertiary" style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {stat.label}
                        </span>
                        <span 
                            className={`font-bold tabular-nums ${stat.highlight ? 'text-success' : ''}`}
                            style={{ fontSize: '24px', lineHeight: 1 }}
                        >
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
