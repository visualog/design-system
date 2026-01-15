import { useState, useEffect } from 'react';

export interface Proposal {
    id: string;
    title: string;
    content: string;
    targetPage: string;
    selector?: string; // CSS selector to identify the element
    createdAt: number;
}

const STORAGE_KEY = 'design-system-proposals';

// Initial dummy data
const INITIAL_PROPOSALS: Proposal[] = [
    {
        id: 'primary-group',
        title: 'Primary 그룹 추가',
        content: `## Colors 파운데이션 페이지 업데이트

**상태:** 추후 결정 (Deferred)

### 배경
테마 컬러 섹션에 'Primary' 그룹이 없어 시스템 토큰(\`color_primary\`, \`color_background\` 등)을 확인하기 어려움.

### 제안된 변경 사항

#### 1. 데이터: \`theme_color_mapping.json\`
\`primary\` 그룹을 추가하여 시스템 테마 토큰 노출.

#### 2. 컴포넌트: \`ThemeColorMappingDisplay.tsx\`
UI 필터에 'Primary' 옵션 추가.

#### 3. 설명: \`semantic_descriptions.ts\`
\`[Category]: [Description]\` 형식으로 설명 표준화 유지.`,
        targetPage: '/colors',
        selector: '', // No specific selector for this general proposal
        createdAt: Date.now(),
    }
];

export const useProposals = () => {
    const [proposals, setProposals] = useState<Proposal[]>(() => {
        if (typeof window === 'undefined') return INITIAL_PROPOSALS;
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : INITIAL_PROPOSALS;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(proposals));
    }, [proposals]);

    const addProposal = (proposal: Omit<Proposal, 'createdAt'>) => {
        const newProposal: Proposal = {
            ...proposal,
            createdAt: Date.now(),
        };
        setProposals(prev => [newProposal, ...prev]);
    };

    const removeProposal = (id: string) => {
        setProposals(prev => prev.filter(p => p.id !== id));
    };

    const clearProposals = () => {
        setProposals(INITIAL_PROPOSALS);
    };

    return {
        proposals,
        addProposal,
        removeProposal,
        clearProposals,
    };
};
