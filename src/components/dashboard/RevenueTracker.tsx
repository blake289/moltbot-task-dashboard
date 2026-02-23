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
        { label: 'Revenue', value: formatCurrency(metrics.revenue || 0), highlight: true, big: true },
        { label: 'ROAS', value: metrics.adSpend > 0 ? `${((metrics.revenue || 0) / metrics.adSpend).toFixed(1)}x` : '0x', highlight: (metrics.revenue || 0) > metrics.adSpend, big: true },
    ];

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-lg">
                <h3 className="font-bold text-lg">📊 Funnel KPIs</h3>
                <span className="text-tertiary text-xs">
                    Updated: {new Date(metrics.lastUpdated).toLocaleString()}
                </span>
            </div>

            {/* Primary Metrics - Top of Funnel */}
            <div className="flex gap-lg mb-lg flex-wrap">
                {primaryMetrics.map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-start" style={{ minWidth: '100px' }}>
                        <span className="text-tertiary text-xs uppercase tracking-wider mb-xs">
                            {stat.label}
                        </span>
                        <span className="font-bold tabular-nums" style={{ fontSize: '28px', lineHeight: 1 }}>
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', margin: 'var(--spacing-md) 0' }} />

            {/* Conversion Metrics */}
            <div className="flex gap-lg mb-lg flex-wrap">
                {conversionMetrics.map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-start" style={{ minWidth: '80px' }}>
                        <span className="text-tertiary text-xs uppercase tracking-wider mb-xs">
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

            {/* Close Metrics */}
            <div className="flex gap-lg mb-lg flex-wrap">
                {closeMetrics.map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-start" style={{ minWidth: '80px' }}>
                        <span className="text-tertiary text-xs uppercase tracking-wider mb-xs">
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

            {/* Divider */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', margin: 'var(--spacing-md) 0' }} />

            {/* Revenue - Biggest */}
            <div className="flex gap-xl flex-wrap">
                {revenueMetrics.map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-start" style={{ minWidth: '120px' }}>
                        <span className="text-tertiary text-xs uppercase tracking-wider mb-xs">
                            {stat.label}
                        </span>
                        <span 
                            className={`font-bold tabular-nums ${stat.highlight ? 'text-success' : ''}`}
                            style={{ fontSize: '36px', lineHeight: 1 }}
                        >
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
