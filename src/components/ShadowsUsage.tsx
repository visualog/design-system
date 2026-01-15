import React from 'react';
import GuidelineItem from './ui/GuidelineItem';

const ShadowsUsage: React.FC = () => {
    return (
        <div className="flex flex-col gap-12">
            <section className="flex flex-col gap-6">
                <h3 className="text-lg font-bold">엘리베이션 (Elevation)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    <GuidelineItem
                        type="do"
                        title="깊이감 표현"
                        description="그림자는 요소의 높이(z-index)를 시각적으로 표현합니다. 더 높은 요소일수록 그림자가 더 넓고 흐리게 퍼집니다."
                    >
                        <div className="relative h-40 flex items-center justify-center bg-gray-50 border rounded-md">
                            {/* Base */}
                            <div className="absolute w-32 h-32 bg-white border shadow-sm rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                                Base (Lv.1)
                            </div>
                            {/* Override */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:-translate-y-4 transition-transform duration-300">
                                <div className="w-24 h-24 bg-white border shadow-lg rounded-lg flex items-center justify-center text-xs font-bold text-primary">
                                    Overlay (Lv.3)
                                </div>
                            </div>
                        </div>
                    </GuidelineItem>
                    <GuidelineItem
                        type="dont"
                        title="평면적인 겹치기 금지"
                        description="겹쳐진 요소들 사이에 그림자가 없으면 전후 관계를 파악하기 어렵습니다."
                    >
                        <div className="relative h-40 flex items-center justify-center bg-gray-50 border rounded-md">
                            <div className="absolute w-32 h-32 bg-white border border-gray-300 rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                                Base
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="w-24 h-24 bg-white border border-gray-300 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500">
                                    Overlay?
                                </div>
                            </div>
                        </div>
                    </GuidelineItem>
                </div>
            </section>

            <section className="flex flex-col gap-6">
                <h3 className="text-lg font-bold">사용 사례 (Use Cases)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-card border rounded-lg p-6 flex flex-col gap-4 items-center">
                        <span className="font-bold text-sm">Low Elevation</span>
                        <div className="w-full h-12 bg-white border rounded shadow-sm flex items-center justify-center text-xs text-muted-foreground">
                            Button / Card
                        </div>
                        <p className="text-xs text-muted-foreground text-center">기본적인 컨테이너나 클릭 가능한 요소에 사용합니다.</p>
                    </div>
                    <div className="bg-card border rounded-lg p-6 flex flex-col gap-4 items-center">
                        <span className="font-bold text-sm">Medium Elevation</span>
                        <div className="w-full h-12 bg-white border rounded shadow-md flex items-center justify-center text-xs text-muted-foreground">
                            Dropdown / Popover
                        </div>
                        <p className="text-xs text-muted-foreground text-center">일시적으로 나타나는 메뉴나 툴팁에 사용합니다.</p>
                    </div>
                    <div className="bg-card border rounded-lg p-6 flex flex-col gap-4 items-center">
                        <span className="font-bold text-sm">High Elevation</span>
                        <div className="w-full h-12 bg-white border rounded shadow-xl flex items-center justify-center text-xs text-muted-foreground">
                            Modal / Dialog
                        </div>
                        <p className="text-xs text-muted-foreground text-center">가장 중요한 정보를 보여주거나 화면을 덮는 요소에 사용합니다.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ShadowsUsage;
