import React, { useState } from 'react';
import { designSystemData } from '../utils/dataLoader';
import { Clipboard } from './ui/clipboard';
import { Button } from './ui/button';
import { RefreshCw } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { DocSubsection } from './ui/DocLayout';

interface MotionDurationToken {
    token: string;
    value: string;
    variable: string;
    description: string;
}

interface MotionEasingToken {
    token: string;
    value: string;
    css_value: string;
    variable: string;
    description: string;
}

interface MotionData {
    duration: MotionDurationToken[];
    easing: MotionEasingToken[];
}

const MotionDisplay: React.FC = () => {
    const motion = designSystemData.motion as MotionData;
    const [activeDuration, setActiveDuration] = useState('300ms');
    const [activeEasing, setActiveEasing] = useState('ease-out');
    const [isAnimating, setIsAnimating] = useState(false);

    const handlePlayAnimation = () => {
        setIsAnimating(false);
        setTimeout(() => setIsAnimating(true), 50);
    };

    return (
        <div className="doc-content-stack font-pretendard">
            <DocSubsection
                title="인터랙션 플레이그라운드"
                description="지속 시간과 가속도 토큰 조합을 직접 바꿔보며 모션의 체감 차이를 확인합니다."
            >
                <div className="border border-border rounded-xl p-6 bg-muted/10 flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="flex flex-col gap-3 w-full md:w-1/3">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">지속 시간 토큰 (Duration)</label>
                                <div className="flex flex-wrap gap-2">
                                    {motion.duration.map((durationToken) => (
                                        <Button
                                            key={durationToken.token}
                                            variant={activeDuration === durationToken.value ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => {
                                                setActiveDuration(durationToken.value);
                                                handlePlayAnimation();
                                            }}
                                            className="text-xs"
                                        >
                                            {durationToken.token.replace('duration-', '')}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold">가속도 토큰 (Easing)</label>
                                <div className="flex flex-wrap gap-2">
                                    {motion.easing.map((easingToken) => (
                                        <Button
                                            key={easingToken.token}
                                            variant={activeEasing === easingToken.css_value ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => {
                                                setActiveEasing(easingToken.css_value);
                                                handlePlayAnimation();
                                            }}
                                            className="text-xs"
                                        >
                                            {easingToken.token.replace('ease-', '')}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <Button onClick={handlePlayAnimation} className="mt-2 gap-2">
                                <RefreshCw className={`h-4 w-4 ${isAnimating ? 'animate-spin' : ''}`} />
                                애니메이션 재생
                            </Button>
                        </div>

                        <div className="flex-1 w-full h-56 bg-white border border-border rounded-lg relative overflow-hidden flex items-center px-8 shadow-inner">
                            <div
                                className="w-16 h-16 bg-primary rounded-xl shadow-lg flex items-center justify-center text-primary-foreground font-bold"
                                style={{
                                    transition: `transform ${activeDuration} ${activeEasing}, opacity ${activeDuration} ${activeEasing}`,
                                    transform: isAnimating ? 'translateX(300%)' : 'translateX(0)',
                                    opacity: isAnimating ? 1 : 0.5,
                                }}
                            >
                                Box
                            </div>
                        </div>
                    </div>
                    <div className="text-xs font-mono text-muted-foreground text-center">
                        transition: transform {activeDuration} {activeEasing};
                    </div>
                </div>
            </DocSubsection>

            <DocSubsection
                title="지속 시간 토큰 (Duration)"
                description="인터랙션의 응답 속도와 전환 리듬을 정의하는 시간 토큰 목록입니다."
            >
                <div className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/4 px-4 text-xs h-auto">Token</TableHead>
                                <TableHead className="w-1/4 px-4 text-xs h-auto">Value</TableHead>
                                <TableHead className="w-1/4 px-4 text-xs h-auto">Variable</TableHead>
                                <TableHead className="w-1/4 px-4 text-xs h-auto">Description</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {motion.duration.map((token) => (
                                <TableRow key={token.token} className="hover:bg-muted/30 group">
                                    <TableCell className="font-mono text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <span className="text-primary">${token.token}</span>
                                            <Clipboard value={token.token} />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs">{token.value}</TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs">{token.variable}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{token.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </DocSubsection>

            <DocSubsection
                title="가속도 토큰 (Easing)"
                description="애니메이션 시작/중간/종료의 속도 변화를 제어하는 곡선 토큰입니다."
            >
                <div className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/4 px-4 text-xs h-auto">Token</TableHead>
                                <TableHead className="w-1/4 px-4 text-xs h-auto">Value</TableHead>
                                <TableHead className="w-1/4 px-4 text-xs h-auto">Variable</TableHead>
                                <TableHead className="w-1/4 px-4 text-xs h-auto">Description</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {motion.easing.map((token) => (
                                <TableRow key={token.token} className="hover:bg-muted/30 group">
                                    <TableCell className="font-mono text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <span className="text-primary">${token.token}</span>
                                            <Clipboard value={token.token} />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs">{token.value}</TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs">{token.variable}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{token.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </DocSubsection>
        </div>
    );
};

export default MotionDisplay;
