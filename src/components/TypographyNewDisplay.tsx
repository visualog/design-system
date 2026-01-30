import React, { useState, useEffect } from 'react';
import { HighlightText } from './ui/HighlightText';
import { SearchBar } from './SearchBar';
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
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown, Type } from "lucide-react";


// New component for the Type Tester Panel
const TypeTesterPanel: React.FC<{ selectedStyle: any }> = ({ selectedStyle }) => {
    const defaultText = "The quick brown fox jumps over the lazy dog.";
    const [text, setText] = useState(defaultText);

    const getFontWeight = (weight: string) => {
        if (weight.includes('Bold')) return 700;
        if (weight.includes('Medium')) return 500;
        if (weight.includes('Regular')) return 400;
        return 400;
    };

    if (!selectedStyle) {
        return (
            <div className="sticky top-24 border rounded-xl p-8 bg-muted/30 flex flex-col items-center justify-center text-center h-[400px]">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Type className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Select a Token</h3>
                <p className="text-sm text-muted-foreground max-w-[200px]">
                    Click on any row in the table to view details and test the typography.
                </p>
            </div>
        );
    }

    return (
        <div className="sticky top-24 flex flex-col gap-6">
            {/* Selected Token Info Card */}
            <div className="border rounded-xl p-6 bg-card shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-lg font-semibold">{selectedStyle.style_name}</span>
                        <Clipboard value={selectedStyle.style_name} />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                        {selectedStyle.category}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div>
                        <span className="text-muted-foreground block mb-1 text-xs">Size</span>
                        <span className="font-medium font-mono">{selectedStyle.size}px</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground block mb-1 text-xs">Line Height</span>
                        <span className="font-medium font-mono">{selectedStyle.line_height}px</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground block mb-1 text-xs">Weight</span>
                        <span className="font-medium font-mono">{selectedStyle.weight}</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground block mb-1 text-xs">Letter Spacing</span>
                        <span className="font-medium font-mono tracking-tighter">-0.015em</span>
                    </div>
                </div>
            </div>

            {/* Live Tester */}
            <div className="border rounded-xl p-6 bg-card shadow-sm flex flex-col gap-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                    <Type className="w-4 h-4" /> Live Preview
                </h3>

                <textarea
                    className="w-full bg-muted/30 border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none h-24"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type to test..."
                />

                <div className="p-6 bg-slate-50 dark:bg-zinc-900 rounded-lg border border-dashed flex items-center justify-center min-h-[160px] overflow-hidden">
                    <p
                        className="text-center break-words max-w-full"
                        style={{
                            fontSize: `${selectedStyle.size}px`,
                            lineHeight: `${selectedStyle.line_height}px`,
                            fontWeight: getFontWeight(selectedStyle.weight),
                        }}
                    >
                        {text || defaultText}
                    </p>
                </div>
            </div>
        </div>
    );
};

const TypographyNewDisplay: React.FC = () => {
    const { typography } = designSystemData;
    const [selectedStyle, setSelectedStyle] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);

    // Set initial selected style to the first one available
    useEffect(() => {
        if (!selectedStyle && filteredTypography.length > 0) {
            // Optional: default to first item? 
            // Better to leave empty to encourage interaction or set explicitly.
        }
    }, []);

    const handleCategorySelection = (category: string) => {
        if (category === 'All') {
            setSelectedCategories(['All']);
            return;
        }

        let newSelection = selectedCategories.filter(c => c !== 'All');

        if (newSelection.includes(category)) {
            newSelection = newSelection.filter(c => c !== category);
        } else {
            newSelection.push(category);
        }

        if (newSelection.length === 0) {
            setSelectedCategories(['All']);
        } else {
            setSelectedCategories(newSelection);
        }
    };

    const getDropdownTriggerText = () => {
        if (selectedCategories.includes('All') || selectedCategories.length === 0) {
            return '전체';
        }
        if (selectedCategories.length === 1) {
            return selectedCategories[0];
        }
        return `${selectedCategories.length}개 선택됨`;
    };

    const availableCategories = Object.keys(typography).filter(key => key !== 'font_family');

    const filteredTypography = Object.entries(typography)
        .filter(([key]) => key !== 'font_family')
        .flatMap(([category, styles]: [string, any]) =>
            styles.map((style: any) => ({ ...style, category }))
        )
        .filter((style) => {
            const matchesCategory = selectedCategories.includes('All') || selectedCategories.includes(style.category);

            const termString = searchQuery.toLowerCase();
            const orGroups = termString.split(',').map(g => g.trim()).filter(g => g.length > 0);

            const matchesSearch = orGroups.length === 0 || orGroups.some(group => {
                const andTerms = group.split('+').map(t => t.trim()).filter(t => t.length > 0);
                if (andTerms.length === 0) return true;

                return andTerms.every(term =>
                    style.style_name.toLowerCase().includes(term)
                );
            });
            return matchesCategory && matchesSearch;
        });

    return (
        <div className="font-pretendard flex flex-col gap-8">
            {/* Filter Bar */}
            <div className="flex gap-4 items-center w-full">
                <SearchBar
                    placeholder="Search tokens (e.g. heading, bold)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    width="100%"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-48 justify-between shadow-none shrink-0">
                            <span className="capitalize">{getDropdownTriggerText().replace(/_/g, ' ')}</span>
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="max-h-64 overflow-y-auto">
                        <DropdownMenuItem onSelect={() => handleCategorySelection('All')}>전체</DropdownMenuItem>
                        {availableCategories.map(category => (
                            <DropdownMenuCheckboxItem
                                key={category}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={() => handleCategorySelection(category)}
                                className="capitalize"
                            >
                                {category.replace(/_/g, ' ')}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Column: Token List (7 cols) */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                    <div className="overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[40%] pl-6">Token Name</TableHead>
                                    <TableHead className="w-[20%]">Size</TableHead>
                                    <TableHead className="w-[20%]">Weight</TableHead>
                                    <TableHead className="w-[20%] text-right pr-6">Line Height</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTypography.map((style: any, index: number) => (
                                    <TableRow
                                        key={`${style.category}-${index}`}
                                        onClick={() => setSelectedStyle(style)}
                                        className={`cursor-pointer transition-colors ${selectedStyle?.style_name === style.style_name ? 'bg-primary/5' : 'hover:bg-muted/50'}`}
                                    >
                                        <TableCell className="font-mono text-sm font-medium pl-6">
                                            <div className="flex items-center gap-2">
                                                <span className={`${selectedStyle?.style_name === style.style_name ? 'text-primary font-bold' : 'text-foreground'}`}>
                                                    <HighlightText text={style.style_name} highlight={searchQuery} />
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground font-mono text-xs">{style.size}px</TableCell>
                                        <TableCell className="text-muted-foreground font-mono text-xs capitalize">{style.weight.replace('Pretendard ', '')}</TableCell>
                                        <TableCell className="text-muted-foreground font-mono text-xs text-right pr-6">{style.line_height}px</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {filteredTypography.length === 0 && (
                            <div className="p-12 text-center text-muted-foreground">
                                No typography tokens found.
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Tester (5 cols) */}
                <div className="lg:col-span-5 relative hidden lg:block h-full">
                    <TypeTesterPanel selectedStyle={selectedStyle} />
                </div>

                {/* Mobile Sheet fallback for Tester */}
                <div className="lg:hidden">
                    {selectedStyle && (
                        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t z-50">
                            <p className="font-bold mb-2">{selectedStyle.style_name}</p>
                            <Button className="w-full" onClick={() => setSelectedStyle(null)}>Close Preview</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TypographyNewDisplay;
