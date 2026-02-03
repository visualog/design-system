import { Keyboard, Accessibility } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { AccessibilityMeta } from '@/data/componentRegistry';

interface AccessibilitySectionProps {
    data: AccessibilityMeta;
}

export const AccessibilitySection: React.FC<AccessibilitySectionProps> = ({ data }) => {
    return (
        <div className="flex flex-col gap-8 mt-4">
            {/* Keyboard Interaction */}
            {data.keyboard && data.keyboard.length > 0 && (
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <Keyboard className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-bold">키보드 인터랙션 (Keyboard)</h3>
                    </div>
                    <div className="rounded-xl border overflow-hidden">
                        <Table>
                            <TableHeader className="bg-muted/50">
                                <TableRow>
                                    <TableHead className="w-48 pl-6">키 (Key)</TableHead>
                                    <TableHead className="pr-6">동작 설명</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.keyboard.map((item, index) => (
                                    <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                                        <TableCell className="pl-6 font-mono text-sm">
                                            <kbd className="px-2 py-1 rounded bg-muted border text-xs font-sans shadow-sm mr-1">
                                                {item.key}
                                            </kbd>
                                        </TableCell>
                                        <TableCell className="pr-6 text-sm text-muted-foreground break-keep">
                                            {item.description}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}

            {/* ARIA Attributes */}
            {data.attributes && data.attributes.length > 0 && (
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <Accessibility className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-bold">접근성 속성 (ARIA)</h3>
                    </div>
                    <div className="rounded-xl border overflow-hidden">
                        <Table>
                            <TableHeader className="bg-muted/50">
                                <TableRow>
                                    <TableHead className="w-48 pl-6">속성명</TableHead>
                                    <TableHead className="pr-6">설명</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.attributes.map((attr, index) => (
                                    <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                                        <TableCell className="pl-6 font-mono text-xs text-primary font-bold">
                                            {attr.name}
                                        </TableCell>
                                        <TableCell className="pr-6 text-sm text-muted-foreground break-keep">
                                            {attr.description}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}

            {/* Role Info if available */}
            {data.role && (
                <p className="text-xs text-muted-foreground px-1">
                    기본 배정 역할(WAI-ARIA Role): <code className="bg-muted px-1.5 py-0.5 rounded text-primary font-bold">{data.role}</code>
                </p>
            )}
        </div>
    );
};
