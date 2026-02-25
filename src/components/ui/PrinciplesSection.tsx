import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface PrincipleItem {
    icon?: LucideIcon;
    title: string;
    description: React.ReactNode;
}

interface PrinciplesSectionProps {
    items: PrincipleItem[];
    className?: string;
    variant?: 'card' | 'list';
}

export const PrinciplesSection: React.FC<PrinciplesSectionProps> = ({
    items,
    className,
    variant = 'card'
}) => {
    if (variant === 'list') {
        return (
            <ul className={`list-disc pl-5 flex flex-col gap-4 text-muted-foreground ${className || ''}`}>
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="flex flex-col gap-0"
                    >
                        <div className="flex items-center gap-2.5">
                            {item.icon && (
                                <div className="text-primary">
                                    <item.icon size={18} strokeWidth={2.3} />
                                </div>
                            )}
                            <h3 className="text-doc-subsection-title text-foreground">{item.title}</h3>
                        </div>
                        <p className="text-doc-body text-muted-foreground break-keep">
                            {item.description}
                        </p>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <section className={`grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-5 ${className || ''}`}>
            {items.map((item, index) => (
                <div key={index} className="flex flex-col gap-4 p-6 bg-card text-card-foreground border rounded-xl hover:bg-muted/50 transition-colors h-full">
                    <div className="flex items-center gap-3 min-h-5">
                        {item.icon && (
                            <div className="text-primary">
                                <item.icon size={20} strokeWidth={2.5} />
                            </div>
                        )}
                        <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed break-keep">
                        {item.description}
                    </p>
                </div>
            ))}
        </section>
    );
};
