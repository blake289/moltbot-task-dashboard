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

    // Top of Funnel
    const topFunnel = [
        { label: 'Ad Spend', value: formatCurrency(metrics.adSpend) },
        { label: 'New Leads', value: metrics.newLeads?.toString() || '0', highlight: metrics.newLeads > 0 },
    ];

    // Pipeline
    const pipeline = [
        { label: 'Scheduled Consults', value: metrics.scheduledConsults?.toString() || '0' },
        { label: 'Live Consults', value: metrics.liveConsults?.toString() || '0' },
        { label: 'Show %', value: formatPercent(metrics.showRate || 0), highlight: (metrics.showRate || 0) > 0.7 },
    ];

    // Conversions
    const conversions = [
        { label: 'Closes', value: metrics.closes?.toString() || '0', highlight: metrics.closes > 0 },
        { label: 'Close %', value: formatPercent(metrics.closeRate || 0), highlight: (metrics.closeRate || 0) > 0.2 },
    ];

    // Unit Economics
    const unitEcon = [
        { label: 'CAC', value: formatCurrency(metrics.cac || 0) },
        { label: 'AOV', value: formatCurrency(metrics.aov || 0), highlight: metrics.aov > 0 },
    ];

    // Revenue - Big numbers
    const revenue = [
        { label: 'New Contracted Revenue', value: formatCurrency(metrics.newContractedRevenue || 0) },
        { label: 'Upfront Cash', value: formatCurrency(metrics.upfrontCashCollected || 0) },
        { label: 'Total Cash', value: formatCurrency(metrics.totalCashCollected || 0), highlight: true },
        { label: 'Net Profit', value: formatCurrency(metrics.netOperatingProfit || 0), highlight: metrics.netOperatingProfit > 0 },
    ];

    const MetricBox = ({ label, value, highlight = false, big = false }: { label: string; value: string; highlight?: boolean; big?: boolean }) => (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 'var(--spacing-md)',
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--spacing-xl)'
        }}>
            <span className="text-secondary" style={{ fontSize: '16px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {label}
            </span>
            <span 
                className={`font-bold tabular-nums ${highlight ? 'text-success' : ''}`}
                style={{ fontSize: big ? '56px' : '40px', lineHeight: 1.1 }}
            >
                {value}
            </span>
        </div>
    );

    const SectionLabel = ({ children }: { children: React.ReactNode }) => (
        <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <span className="text-tertiary" style={{ fontSize: '15px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {children}
            </span>
        </div>
    );

    return (
        <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h3 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.01em' }}>📊 KPIs</h3>
                <span className="text-tertiary" style={{ fontSize: '15px' }}>
                    Updated: {new Date(metrics.lastUpdated).toLocaleString()}
                </span>
            </div>

            {/* Top of Funnel */}
            <SectionLabel>Top of Funnel</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xxl)' }}>
                {topFunnel.map((stat, idx) => (
                    <MetricBox key={idx} {...stat} />
                ))}
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', margin: 'var(--spacing-lg) 0 var(--spacing-xl)' }} />

            {/* Pipeline */}
            <SectionLabel>Pipeline</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xxl)' }}>
                {pipeline.map((stat, idx) => (
                    <MetricBox key={idx} {...stat} />
                ))}
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', margin: 'var(--spacing-lg) 0 var(--spacing-xl)' }} />

            {/* Conversions + Unit Economics */}
            <SectionLabel>Conversions & Unit Economics</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xxl)' }}>
                {[...conversions, ...unitEcon].map((stat, idx) => (
                    <MetricBox key={idx} {...stat} />
                ))}
            </div>

            {/* Divider */}
            <div style={{ borderTop: '2px solid var(--border-subtle)', margin: 'var(--spacing-lg) 0 var(--spacing-xl)' }} />

            {/* Revenue */}
            <SectionLabel>💰 Revenue</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-lg)' }}>
                {revenue.map((stat, idx) => (
                    <MetricBox key={idx} {...stat} big={idx >= 2} />
                ))}
            </div>
        </div>
    );
};
