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
                    className="card flex items-center gap-sm hover-bg"
                    style={{
                        padding: 'var(--spacing-sm) var(--spacing-md)',
                        textDecoration: 'none',
                        transition: 'all var(--transition-fast)'
                    }}
                >
                    {link.icon && <span style={{ fontSize: '16px' }}>{link.icon}</span>}
                    <span className="text-sm font-medium">{link.label}</span>
                    <span className="text-tertiary text-xs">↗</span>
                </a>
            ))}
        </div>
    );
};
