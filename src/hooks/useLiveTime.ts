import { useState, useEffect } from 'react';

export function useLiveTime() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // Update exactly on the minute mark for a clean UI without seconds jumpiness
        const updateTime = () => setTime(new Date());

        // Initial sync to the next second
        const now = new Date();
        const delayToNextSecond = 1000 - now.getMilliseconds();

        let intervalId: number;
        const timeoutId = setTimeout(() => {
            updateTime();
            intervalId = setInterval(updateTime, 1000) as unknown as number;
        }, delayToNextSecond);

        return () => {
            clearTimeout(timeoutId);
            if (intervalId) clearInterval(intervalId);
        };
    }, []);

    return time;
}

export function formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });
}
