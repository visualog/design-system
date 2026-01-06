import React from 'react';
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

const RadiusDisplay: React.FC = () => {
    const { radius } = designSystemData;

    return (
        <div className="flex flex-col gap-12 font-pretendard">
            {/* Visual Overview */}
            <section className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold">스케일</h2>
                </div>

                <div className="w-full border border-border rounded-xl bg-secondary/10 p-8">
                    <div className="flex flex-wrap gap-8 justify-center">
                        {radius.radius_tokens.map((token: any) => (
                            token.token !== "rounded-none" && (
                                <div key={token.token} className="flex flex-col items-center gap-4">
                                    <div
                                        className={`w-24 h-24 bg-white border-2 border-primary flex flex-col items-center justify-center gap-1 shadow-none ${token.token} relative overflow-hidden`}
                                        title={token.token}
                                    >
                                        {/* Visual Guides for Radius (All 4 corners) - Filled, No Border */}
                                        <div
                                            className="absolute -top-[2px] -left-[2px] bg-red-500/30 rounded-full"
                                            style={{
                                                width: `calc(${token.value} * 2)`,
                                                height: `calc(${token.value} * 2)`
                                            }}
                                        />
                                        <div
                                            className="absolute -top-[2px] -right-[2px] bg-red-500/30 rounded-full"
                                            style={{
                                                width: `calc(${token.value} * 2)`,
                                                height: `calc(${token.value} * 2)`
                                            }}
                                        />
                                        <div
                                            className="absolute -bottom-[2px] -left-[2px] bg-red-500/30 rounded-full"
                                            style={{
                                                width: `calc(${token.value} * 2)`,
                                                height: `calc(${token.value} * 2)`
                                            }}
                                        />
                                        <div
                                            className="absolute -bottom-[2px] -right-[2px] bg-red-500/30 rounded-full"
                                            style={{
                                                width: `calc(${token.value} * 2)`,
                                                height: `calc(${token.value} * 2)`
                                            }}
                                        />

                                        <span className="text-sm font-bold text-primary relative z-10">
                                            {token.token === 'rounded-full' ? 'full' : token.token.replace('rounded-', '')}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground relative z-10">{token.value}</span>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </section>

            {/* Token Table */}
            <section className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">토큰</h2>
                <div className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/3">토큰명</TableHead>
                                <TableHead className="w-1/3">값</TableHead>
                                <TableHead className="w-1/3">설명</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {radius.radius_tokens.map((token: any, index: number) => (
                                <TableRow key={index} className="hover:bg-muted/30">
                                    <TableCell className="font-mono text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <span className="text-primary">${token.token}</span>
                                            <Clipboard value={token.token} />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs">
                                        {token.value}
                                    </TableCell>
                                    <TableCell className="text-sm">{token.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>
        </div>
    );
};

export default RadiusDisplay;
