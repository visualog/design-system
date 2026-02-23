import { motion, AnimatePresence } from 'motion/react';
import { colorTokenData } from './anatomy-meta';
import ColorSwatch from '@/components/ui/ColorSwatch';

interface AnatomyInfoPanelProps {
    hoveredAnatomyPart: string | null;
    hoveredColorToken: string | null;
    showColorInfo: boolean;
    customColorName?: string | null; // Custom name from ColorLabel annotation
}

const AnatomyInfoPanel = ({
    hoveredAnatomyPart,
    hoveredColorToken,
    showColorInfo,
    customColorName
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
                                'ActiveTrigger': '인디케이터',
                                'InactiveTrigger': '비활성 탭',
                                'HoverTrigger': '호버 탭',
                                'Trigger': '트리거',
                                'Icon': '아이콘',
                                'Track': '스위치 트랙',
                                'Thumb': '스위치 썸',
                                'MenuSurface': '메뉴 패널',
                                'MenuItem': '메뉴 아이템',
                                'HeaderCell': '헤더 셀',
                                'Cell': '본문 셀',
                                'SearchField': '검색 필드',
                                'SectionGroup': '내비게이션 그룹',
                                'NavItem': '내비게이션 아이템',
                                'FooterAction': '푸터 액션'
                            }[hoveredAnatomyPart] || hoveredAnatomyPart}
                        </div>
                        <div className="text-xs text-neutral-300">
                            {hoveredAnatomyPart === 'Container' && '컴포넌트의 배경 및 외곽선을 포함하는 컨테이너 영역입니다.'}
                            {hoveredAnatomyPart === 'ActiveTrigger' && '현재 선택된 탭을 나타내는 활성 인디케이터입니다.'}
                            {hoveredAnatomyPart === 'InactiveTrigger' && '클릭하여 해당 탭으로 전환할 수 있는 비활성 탭입니다.'}
                            {hoveredAnatomyPart === 'HoverTrigger' && '마우스 오버 시 나타나는 호버 상태의 탭입니다.'}
                            {hoveredAnatomyPart === 'Label' && '컴포넌트의 목적을 나타내는 텍스트 레이블입니다.'}
                            {hoveredAnatomyPart === 'Icon' && '기능이나 의미를 시각적으로 전달하는 아이콘 요소입니다.'}
                            {hoveredAnatomyPart === 'Track' && '스위치의 on/off 상태를 나타내는 배경 트랙입니다.'}
                            {hoveredAnatomyPart === 'Thumb' && '사용자 인터랙션에 따라 이동하는 스위치 핸들입니다.'}
                            {hoveredAnatomyPart === 'MenuSurface' && '드롭다운 항목이 표시되는 플로팅 메뉴 표면입니다.'}
                            {hoveredAnatomyPart === 'MenuItem' && '메뉴 내 개별 액션 또는 선택 가능한 항목입니다.'}
                            {hoveredAnatomyPart === 'HeaderCell' && '테이블 컬럼명을 담는 헤더 셀입니다.'}
                            {hoveredAnatomyPart === 'Cell' && '실제 데이터가 렌더링되는 본문 셀입니다.'}
                            {hoveredAnatomyPart === 'SearchField' && '키워드 입력으로 목록을 필터링하는 검색 입력 영역입니다.'}
                            {hoveredAnatomyPart === 'SectionGroup' && '관련 내비게이션 아이템을 묶는 메뉴 그룹입니다.'}
                            {hoveredAnatomyPart === 'NavItem' && '페이지 이동/현재 위치 표시를 담당하는 내비게이션 항목입니다.'}
                            {hoveredAnatomyPart === 'FooterAction' && '테마/설정 등 보조 동작을 수행하는 하단 액션 영역입니다.'}
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
                            <ColorSwatch
                                colorValue={colorTokenData[hoveredColorToken].hsl}
                                fallbackColor={colorTokenData[hoveredColorToken].hex}
                                size="xl"
                                className="bg-white border-white/10"
                            />
                            {/* Info Text Column */}
                            <div className="flex flex-col min-w-0 text-left">
                                {/* Line 1: Usage Description - Use customColorName if provided */}
                                <div className="text-xs font-medium text-white leading-tight">
                                    {customColorName || colorTokenData[hoveredColorToken].usage}
                                </div>
                                {/* Line 2: Description (Added) */}
                                {colorTokenData[hoveredColorToken].description && (
                                    <div className="text-[10px] text-neutral-400 leading-tight mt-0.5">
                                        {colorTokenData[hoveredColorToken].description}
                                    </div>
                                )}
                                {/* Line 3: Token & Values */}
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
