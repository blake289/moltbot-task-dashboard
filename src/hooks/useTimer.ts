import { useState, useEffect, useRef } from 'react';

export function useTimer(initialSeconds = 0) {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000) as unknown as number;
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning]);

    const start = () => setIsRunning(true);
    const pause = () => setIsRunning(false);
    const stop = () => {
        setIsRunning(false);
        return seconds; // Return elapsed time before resetting
    };
    const reset = () => {
        setIsRunning(false);
        setSeconds(0);
    };

    const formatTimeInfo = () => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return {
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: secs.toString().padStart(2, '0')
        };
    };

    return {
        seconds,
        isRunning,
        start,
        pause,
        stop,
        reset,
        formatted: formatTimeInfo()
    };
}
