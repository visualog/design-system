import React from 'react';
import { designSystemData } from '../utils/dataLoader';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Info } from 'lucide-react';
import { DocSubsection } from './ui/DocLayout';

interface DeviceResolution {
    device: string;
    css_width: string;
    css_height: string;
    aspect_ratio: string;
}

interface BreakpointToken {
    breakpoint: string;
    class_infix: string;
    dimensions: string;
    notes: string;
}

interface MobileTabletLayout {
    device_width_range: string;
    left_margin: string;
    right_margin: string;
    gutter: string;
}

interface DesktopLayout extends MobileTabletLayout {
    body_width?: string;
    column_width?: string;
}

interface LayoutData {
    deviceResolutions: {
        device_resolutions: DeviceResolution[];
    };
    breakpoints: {
        breakpoints: BreakpointToken[];
    };
    mainLayouts: {
        mobile_tablet_layouts: MobileTabletLayout[];
        desktop_layouts: DesktopLayout[];
        notes?: string[];
    };
}

const LayoutDisplay: React.FC = () => {
    const layout = designSystemData.layout as LayoutData;

    return (
        <div className="doc-content-stack-tight">
            <DocSubsection
                title="기기 해상도"
                description="주요 디바이스의 CSS 기준 해상도와 화면 비율을 확인합니다."
            >
                <div className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/4 px-4 text-xs h-auto">기기</TableHead>
                                <TableHead className="w-1/4 px-4 text-xs h-auto">너비</TableHead>
                                <TableHead className="w-1/4 px-4 text-xs h-auto">높이</TableHead>
                                <TableHead className="w-1/4 px-4 text-xs h-auto">비율</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {layout.deviceResolutions.device_resolutions.map((device) => (
                                <TableRow key={`${device.device}-${device.css_width}-${device.css_height}`}>
                                    <TableCell className="font-medium text-sm text-primary">{device.device}</TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs">{device.css_width}px</TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs">{device.css_height}px</TableCell>
                                    <TableCell className="text-muted-foreground text-xs">{device.aspect_ratio}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </DocSubsection>

            <DocSubsection
                title="브레이크포인트"
                description="반응형 레이아웃 전환 기준과 각 구간의 목적을 정의합니다."
            >
                <div className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/4 px-4 text-xs h-auto">중단점</TableHead>
                                <TableHead className="w-1/4 px-4 text-xs h-auto">식별자</TableHead>
                                <TableHead className="w-1/4 px-4 text-xs h-auto">규격</TableHead>
                                <TableHead className="w-1/4 px-4 text-xs h-auto">비고</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {layout.breakpoints.breakpoints.map((bp) => (
                                <TableRow key={`${bp.breakpoint}-${bp.class_infix}`}>
                                    <TableCell className="font-medium text-sm text-primary">{bp.breakpoint}</TableCell>
                                    <TableCell className="font-mono text-xs text-primary">{bp.class_infix}</TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs">{bp.dimensions}</TableCell>
                                    <TableCell className="text-muted-foreground text-xs">{bp.notes}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </DocSubsection>

            <DocSubsection
                title="모바일/태블릿 레이아웃"
                description="중소형 뷰포트에서의 좌우 마진과 거터 기준입니다."
            >
                <div className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/4 px-4 text-xs h-auto">기기 너비</TableHead>
                                <TableHead className="w-1/4 px-4 text-xs h-auto">좌측 여백</TableHead>
                                <TableHead className="w-1/4 px-4 text-xs h-auto">우측 여백</TableHead>
                                <TableHead className="w-1/4 px-4 text-xs h-auto">거터</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {layout.mainLayouts.mobile_tablet_layouts.map((layoutToken) => (
                                <TableRow key={layoutToken.device_width_range}>
                                    <TableCell className="font-medium text-sm text-primary">{layoutToken.device_width_range}</TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs">{layoutToken.left_margin}px</TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs">{layoutToken.right_margin}px</TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs">{layoutToken.gutter}px</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </DocSubsection>

            <DocSubsection
                title="데스크톱 레이아웃"
                description="대형 뷰포트에서의 마진, 본문 너비, 컬럼 너비 기준입니다."
            >
                <div className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/6 px-4 text-xs h-auto whitespace-nowrap">기기 너비</TableHead>
                                <TableHead className="w-1/6 px-4 text-xs h-auto whitespace-nowrap">좌측 여백</TableHead>
                                <TableHead className="w-1/6 px-4 text-xs h-auto whitespace-nowrap">우측 여백</TableHead>
                                <TableHead className="w-1/6 px-4 text-xs h-auto whitespace-nowrap">거터</TableHead>
                                <TableHead className="w-1/6 px-4 text-xs h-auto whitespace-nowrap">바디 너비</TableHead>
                                <TableHead className="w-1/6 px-4 text-xs h-auto whitespace-nowrap">컬럼 너비</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {layout.mainLayouts.desktop_layouts.map((layoutToken) => (
                                <TableRow key={layoutToken.device_width_range}>
                                    <TableCell className="font-medium text-sm text-primary">{layoutToken.device_width_range}</TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs">{layoutToken.left_margin}px</TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs">{layoutToken.right_margin}px</TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs">{layoutToken.gutter}px</TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs">{layoutToken.body_width ? `${layoutToken.body_width}px` : '-'}</TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs">{layoutToken.column_width ? `${layoutToken.column_width}px` : '-'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </DocSubsection>

            {layout.mainLayouts.notes && layout.mainLayouts.notes.length > 0 && (
                <DocSubsection
                    title="참고사항"
                    description="레이아웃 운영 시 함께 확인해야 하는 조건과 예외 사항입니다."
                >
                    <div className="rounded-lg border bg-muted/30 p-6">
                        <h3 className="flex items-center gap-2 text-base font-semibold mb-3">
                            <Info className="w-4 h-4" />
                            운영 메모
                        </h3>
                        <ul className="list-disc pl-5 space-y-1">
                            {layout.mainLayouts.notes.map((note, index) => (
                                <li key={index} className="text-sm text-muted-foreground">{note}</li>
                            ))}
                        </ul>
                    </div>
                </DocSubsection>
            )}
        </div>
    );
};

export default LayoutDisplay;
