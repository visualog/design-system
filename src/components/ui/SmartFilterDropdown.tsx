import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check } from "lucide-react";

interface SmartFilterDropdownProps {
    triggerText: string;
    items: { value: string; label: string }[];
    selectedValues: string[];
    onSelectionChange: (values: string[]) => void;
    className?: string;
    width?: string;
    align?: "start" | "center" | "end";
}

export const SmartFilterDropdown: React.FC<SmartFilterDropdownProps> = ({
    triggerText,
    items,
    selectedValues,
    onSelectionChange,
    className,
    width = "w-48",
    align = "start"
}) => {
    const [hoverState, setHoverState] = useState<{ id: string, zone: 'checkbox' | 'label' } | null>(null);

    const isAllSelected = selectedValues.includes('All') || selectedValues.length === 0;

    const handleSelect = (value: string, mode: 'toggle' | 'only' | 'reset') => {
        if (mode === 'reset') {
            onSelectionChange(['All']);
            return;
        }

        if (mode === 'only') {
            onSelectionChange([value]);
            return;
        }

        // Toggle Mode
        if (value === 'All') {
            onSelectionChange(['All']);
            return;
        }

        let newSelection = selectedValues.filter(v => v !== 'All');
        if (newSelection.includes(value)) {
            newSelection = newSelection.filter(v => v !== value);
        } else {
            newSelection.push(value);
        }

        if (newSelection.length === 0) {
            onSelectionChange(['All']);
        } else {
            onSelectionChange(newSelection);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className={`${width} justify-between shadow-none shrink-0 group ${className}`}>
                    <span className="capitalize truncate">{triggerText}</span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2 w-64 max-h-80 overflow-y-auto" align={align}>
                {/* 'All' Item */}
                <DropdownMenuItem
                    className="flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-accent cursor-pointer group focus:bg-accent focus:text-accent-foreground relative"
                    onSelect={(e) => e.preventDefault()}
                    onMouseEnter={() => setHoverState({ id: 'All', zone: 'label' })}
                    onMouseLeave={() => setHoverState(null)}
                    onClick={() => handleSelect('All', 'reset')}
                >
                    <div
                        className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${isAllSelected ? 'bg-primary border-primary' : 'bg-background border-muted-foreground/30'}`}
                        onMouseEnter={(e) => {
                            e.stopPropagation();
                            setHoverState({ id: 'All', zone: 'checkbox' });
                        }}
                        onMouseLeave={(e) => {
                            e.stopPropagation();
                            setHoverState({ id: 'All', zone: 'label' });
                        }}
                    >
                        {isAllSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    <span className="text-sm font-medium">전체</span>

                    {hoverState?.id === 'All' && !isAllSelected && (
                        <span className="ml-auto text-xs text-muted-foreground/70 animate-in fade-in duration-200">
                            {hoverState.zone === 'checkbox' ? '선택' : '전체 선택'}
                        </span>
                    )}
                </DropdownMenuItem>

                <div className="h-px bg-border/50 my-1" />

                {items.map((item) => {
                    const isSelected = selectedValues.includes(item.value);
                    const isHovered = hoverState?.id === item.value;

                    return (
                        <DropdownMenuItem
                            key={item.value}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-accent cursor-pointer group focus:bg-accent focus:text-accent-foreground relative"
                            onSelect={(e) => e.preventDefault()}
                            onMouseEnter={() => setHoverState({ id: item.value, zone: 'label' })}
                            onMouseLeave={() => setHoverState(null)}
                            onClick={() => {
                                // Label Click Logic
                                if (isSelected) {
                                    handleSelect('All', 'reset'); // If already selected (and clicking label), user usually implies 'only this' or 'reset'? 
                                    // User logic from before: 
                                    // if (isSelected) handleCategorySelection('All'); -> Reset to All if clicking active label? 
                                    // Let's stick to user request: "Label Hover -> Select Only (if unchecked) / Select All (if checked)"
                                } else {
                                    handleSelect(item.value, 'only');
                                }
                            }}
                        >
                            {/* Checkbox Zone */}
                            <div
                                className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary' : 'bg-background border-muted-foreground/30'}`}
                                onMouseEnter={(e) => {
                                    e.stopPropagation();
                                    setHoverState({ id: item.value, zone: 'checkbox' });
                                }}
                                onMouseLeave={(e) => {
                                    e.stopPropagation();
                                    setHoverState({ id: item.value, zone: 'label' });
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelect(item.value, 'toggle');
                                }}
                            >
                                {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                            </div>

                            <span className="text-sm capitalize">{item.label}</span>

                            {isHovered && (
                                <span className="ml-auto text-xs text-muted-foreground/70 animate-in fade-in duration-200 select-none">
                                    {hoverState.zone === 'checkbox'
                                        ? (isSelected ? '선택 해제' : '선택')
                                        : (isSelected ? '전체 선택' : '이 항목만 선택')
                                    }
                                </span>
                            )}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
