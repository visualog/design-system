import React from 'react';
import { DoDont, DoDontContainer } from './ui/DoDont';

const TypographyUsage: React.FC = () => {
    return (
        <div className="flex flex-col gap-12">
            <section className="flex flex-col gap-6">
                <h3 className="text-lg font-bold">계층 구조 (Hierarchy)</h3>
                <DoDontContainer>
                    <DoDont
                        type="do"
                        title="명확한 위계 설정"
                        description="페이지 제목은 H1, 섹션 제목은 H2, 하위 섹션은 H3를 사용하여 문서의 구조를 명확히 하세요."
                    >
                        <div className="flex flex-col gap-4 w-full p-6 items-start justify-center">
                            <h1 className="text-2xl font-bold">페이지 제목 (H1)</h1>
                            <h2 className="text-xl font-bold text-muted-foreground">섹션 제목 (H2)</h2>
                            <p className="text-base text-muted-foreground">본문 텍스트가 여기에 위치합니다.</p>
                        </div>
                    </DoDont>
                    <DoDont
                        type="dont"
                        title="위계 건너뛰기 금지"
                        description="단지 크기가 마음에 든다는 이유로 H1 다음에 바로 H4를 사용하지 마세요. 논리적인 순서를 지키세요."
                    >
                        <div className="flex flex-col gap-4 w-full p-6 items-start justify-center">
                            <h1 className="text-2xl font-bold">페이지 제목 (H1)</h1>
                            <h4 className="text-sm font-bold text-muted-foreground">갑자기 작아진 제목 (H4)</h4>
                        </div>
                    </DoDont>
                </DoDontContainer>
            </section>

            <section className="flex flex-col gap-6">
                <h3 className="text-lg font-bold">가독성 (Readability)</h3>
                <DoDontContainer>
                    <DoDont
                        type="do"
                        title="왼쪽 정렬 권장"
                        description="한글과 영문 텍스트는 왼쪽 정렬일 때 가장 읽기 쉽습니다. 긴 본문을 가운데 정렬하지 마세요."
                    >
                        <div className="w-full p-6 text-left flex items-center">
                            <p className="text-sm leading-relaxed">
                                텍스트가 왼쪽으로 정렬되어 있을 때 사용자는 줄을 바꿀 때마다<br />
                                시선을 자연스럽게 왼쪽 끝으로 이동시킬 수 있어<br />
                                독서 피로도가 줄어듭니다.
                            </p>
                        </div>
                    </DoDont>
                    <DoDont
                        type="dont"
                        title="과도한 가운데 정렬"
                        description="3줄 이상의 긴 텍스트를 가운데 정렬하면 각 줄의 시작점이 달라져 읽기 어렵습니다."
                    >
                        <div className="w-full p-6 text-center flex items-center justify-center">
                            <p className="text-sm leading-relaxed">
                                텍스트를 가운데 정렬하면<br />
                                줄이 바뀔 때마다 시작점을 다시 찾아야 해서<br />
                                긴 글을 읽을 때 매우 불편합니다.
                            </p>
                        </div>
                    </DoDont>
                </DoDontContainer>
            </section>
        </div>
    );
};

export default TypographyUsage;
