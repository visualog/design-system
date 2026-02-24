import React from 'react';
import { cn } from '@/lib/utils';

interface DocPageFrameProps {
    children: React.ReactNode;
    className?: string;
}

interface DocPageHeaderProps {
    title: string;
    description: string;
    actions?: React.ReactNode;
    titleAddon?: React.ReactNode;
    className?: string;
}

interface DocSectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    id?: string;
    className?: string;
    contentClassName?: string;
}

interface DocSubsectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    id?: string;
    className?: string;
    contentClassName?: string;
    titleAs?: 'h2' | 'h3' | 'h4';
}

export const DocPageFrame: React.FC<DocPageFrameProps> = ({ children, className }) => {
    return <div className={cn('doc-page', className)}>{children}</div>;
};

export const DocPageHeader: React.FC<DocPageHeaderProps> = ({
    title,
    description,
    actions,
    titleAddon,
    className
}) => {
    return (
        <header className={cn('doc-page-header', className)}>
            <div className="doc-page-header-top">
                <div className="flex items-center gap-4">
                    <h1 className="text-doc-title tracking-tight">{title}</h1>
                    {titleAddon}
                </div>
                {actions && <div className="flex-shrink-0">{actions}</div>}
            </div>
            <p className="text-doc-subtitle text-muted-foreground doc-page-description">{description}</p>
        </header>
    );
};

export const DocSection: React.FC<DocSectionProps> = ({
    title,
    description,
    children,
    id,
    className,
    contentClassName
}) => {
    return (
        <section id={id} className={cn('doc-section', className)}>
            <div className="doc-section-header">
                <h2 className="text-doc-section-title">{title}</h2>
                {description && (
                    <p className="text-doc-section-subtitle text-muted-foreground doc-page-description">{description}</p>
                )}
            </div>
            <div className={cn('doc-section-content', contentClassName)}>{children}</div>
        </section>
    );
};

export const DocSubsection: React.FC<DocSubsectionProps> = ({
    title,
    description,
    children,
    id,
    className,
    contentClassName,
    titleAs = 'h3'
}) => {
    const HeadingTag = titleAs;

    return (
        <section id={id} className={cn('doc-subsection', className)}>
            <div className="doc-subsection-header">
                <HeadingTag className="text-doc-subsection-title">{title}</HeadingTag>
                {description && (
                    <p className="text-doc-body text-muted-foreground doc-page-description">{description}</p>
                )}
            </div>
            <div className={cn('doc-subsection-content', contentClassName)}>{children}</div>
        </section>
    );
};
