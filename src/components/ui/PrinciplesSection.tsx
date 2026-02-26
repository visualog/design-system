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
    const iconToneClasses = [
        'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
        'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
        'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
        'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300'
    ];

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
                <div
                    key={index}
                    className="flex flex-col gap-4 p-6 md:p-7 bg-card text-card-foreground border border-border/80 rounded-xl hover:shadow-md transition-[box-shadow,border-color] h-full"
                >
                    <div className="flex items-center gap-3 min-h-5">
                        {item.icon && (
                            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${iconToneClasses[index % iconToneClasses.length]}`}>
                                <item.icon size={18} strokeWidth={2.4} />
                            </div>
                        )}
                        <h3 className="text-doc-subsection-title text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-doc-body text-muted-foreground leading-relaxed break-keep">
                        {item.description}
                    </p>
                </div>
            ))}
        </section>
    );
};
