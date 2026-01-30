import React from 'react';
import { DoDont, DoDontContainer } from './ui/DoDont';

const SpacingUsage: React.FC = () => {
    return (
        <div className="flex flex-col gap-12">
            <section className="flex flex-col gap-6">
                <h3 className="text-lg font-bold">간격 원칙 (Spacing Principles)</h3>
                <DoDontContainer>
                    <DoDont
                        type="do"
                        title="4의 배수 사용"
                        description="모든 간격은 4의 배수로 정의된 시스템(0, 0.5, 1, 1.5, ... 10)을 사용하세요. 임의의 픽셀 값을 직접 입력하지 마세요."
                    >
                        <div className="flex gap-4 items-center justify-center p-8 bg-gray-50 border border-gray-100 rounded-md">
                            <div className="bg-primary/20 w-8 h-8 rounded text-xs flex items-center justify-center text-primary font-mono">32</div>
                            <div className="w-4 h-[1px] bg-primary"></div>
                            <div className="bg-primary/20 w-4 h-4 rounded text-xs flex items-center justify-center text-primary font-mono">16</div>
                        </div>
                    </DoDont>
                    <DoDont
                        type="dont"
                        title="임의의 값 사용 금지"
                        description="13px, 15px 등 4의 배수가 아닌 값을 사용하면 리듬감이 깨지고 유지보수가 어려워집니다."
                    >
                        <div className="flex gap-4 items-center justify-center p-8 bg-gray-50 border border-gray-100 rounded-md">
                            <div className="bg-red-100 w-8 h-8 rounded text-xs flex items-center justify-center text-red-500 font-mono">33?</div>
                            <div className="bg-red-100 w-3 h-3 rounded text-xs flex items-center justify-center text-red-500 font-mono">11?</div>
                        </div>
                    </DoDont>
                </DoDontContainer>
            </section>

            <section className="flex flex-col gap-6">
                <h3 className="text-lg font-bold">Gap vs Padding</h3>
                <DoDontContainer>
                    <DoDont
                        type="do"
                        title="컨테이너 내부 여백은 Padding"
                        description="요소의 내부 콘텐츠와 경계 사이의 공간은 Padding으로 처리합니다. (예: 카드 내부, 버튼 내부)"
                    >
                        <div className="p-8 bg-white border rounded-md shadow-sm h-full">
                            <div className="bg-blue-100 border-2 border-blue-400 p-4 rounded text-blue-800 text-center font-bold">
                                Padding
                                <div className="bg-white p-2 mt-2 text-sm font-normal">Content</div>
                            </div>
                        </div>
                    </DoDont>
                    <DoDont
                        type="do"
                        title="요소 간 간격은 Gap/Margin"
                        description="같은 레벨의 형제 요소들 사이의 간격은 Flex/Grid Gap 또는 Margin을 사용합니다."
                    >
                        <div className="p-8 bg-white border rounded-md shadow-sm flex gap-4 h-full">
                            <div className="bg-green-100 border-2 border-green-400 p-4 rounded text-green-800 flex-1 text-center flex items-center justify-center">Item A</div>
                            <div className="w-4 border-x border-dashed border-gray-400 flex items-center justify-center bg-gray-50 text-xs text-gray-500 shrink-0">Gap</div>
                            <div className="bg-green-100 border-2 border-green-400 p-4 rounded text-green-800 flex-1 text-center flex items-center justify-center">Item B</div>
                        </div>
                    </DoDont>
                </DoDontContainer>
            </section>
        </div>
    );
};

export default SpacingUsage;
