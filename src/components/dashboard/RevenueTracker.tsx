import React from 'react';
import type { LeadMetrics } from '../../types';

interface RevenueTrackerProps {
    metrics: LeadMetrics;
}

export const RevenueTracker: React.FC<RevenueTrackerProps> = ({ metrics }) => {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    const formatCPL = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    const statCards = [
        { label: 'Total Leads', value: metrics.totalLeads.toString(), highlight: false },
        { label: 'Leads Today', value: metrics.leadsToday.toString(), highlight: metrics.leadsToday > 0 },
        { label: 'Ad Spend', value: formatCurrency(metrics.adSpend), highlight: false },
        { label: 'CPL', value: formatCPL(metrics.cpl), highlight: false },
        { label: 'Conversions', value: metrics.conversions.toString(), highlight: metrics.conversions > 0 },
        { label: 'Conv. Rate', value: `${(metrics.conversionRate * 100).toFixed(1)}%`, highlight: metrics.conversionRate > 0.1 },
        { label: 'Projected Rev', value: formatCurrency(metrics.projectedRevenue), highlight: true },
    ];

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-md">
                <h3 className="font-medium" style={{ fontSize: '14px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    💰 Revenue Tracker
                </h3>
                <span className="text-tertiary text-xs">
                    Updated: {new Date(metrics.lastUpdated).toLocaleTimeString()}
                </span>
            </div>
            
            <div className="flex gap-md flex-wrap">
                {statCards.map((stat, idx) => (
                    <div 
                        key={idx} 
                        className="flex flex-col items-start"
                        style={{ minWidth: '80px' }}
                    >
                        <span className="text-tertiary text-xs uppercase tracking-wider mb-xs">
                            {stat.label}
                        </span>
                        <span 
                            className={`font-bold tabular-nums ${stat.highlight ? 'text-success' : ''}`}
                            style={{ fontSize: '20px', lineHeight: 1 }}
                        >
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
