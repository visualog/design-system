import React from 'react';
import GuidelineItem from './ui/GuidelineItem';


const ColorUsage: React.FC = () => {
    return (
        <div className="flex flex-col gap-12">
            <section className="flex flex-col gap-6">
                <h3 className="text-xl font-bold">접근성 (Accessibility)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    <GuidelineItem
                        type="do"
                        title="텍스트 대비 준수"
                        description="배경색과 텍스트 색상 간의 명도 대비를 4.5:1 이상(WCAG AA 기준)으로 유지하여 가독성을 보장하세요."
                    >
                        <div className="flex flex-col gap-4 w-full px-8">
                            {/* Example using explicit high contrast colors */}
                            <div className="bg-blue-600 p-4 rounded-md text-white text-center font-medium">
                                가독성이 좋은 텍스트
                            </div>
                            <div className="bg-gray-100 p-4 rounded-md text-gray-900 text-center font-medium">
                                명확한 대비
                            </div>
                        </div>
                    </GuidelineItem>
                    <GuidelineItem
                        type="dont"
                        title="낮은 대비 금지"
                        description="약한 대비는 저시력 사용자가 콘텐츠를 인식하기 어렵게 만듭니다. 밝은 배경에 밝은 텍스트를 사용하지 마세요."
                    >
                        <div className="flex flex-col gap-4 w-full px-8">
                            <div className="bg-yellow-100 p-4 rounded-md text-yellow-300 text-center font-medium">
                                읽기 어려운 텍스트
                            </div>
                            <div className="bg-gray-100 p-4 rounded-md text-gray-300 text-center font-medium">
                                부족한 대비
                            </div>
                        </div>
                    </GuidelineItem>
                </div>
            </section>

            <section className="flex flex-col gap-6">
                <h3 className="text-xl font-bold">의미 전달 (Semantics)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    <GuidelineItem
                        type="do"
                        title="상태 색상의 적절한 사용"
                        description="오류(Error), 성공(Success), 경고(Warning) 색상은 해당 상태를 전달하는 데에만 제한적으로 사용하세요."
                    >
                        <div className="flex gap-4 justify-center items-center">
                            {/* Explicit Error Button Style */}
                            <button className="px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors">
                                삭제하기
                            </button>
                            {/* Explicit Success Text Style */}
                            <div className="text-green-600 font-medium">저장 완료</div>
                        </div>
                    </GuidelineItem>
                    <GuidelineItem
                        type="dont"
                        title="장식용으로 의미 색상 사용 금지"
                        description="단순히 '빨간색이 예뻐서' 혹은 '눈에 띄게 하려고' 오류 색상을 버튼이나 배경에 사용하지 마세요."
                    >
                        <div className="flex gap-4 justify-center items-center">
                            {/* Misuse of Error Color example */}
                            <button className="px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition-colors">
                                가입하기
                            </button>
                        </div>
                    </GuidelineItem>
                </div>
            </section>

            <section className="flex flex-col gap-6">
                <h3 className="text-xl font-bold">브랜드 색상 (Brand Colors)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    <GuidelineItem
                        type="do"
                        title="주요 액션 강조"
                        description="브랜드 색상은 페이지의 가장 중요한 액션(Primary Action)이나 활성 상태를 강조할 때 사용하세요."
                    >
                        <div className="flex flex-col gap-4 w-full max-w-xs items-center">
                            {/* Explicit Brand Button Style */}
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors">
                                시작하기
                            </button>
                            <div className="w-full bg-blue-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-blue-600 w-2/3 h-full" />
                            </div>
                        </div>
                    </GuidelineItem>
                    <GuidelineItem
                        type="dont"
                        title="과도한 사용 지양"
                        description="브랜드 색상을 남발하면 시각적 피로도를 높이고 중요도가 희석됩니다. 배경 전체에 사용하거나 모든 버튼에 적용하지 마세요."
                    >
                        <div className="w-full h-full bg-blue-50 flex items-center justify-center p-8 rounded-lg overflow-hidden border border-blue-100">
                            <div className="text-blue-600 font-bold text-center leading-relaxed">
                                모든 곳에<br />브랜드 컬러 사용
                            </div>
                        </div>
                    </GuidelineItem>
                </div>
            </section>
        </div>
    );
};

export default ColorUsage;
