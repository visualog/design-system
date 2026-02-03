import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface PrincipleItem {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface PrinciplesSectionProps {
    items: PrincipleItem[];
    className?: string;
}

export const PrinciplesSection: React.FC<PrinciplesSectionProps> = ({ items, className }) => {
    return (
        <section className={`grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-5 ${className || ''}`}>
            {items.map((item, index) => (
                <div key={index} className="flex flex-col gap-3 p-6 bg-card text-card-foreground border rounded-xl hover:bg-muted/50 transition-colors h-full">
                    <div className="p-2.5 w-fit rounded-lg bg-primary/10 text-primary mb-1">
                        <item.icon size={20} strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed break-keep">
                            {item.description}
                        </p>
                    </div>
                </div>
            ))}
        </section>
    );
};
