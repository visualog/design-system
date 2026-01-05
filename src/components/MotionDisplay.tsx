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
} from "@/components/ui/table";

const MotionDisplay: React.FC = () => {
    const { motion } = designSystemData;
    const [activeDuration, setActiveDuration] = useState('300ms');
    const [activeEasing, setActiveEasing] = useState('ease-out');
    const [isAnimating, setIsAnimating] = useState(false);

    const handlePlayAnimation = () => {
        setIsAnimating(false);
        setTimeout(() => setIsAnimating(true), 50);
    };

    return (
        <div className="flex flex-col gap-12 font-pretendard">

            {/* Interactive Playground */}
            <section className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold">인터랙티브 플레이그라운드</h2>
                    <p className="text-muted-foreground">
                        다양한 지속 시간과 가속도 조합을 테스트하여 모션의 느낌을 이해해보세요.
                    </p>
                </div>

                <div className="border border-border rounded-xl p-8 bg-muted/10 flex flex-col gap-8">
                    <div className="flex flex-col md:flex-row gap-8 items-center justify-between">

                        {/* Controls */}
                        <div className="flex flex-col gap-4 w-full md:w-1/3">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">지속 시간 (Duration)</label>
                                <div className="flex flex-wrap gap-2">
                                    {motion.duration.map((d: any) => (
                                        <Button
                                            key={d.token}
                                            variant={activeDuration === d.value ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => { setActiveDuration(d.value); handlePlayAnimation(); }}
                                            className="text-xs"
                                        >
                                            {d.token.replace('duration-', '')}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold">가속도 (Easing)</label>
                                <div className="flex flex-wrap gap-2">
                                    {motion.easing.map((e: any) => (
                                        <Button
                                            key={e.token}
                                            variant={activeEasing === e.css_value ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => { setActiveEasing(e.css_value); handlePlayAnimation(); }}
                                            className="text-xs"
                                        >
                                            {e.token.replace('ease-', '')}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <Button onClick={handlePlayAnimation} className="mt-4 gap-2">
                                <RefreshCw className={`h-4 w-4 ${isAnimating ? 'animate-spin' : ''}`} />
                                애니메이션 재생
                            </Button>
                        </div>

                        {/* Stage */}
                        <div className="flex-1 w-full h-64 bg-white border border-border rounded-lg relative overflow-hidden flex items-center px-12 shadow-inner">
                            <div
                                className={`w-16 h-16 bg-primary rounded-xl shadow-lg flex items-center justify-center text-primary-foreground font-bold`}
                                style={{
                                    transition: `transform ${activeDuration} ${activeEasing}, opacity ${activeDuration} ${activeEasing}`,
                                    transform: isAnimating ? 'translateX(300%)' : 'translateX(0)',
                                    opacity: isAnimating ? 1 : 0.5
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
            </section>

            {/* Duration Tokens */}
            <section className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">지속 시간 (Duration)</h2>
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
                            {motion.duration.map((token: any, index: number) => (
                                <TableRow key={index} className="hover:bg-muted/30 group">
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
            </section>

            {/* Easing Tokens */}
            <section className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">가속도 (Easing)</h2>
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
                            {motion.easing.map((token: any, index: number) => (
                                <TableRow key={index} className="hover:bg-muted/30 group">
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
            </section>
        </div>
    );
};

export default MotionDisplay;
