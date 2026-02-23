import React from 'react';
import { useLiveTime, formatDate, formatTime } from '../../hooks/useLiveTime';

export const Header: React.FC = () => {
    const now = useLiveTime();

    // Example logic: System is "active" during business hours, or if a timer is running
    const isSystemActive = true;

    return (
        <header className="dashboard-header">
            <div className="flex items-center gap-md">
                <h1 className="font-bold">Execution Command Center</h1>
            </div>

            <div className="flex items-center gap-lg">
                <div className="flex items-center gap-sm">
                    <span className="text-secondary font-medium text-sm">
                        {formatDate(now)}
                    </span>
                    <span className="text-secondary opacity-50">•</span>
                    <span className="font-medium">
                        {formatTime(now)}
                    </span>
                </div>

                <div
                    className={`status-dot ${isSystemActive ? 'active' : ''}`}
                    title="System Active"
                />
            </div>
        </header>
    );
};
