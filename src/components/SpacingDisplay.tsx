import React, { useMemo, useState } from 'react';
import { designSystemData } from '../utils/dataLoader';
import { Clipboard } from './ui/clipboard';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const SpacingDisplay: React.FC = () => {
    const { spacing } = designSystemData;
    const controlTokens = useMemo(() => [0, 1, 2, 4, 6, 8, 12, 16, 24], []);
    const [activeToken, setActiveToken] = useState(4);
    const activePixels = activeToken * 4;

    return (
        <div className="doc-content-stack">
            {/* Spacing System Table */}
            <section className="doc-subsection">
                <h2 className="text-doc-section-title">토큰</h2>
                <div className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/3 px-4 text-xs h-auto">토큰명</TableHead>
                                <TableHead className="w-1/3 px-4 text-xs h-auto">값</TableHead>
                                <TableHead className="w-1/3 px-4 text-xs h-auto">예시</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {spacing.spacing_values.map((s: { variable: string; px: number }, index: number) => (
                                <TableRow key={index}>
                                    <TableCell className="font-mono text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <span className="text-primary">{s.variable}</span>
                                            <Clipboard value={s.variable} />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs">
                                        {s.px}px
                                    </TableCell>
                                    <TableCell>
                                        <div className="bg-blue-200" style={{ height: '24px', width: `${s.px}px` }}></div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

            {/* Token Simulator */}
            <section className="doc-subsection">
                <h2 className="text-doc-section-title">미리보기</h2>
                <div className="bg-secondary/50 border border-border rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center justify-center min-h-[300px]">
                    <div className="flex flex-col items-center gap-4 w-full max-w-md">
                        <div className="flex items-center gap-0 w-full justify-center">
                            <div className="w-24 h-24 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center text-primary font-bold">Box A</div>
                            <div className="h-24 bg-red-500/20 flex items-center justify-center relative transition-all duration-300" style={{ width: `${activePixels}px` }}>
                                <span className="text-[10px] font-mono absolute -top-6 text-muted-foreground whitespace-nowrap">{activePixels}px (spacing-{activeToken})</span>
                                <div className="w-full h-[1px] bg-red-500 absolute top-1/2 left-0 -translate-y-1/2"></div>
                            </div>
                            <div className="w-24 h-24 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center text-primary font-bold">Box B</div>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center mt-6">
                            {controlTokens.map((space) => (
                                <button
                                    key={space}
                                    onClick={() => setActiveToken(space)}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                                        activeToken === space
                                            ? 'border-foreground bg-foreground text-background hover:bg-foreground'
                                            : 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
                                    }`}
                                    aria-pressed={activeToken === space}
                                >
                                    spacing-{space}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SpacingDisplay;
