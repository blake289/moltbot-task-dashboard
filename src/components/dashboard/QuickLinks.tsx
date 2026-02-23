import React from 'react';
import type { QuickLink } from '../../types';

interface QuickLinksProps {
    links: QuickLink[];
}

export const QuickLinks: React.FC<QuickLinksProps> = ({ links }) => {
    if (links.length === 0) return null;

    return (
        <div className="flex gap-sm flex-wrap">
            {links.map((link) => (
                <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card flex items-center gap-md hover-bg"
                    style={{
                        padding: 'var(--spacing-md) var(--spacing-lg)',
                        textDecoration: 'none',
                        transition: 'all var(--transition-fast)'
                    }}
                >
                    {link.icon && <span style={{ fontSize: '18px' }}>{link.icon}</span>}
                    <span style={{ fontSize: '14px', fontWeight: 500 }}>{link.label}</span>
                    <span className="text-tertiary" style={{ fontSize: '12px', marginLeft: '4px' }}>↗</span>
                </a>
            ))}
        </div>
    );
};
