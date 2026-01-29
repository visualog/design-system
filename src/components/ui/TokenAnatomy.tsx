import React from 'react';
import { cn } from '@/lib/utils';

interface TokenPartProps {
    label: string;
    description: string;
    color: 'primary' | 'secondary' | 'accent' | 'muted';
}

const TokenPart: React.FC<TokenPartProps> = ({ label, description, color }) => {
    const colorStyles = {
        primary: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
        secondary: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
        accent: "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800",
        muted: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
    };

    return (
        <div className="flex flex-col items-center gap-3 relative group">
            <div className={cn(
                "px-3 py-1.5 rounded-lg border font-mono text-sm font-semibold shadow-sm transition-transform group-hover:-translate-y-1",
                colorStyles[color]
            )}>
                {label}
            </div>
            <div className="flex flex-col items-center text-center max-w-[120px]">
                <div className="w-px h-3 bg-border mb-1"></div>
                <span className="text-xs font-semibold text-foreground">{color.charAt(0).toUpperCase() + color.slice(1)}</span>
                <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">{description}</span>
            </div>
        </div>
    );
};

export const TokenAnatomy: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={cn("p-8 rounded-xl border bg-card/50 flex flex-col items-center justify-center gap-8", className)}>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Token Naming Convention</h3>

            <div className="flex items-start gap-1 md:gap-2 flex-wrap justify-center">
                <TokenPart label="text" description="Property (속성)" color="muted" />
                <span className="mt-2 text-muted-foreground font-mono font-bold">-</span>
                <TokenPart label="brand" description="Role (역할)" color="primary" />
                <span className="mt-2 text-muted-foreground font-mono font-bold">-</span>
                <TokenPart label="subtle" description="Variant (변형)" color="secondary" />
                <span className="mt-2 text-muted-foreground font-mono font-bold">-</span>
                <TokenPart label="hover" description="State (상태)" color="accent" />
            </div>

            <p className="text-sm text-muted-foreground text-center max-w-lg leading-relaxed">
                토큰 이름은 <strong>속성(Property)</strong>, <strong>역할(Role)</strong>, <strong>변형(Variant)</strong>, 그리고 <strong>상태(State)</strong>의 4단계 조합으로 구성됩니다.<br />
                맥락(Context)을 먼저 정의하고, 구체적인 조건(Condition)을 뒤에 붙여 예측 가능한 시스템을 만듭니다.
            </p>
        </div>
    );
};
