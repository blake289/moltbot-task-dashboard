import React from 'react';
import { Header } from './Header';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <div className="ambient-mists-container">
                <div className="mist-orb orb-1" />
                <div className="mist-orb orb-2" />
                <div className="mist-orb orb-3" />
            </div>

            <div className="dashboard-layout">
                <Header />
                {children}
            </div>
        </>
    );
};
