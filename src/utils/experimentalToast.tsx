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

    const toastId = toast.custom(
        (t) => (
            <div className= "bg-background border border-border rounded-lg shadow-lg p-4 w-[360px] flex flex-col gap-3" >
            <div className="font-semibold text-foreground" > 실험적 스타일 적용됨 </div>
    < div className = "text-sm text-muted-foreground" > { changeDescription } </div>
    < div className = "flex gap-2 pt-1" >
    <button
            onClick={() => {
    console.log("User feedback: Like");
    toast.success("피드백 감사합니다!", { duration: 2000 });
    toast.dismiss(t);
}}
className = "flex-1 px-3 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
    >
    좋아요
    </button>
    < button
onClick = {() => {
    console.log("User feedback: Dislike");
    toast("피드백 감사합니다. 참고하겠습니다.", { duration: 2000 });
    toast.dismiss(t);
}}
className = "flex-1 px-3 py-2 text-sm font-medium bg-muted text-muted-foreground rounded-md hover:bg-accent transition-colors"
    >
    별로예요
    </button>
    </div>
    </div>
    ),
{
    duration: Infinity,
    }
  );

return toastId;
};
