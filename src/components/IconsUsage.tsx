import React from 'react';
import { DoDont, DoDontContainer } from './ui/DoDont';
import { Home, Search } from 'lucide-react';

const IconsUsage: React.FC = () => {
    return (
        <div className="flex flex-col gap-12">
            <section className="flex flex-col gap-6">
                <h3 className="text-lg font-bold">사이즈 규칙 (Size Rules)</h3>
                <DoDontContainer>
                    <DoDont
                        type="do"
                        title="표준 사이즈 준수"
                        description="아이콘은 16px, 20px, 24px의 표준 사이즈를 사용합니다. 컨테이너 내부 여백을 고려하여 배치하세요."
                    >
                        <div className="flex gap-8 items-end justify-center py-4">
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-1 border border-dashed rounded bg-gray-50">
                                    <Home size={16} />
                                </div>
                                <span className="text-xs font-mono text-muted-foreground">16px (Small)</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-1 border border-dashed rounded bg-gray-50">
                                    <Home size={20} />
                                </div>
                                <span className="text-xs font-mono text-muted-foreground">20px (Medium)</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-1 border border-dashed rounded bg-gray-50">
                                    <Home size={24} />
                                </div>
                                <span className="text-xs font-mono text-muted-foreground">24px (Large)</span>
                            </div>
                        </div>
                    </DoDont>
                    <DoDont
                        type="dont"
                        title="임의의 사이즈 변형 금지"
                        description="17px, 22px 등 정해지지 않은 픽셀 단위로 크기를 조정하면 렌더링이 흐릿해질 수 있습니다."
                    >
                        <div className="flex gap-8 items-end justify-center py-4">
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-1 border border-dashed border-red-200 rounded bg-red-50">
                                    <Home size={19} className="text-red-500" />
                                </div>
                                <span className="text-xs font-mono text-muted-foreground">19px (X)</span>
                            </div>
                        </div>
                    </DoDont>
                </DoDontContainer>
            </section>

            <section className="flex flex-col gap-6">
                <h3 className="text-lg font-bold">터치 타겟 (Touch Target)</h3>
                <DoDontContainer>
                    <DoDont
                        type="do"
                        title="충분한 여백 확보"
                        description="모바일 환경에서 아이콘 버튼은 최소 44x44px의 터치 영역을 확보해야 합니다. 아이콘은 작더라도 클릭 영역은 넓히세요."
                    >
                        <div className="flex justify-center py-4">
                            <button className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-colors">
                                <Search size={20} />
                            </button>
                        </div>
                    </DoDont>
                    <DoDont
                        type="dont"
                        title="타겟 영역 축소"
                        description="아이콘 크기에 딱 맞춰 버튼 크기를 설정하면 사용자가 정확히 누르기 어렵습니다."
                    >
                        <div className="flex justify-center py-4 items-center h-11">
                            <button className="p-px border border-red-200 bg-red-50 text-red-500">
                                <Search size={20} />
                            </button>
                        </div>
                    </DoDont>
                </DoDontContainer>
            </section>
        </div>
    );
};

export default IconsUsage;
