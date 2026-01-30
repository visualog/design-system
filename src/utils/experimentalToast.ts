import { toast } from 'sonner';

export const showExperimentalToast = (currentPath: string) => {
    let changeDescription = "전역: 기본 폰트 크기가 15px로 축소되었습니다.";

    if (currentPath.includes("/typography")) {
        changeDescription = "타이포그래피: H3 스타일이 컴팩트하게 변경되고, 본문 폰트 크기가 줄어들었습니다.";
    } else if (currentPath.includes("/colors")) {
        changeDescription = "컬러: 텍스트와 배경의 대비가 향상되었습니다.";
    } else if (currentPath.includes("/spacing")) {
        changeDescription = "스페이싱: 수직 리듬과 컴포넌트 간격이 조정되었습니다.";
    }

    const toastId = toast("실험적 스타일 적용됨", {
        description: changeDescription,
        duration: Infinity, // 피드백 받을 때까지 닫히지 않음
        action: {
            label: "좋아요",
            onClick: () => {
                console.log("User feedback: Like");
                toast.success("피드백 감사합니다!", { duration: 2000 });
                toast.dismiss(toastId);
            }
        },
        cancel: {
            label: "별로예요",
            onClick: () => {
                console.log("User feedback: Dislike");
                toast("피드백 감사합니다. 참고하겠습니다.", { duration: 2000 });
                toast.dismiss(toastId);
            }
        },
    });
};
