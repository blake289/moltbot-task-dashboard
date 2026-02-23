import React from 'react';
import type { LeadMetrics } from '../../types';

interface RevenueTrackerProps {
    metrics: LeadMetrics;
}

export const RevenueTracker: React.FC<RevenueTrackerProps> = ({ metrics }) => {
    const formatCurrency = (value: number) => {
        if (value >= 1000) {
            return `$${(value / 1000).toFixed(1)}k`;
        }
        return `$${value.toFixed(0)}`;
    };

    const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

    // Top funnel metrics - big numbers
    const primaryMetrics = [
        { label: 'Ad Spend', value: formatCurrency(metrics.adSpend), raw: metrics.adSpend },
        { label: 'Impressions', value: metrics.impressions?.toLocaleString() || '0', raw: metrics.impressions || 0 },
        { label: 'Clicks', value: metrics.clicks?.toLocaleString() || '0', raw: metrics.clicks || 0 },
        { label: 'LP Views', value: metrics.landingPageViews?.toLocaleString() || '0', raw: metrics.landingPageViews || 0 },
    ];

    // Conversion metrics
    const conversionMetrics = [
        { label: 'Form Fills', value: metrics.formFills?.toString() || '0', highlight: (metrics.formFills || 0) > 0 },
        { label: 'CPL', value: metrics.cpl > 0 ? formatCurrency(metrics.cpl) : '$0', highlight: false },
        { label: 'Bookings', value: metrics.bookings?.toString() || '0', highlight: (metrics.bookings || 0) > 0 },
        { label: 'Booking Rate', value: formatPercent(metrics.bookingRate || 0), highlight: (metrics.bookingRate || 0) > 0.3 },
    ];

    // Close metrics
    const closeMetrics = [
        { label: 'Shows', value: metrics.shows?.toString() || '0', highlight: (metrics.shows || 0) > 0 },
        { label: 'Show Rate', value: formatPercent(metrics.showRate || 0), highlight: (metrics.showRate || 0) > 0.7 },
        { label: 'Closes', value: metrics.closes?.toString() || '0', highlight: (metrics.closes || 0) > 0 },
        { label: 'Close Rate', value: formatPercent(metrics.closeRate || 0), highlight: (metrics.closeRate || 0) > 0.2 },
    ];

    // Revenue metrics - biggest
    const revenueMetrics = [
        { label: 'Revenue', value: formatCurrency(metrics.revenue || 0), highlight: true },
        { label: 'ROAS', value: metrics.adSpend > 0 ? `${((metrics.revenue || 0) / metrics.adSpend).toFixed(1)}x` : '0x', highlight: (metrics.revenue || 0) > metrics.adSpend },
    ];

    return (
        <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h3 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.01em' }}>📊 Funnel KPIs</h3>
                <span className="text-tertiary" style={{ fontSize: '16px' }}>
                    Updated: {new Date(metrics.lastUpdated).toLocaleString()}
                </span>
            </div>

            {/* Section Label */}
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <span className="text-tertiary" style={{ fontSize: '17px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Top of Funnel
                </span>
            </div>

            {/* Primary Metrics - Top of Funnel */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xxl)' }}>
                {primaryMetrics.map((stat, idx) => (
                    <div key={idx} style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 'var(--spacing-md)',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 'var(--radius-md)',
                        padding: 'var(--spacing-xl)'
                    }}>
                        <span className="text-secondary" style={{ fontSize: '18px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {stat.label}
                        </span>
                        <span className="font-bold tabular-nums" style={{ fontSize: '44px', lineHeight: 1.1 }}>
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', margin: 'var(--spacing-lg) 0 var(--spacing-xl)' }} />

            {/* Section Label */}
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <span className="text-tertiary" style={{ fontSize: '17px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Conversion
                </span>
            </div>

            {/* Conversion Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xxl)' }}>
                {conversionMetrics.map((stat, idx) => (
                    <div key={idx} style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 'var(--spacing-md)',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 'var(--radius-md)',
                        padding: 'var(--spacing-xl)'
                    }}>
                        <span className="text-secondary" style={{ fontSize: '18px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {stat.label}
                        </span>
                        <span 
                            className={`font-bold tabular-nums ${stat.highlight ? 'text-success' : ''}`}
                            style={{ fontSize: '40px', lineHeight: 1.1 }}
                        >
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', margin: 'var(--spacing-lg) 0 var(--spacing-xl)' }} />

            {/* Section Label */}
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <span className="text-tertiary" style={{ fontSize: '17px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Close
                </span>
            </div>

            {/* Close Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xxl)' }}>
                {closeMetrics.map((stat, idx) => (
                    <div key={idx} style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 'var(--spacing-md)',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 'var(--radius-md)',
                        padding: 'var(--spacing-xl)'
                    }}>
                        <span className="text-secondary" style={{ fontSize: '18px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {stat.label}
                        </span>
                        <span 
                            className={`font-bold tabular-nums ${stat.highlight ? 'text-success' : ''}`}
                            style={{ fontSize: '40px', lineHeight: 1.1 }}
                        >
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <div style={{ borderTop: '2px solid var(--border-subtle)', margin: 'var(--spacing-lg) 0 var(--spacing-xl)' }} />

            {/* Section Label */}
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <span className="text-tertiary" style={{ fontSize: '17px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Bottom Line
                </span>
            </div>

            {/* Revenue - Biggest */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-xl)' }}>
                {revenueMetrics.map((stat, idx) => (
                    <div key={idx} style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 'var(--spacing-md)',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--spacing-xl)'
                    }}>
                        <span className="text-secondary" style={{ fontSize: '20px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {stat.label}
                        </span>
                        <span 
                            className={`font-bold tabular-nums ${stat.highlight ? 'text-success' : ''}`}
                            style={{ fontSize: '64px', lineHeight: 1 }}
                        >
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
