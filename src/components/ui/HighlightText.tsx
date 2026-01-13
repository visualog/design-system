import React from 'react';

interface HighlightTextProps {
    text: string;
    highlight: string;
    className?: string;
}

export const HighlightText: React.FC<HighlightTextProps> = ({ text, highlight, className = '' }) => {
    if (!highlight || !highlight.trim()) {
        return <span className={className}>{text}</span>;
    }

    // Split by comma or plus, trim, and filter empty strings
    const terms = highlight.split(/[,+]/).map(term => term.trim()).filter(term => term.length > 0);

    if (terms.length === 0) {
        return <span className={className}>{text}</span>;
    }

    // Create a regex that matches any of the terms
    // Escape special regex characters in terms
    const escapedTerms = terms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escapedTerms.join('|')})`, 'gi');

    const parts = text.split(regex);

    return (
        <span className={className}>
            {parts.map((part, i) => {
                // Check if this part matches any of the terms (case-insensitive)
                const isMatch = terms.some(term => part.toLowerCase() === term.toLowerCase());

                return isMatch ? (
                    <span key={i} className="bg-yellow-200/50 text-foreground font-semibold rounded-[2px] px-0.5">
                        {part}
                    </span>
                ) : (
                    part
                );
            })}
        </span>
    );
};
