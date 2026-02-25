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

    const sections = [
        {
            title: 'Top of Funnel',
            metrics: [
                { label: 'Ad Spend', value: formatCurrency(metrics.adSpend) },
                { label: 'New Leads', value: metrics.newLeads?.toString() || '0', highlight: metrics.newLeads > 0 },
            ]
        },
        {
            title: 'Pipeline',
            metrics: [
                { label: 'Scheduled', value: metrics.scheduledConsults?.toString() || '0' },
                { label: 'Live Consults', value: metrics.liveConsults?.toString() || '0' },
                { label: 'Show %', value: formatPercent(metrics.showRate || 0), highlight: (metrics.showRate || 0) > 0.7 },
            ]
        },
        {
            title: 'Conversions',
            metrics: [
                { label: 'Closes', value: metrics.closes?.toString() || '0', highlight: metrics.closes > 0 },
                { label: 'Close %', value: formatPercent(metrics.closeRate || 0), highlight: (metrics.closeRate || 0) > 0.2 },
            ]
        },
        {
            title: 'Unit Economics',
            metrics: [
                { label: 'CAC', value: formatCurrency(metrics.cac || 0) },
                { label: 'AOV', value: formatCurrency(metrics.aov || 0), highlight: metrics.aov > 0 },
            ]
        },
        {
            title: '💰 Revenue',
            metrics: [
                { label: 'Contracted', value: formatCurrency(metrics.newContractedRevenue || 0) },
                { label: 'Upfront Cash', value: formatCurrency(metrics.upfrontCashCollected || 0) },
                { label: 'Total Cash', value: formatCurrency(metrics.totalCashCollected || 0), highlight: true },
                { label: 'Net Profit', value: formatCurrency(metrics.netOperatingProfit || 0), highlight: metrics.netOperatingProfit > 0 },
            ]
        },
    ];

    return (
        <div className="card" style={{ padding: 'var(--spacing-lg)' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700 }}>📊 KPIs</h3>
                <span className="text-tertiary" style={{ fontSize: '13px' }}>
                    {new Date(metrics.lastUpdated).toLocaleString()}
                </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                {sections.map((section, sIdx) => (
                    <div key={sIdx}>
                        <div style={{ 
                            fontSize: '12px', 
                            fontWeight: 600, 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.08em',
                            color: 'var(--text-tertiary)',
                            marginBottom: 'var(--spacing-sm)',
                            paddingBottom: '6px',
                            borderBottom: '1px solid rgba(255,255,255,0.06)'
                        }}>
                            {section.title}
                        </div>
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: `repeat(${section.metrics.length}, 1fr)`,
                            gap: 'var(--spacing-sm)'
                        }}>
                            {section.metrics.map((stat, idx) => (
                                <div key={idx} style={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    gap: '4px',
                                    backgroundColor: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    borderRadius: 'var(--radius-sm)',
                                    padding: 'var(--spacing-sm) var(--spacing-md)'
                                }}>
                                    <span className="text-tertiary" style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                                        {stat.label}
                                    </span>
                                    <span 
                                        className={`font-bold tabular-nums ${stat.highlight ? 'text-success' : ''}`}
                                        style={{ fontSize: '22px', lineHeight: 1 }}
                                    >
                                        {stat.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
