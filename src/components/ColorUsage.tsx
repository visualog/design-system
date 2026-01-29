import React from 'react';
import { DoDont, DoDontContainer } from './ui/DoDont';


const ColorUsage: React.FC = () => {
    return (
        <div className="flex flex-col gap-12">
            <section className="flex flex-col gap-6">
                <h3 className="text-lg font-bold">접근성 (Accessibility)</h3>
                <DoDontContainer>
                    <DoDont
                        type="do"
                        title="텍스트 대비 준수"
                        description="배경색과 텍스트 색상 간의 명도 대비를 4.5:1 이상(WCAG AA 기준)으로 유지하여 가독성을 보장하세요."
                    >
                        <div className="flex flex-col gap-4 w-full p-4">
                            {/* Example using explicit high contrast colors */}
                            <div className="bg-blue-600 p-3 rounded-md text-white text-center font-medium shadow-sm">
                                가독성이 좋은 텍스트
                            </div>
                            <div className="bg-gray-100 p-3 rounded-md text-gray-900 text-center font-medium border">
                                명확한 대비
                            </div>
                        </div>
                    </DoDont>
                    <DoDont
                        type="dont"
                        title="낮은 대비 금지"
                        description="약한 대비는 저시력 사용자가 콘텐츠를 인식하기 어렵게 만듭니다. 밝은 배경에 밝은 텍스트를 사용하지 마세요."
                    >
                        <div className="flex flex-col gap-4 w-full p-4">
                            <div className="bg-yellow-100 p-3 rounded-md text-yellow-300 text-center font-medium border border-yellow-200">
                                읽기 어려운 텍스트
                            </div>
                            <div className="bg-gray-100 p-3 rounded-md text-gray-300 text-center font-medium border">
                                부족한 대비
                            </div>
                        </div>
                    </DoDont>
                </DoDontContainer>
            </section>

            <section className="flex flex-col gap-6">
                <h3 className="text-lg font-bold">의미 전달 (Semantics)</h3>
                <DoDontContainer>
                    <DoDont
                        type="do"
                        title="상태 색상의 적절한 사용"
                        description="오류(Error), 성공(Success), 경고(Warning) 색상은 해당 상태를 전달하는 데에만 제한적으로 사용하세요."
                    >
                        <div className="flex flex-col gap-4 w-full p-6 items-center justify-center">
                            <div className="flex gap-4 items-center">
                                {/* Explicit Error Button Style */}
                                <button className="px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors shadow-sm">
                                    삭제하기
                                </button>
                                {/* Explicit Success Text Style */}
                                <div className="text-green-600 font-bold flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-green-600"></span>
                                    저장 완료
                                </div>
                            </div>
                        </div>
                    </DoDont>
                    <DoDont
                        type="dont"
                        title="장식용으로 의미 색상 사용 금지"
                        description="단순히 '빨간색이 예뻐서' 혹은 '눈에 띄게 하려고' 오류 색상을 버튼이나 배경에 사용하지 마세요."
                    >
                        <div className="flex flex-col gap-4 w-full p-6 items-center justify-center">
                            {/* Misuse of Error Color example */}
                            <button className="px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition-colors shadow-sm">
                                가입하기
                            </button>
                        </div>
                    </DoDont>
                </DoDontContainer>
            </section>

            <section className="flex flex-col gap-6">
                <h3 className="text-lg font-bold">브랜드 색상 (Brand Colors)</h3>
                <DoDontContainer>
                    <DoDont
                        type="do"
                        title="주요 액션 강조"
                        description="브랜드 색상은 페이지의 가장 중요한 액션(Primary Action)이나 활성 상태를 강조할 때 사용하세요."
                    >
                        <div className="flex flex-col gap-4 w-full p-6 items-center justify-center">
                            {/* Explicit Brand Button Style */}
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors shadow-sm">
                                시작하기
                            </button>
                            <div className="w-48 bg-blue-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-blue-600 w-2/3 h-full" />
                            </div>
                        </div>
                    </DoDont>
                    <DoDont
                        type="dont"
                        title="과도한 사용 지양"
                        description="브랜드 색상을 남발하면 시각적 피로도를 높이고 중요도가 희석됩니다. 배경 전체에 사용하거나 모든 버튼에 적용하지 마세요."
                    >
                        <div className="flex flex-col gap-4 w-full h-full min-h-[140px] bg-blue-50 items-center justify-center p-6 border border-blue-100">
                            <div className="text-blue-600 font-bold text-center leading-relaxed">
                                모든 곳에<br />브랜드 컬러 사용
                            </div>
                        </div>
                    </DoDont>
                </DoDontContainer>
            </section>
        </div>
    );
};

export default ColorUsage;
