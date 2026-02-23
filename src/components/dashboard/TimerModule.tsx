import React from 'react';
import { Play, Pause, Square } from 'lucide-react';
import { useTimer } from '../../hooks/useTimer';

interface TimerModuleProps {
    onSessionComplete: (durationSeconds: number) => void;
    onStatusChange: (status: 'idle' | 'running' | 'paused') => void;
    totalTimeTodaySeconds: number;
}

export const TimerModule: React.FC<TimerModuleProps> = ({
    onSessionComplete,
    onStatusChange,
    totalTimeTodaySeconds
}) => {
    const { isRunning, seconds, start, pause, stop, reset, formatted } = useTimer();

    const handleStart = () => {
        start();
        onStatusChange('running');
    };

    const handlePause = () => {
        pause();
        onStatusChange('paused');
    };

    const handleStop = () => {
        const duration = stop();
        onSessionComplete(duration);
        reset();
        onStatusChange('idle');
    };

    // Calculate total time including current running session
    const activeTotalTime = totalTimeTodaySeconds + seconds;
    const totalHours = Math.floor(activeTotalTime / 3600);
    const totalMins = Math.floor((activeTotalTime % 3600) / 60);

    return (
        <div className="timer-module flex flex-col items-center gap-lg mt-xl">
            <div
                className="font-bold tabular-nums"
                style={{ fontSize: '72px', lineHeight: 1, letterSpacing: '-0.04em' }}
            >
                {formatted.hours}:{formatted.minutes}:{formatted.seconds}
            </div>

            <div className="timer-controls flex items-center gap-md">
                {!isRunning ? (
                    <button
                        onClick={handleStart}
                        className="flex items-center justify-center gap-sm bg-accent text-bg font-bold rounded-md px-lg py-md hover-scale"
                        style={{
                            backgroundColor: 'var(--accent-primary)',
                            color: 'var(--bg-primary)',
                            padding: '12px 32px',
                            borderRadius: '8px'
                        }}
                    >
                        <Play size={20} fill="currentColor" />
                        <span>START</span>
                    </button>
                ) : (
                    <button
                        onClick={handlePause}
                        className="flex items-center justify-center gap-sm bg-card border text-primary font-bold rounded-md px-lg py-md hover-bg"
                        style={{
                            backgroundColor: 'transparent',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-primary)',
                            padding: '12px 32px',
                            borderRadius: '8px'
                        }}
                    >
                        <Pause size={20} fill="currentColor" />
                        <span>PAUSE</span>
                    </button>
                )}

                <button
                    onClick={handleStop}
                    disabled={seconds === 0}
                    className="flex items-center justify-center p-md rounded-md hover-danger border"
                    style={{
                        opacity: seconds === 0 ? 0.3 : 1,
                        cursor: seconds === 0 ? 'not-allowed' : 'pointer',
                        border: '1px solid var(--border-subtle)',
                        padding: '12px',
                        borderRadius: '8px',
                        color: 'var(--text-secondary)'
                    }}
                    title="Stop & Log Session"
                >
                    <Square size={20} />
                </button>
            </div>

            <div className="text-secondary text-sm mt-md">
                Total time logged today: <span className="text-primary font-medium">{totalHours}h {totalMins}m</span>
            </div>
        </div>
    );
};
