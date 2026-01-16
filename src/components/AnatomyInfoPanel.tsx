import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { colorTokenData } from './AnatomyPreview';

interface AnatomyInfoPanelProps {
    hoveredAnatomyPart: string | null;
    hoveredColorToken: string | null;
    showColorInfo: boolean;
}

const AnatomyInfoPanel = ({
    hoveredAnatomyPart,
    hoveredColorToken,
    showColorInfo
}: AnatomyInfoPanelProps) => {
    return (
        <div className="absolute bottom-3 left-3 right-3 z-50 pointer-events-none">
            {/* Hovered Part Description */}
            <AnimatePresence>
                {hoveredAnatomyPart && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                        className="bg-neutral-900/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10 pointer-events-auto"
                    >
                        <div className="text-xs font-semibold text-white mb-0.5">
                            {{
                                'Container': '컨테이너',
                                'Label': '레이블',
                                'ActiveTrigger': '활성 트리거',
                                'InactiveTrigger': '비활성 트리거',
                                'Trigger': '트리거'
                            }[hoveredAnatomyPart] || hoveredAnatomyPart}
                        </div>
                        <div className="text-xs text-neutral-300">
                            {hoveredAnatomyPart === 'Container' && '탭 트리거들을 감싸는 컨테이너 영역입니다.'}
                            {hoveredAnatomyPart === 'ActiveTrigger' && '현재 선택된 탭을 나타내는 활성화된 버튼 요소입니다.'}
                            {hoveredAnatomyPart === 'InactiveTrigger' && '클릭하여 해당 탭으로 전환할 수 있는 비활성 버튼 요소입니다.'}
                            {hoveredAnatomyPart === 'Label' && '탭 트리거 내부의 텍스트 레이블입니다.'}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hovered Color Info */}
            <AnimatePresence>
                {showColorInfo && hoveredColorToken && colorTokenData[hoveredColorToken] && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                        className="bg-neutral-900/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10 pointer-events-auto"
                    >
                        <div className="flex items-center gap-3">
                            {/* Color Swatch */}
                            <div
                                className="w-9 h-9 rounded-md shrink-0"
                                style={{ backgroundColor: colorTokenData[hoveredColorToken].hex }}
                            />
                            {/* Info Text Column */}
                            <div className="flex flex-col min-w-0 text-left">
                                {/* Line 1: Usage Description */}
                                <div className="text-xs font-medium text-white leading-tight">
                                    {colorTokenData[hoveredColorToken].usage}
                                </div>
                                {/* Line 2: Token & Values */}
                                <div className="flex items-center gap-2 text-[10px] leading-tight mt-1">
                                    <span className="font-semibold text-neutral-300">{hoveredColorToken}</span>
                                    <span className="text-neutral-600">|</span>
                                    <span className="font-mono font-semibold text-white">{colorTokenData[hoveredColorToken].hex}</span>
                                    <span className="text-neutral-600 hidden sm:inline">|</span>
                                    <span className="font-mono font-semibold text-white hidden sm:inline">{colorTokenData[hoveredColorToken].rgb}</span>
                                    <span className="text-neutral-600 hidden md:inline">|</span>
                                    <span className="font-mono font-semibold text-white hidden md:inline">{colorTokenData[hoveredColorToken].hsl}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AnatomyInfoPanel;
