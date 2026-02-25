# PR Draft: ESLint Scope Normalization

## 제목

`chore(lint): exclude backup sources from active lint scope`

## 배경

현재 lint가 `bak/` 폴더까지 검사해 운영 코드와 무관한 오류가 대량 발생함.

## 변경안

- `eslint.config.js`의 `globalIgnores`에 `bak` 추가

## 기대효과

- lint 결과에서 비운영 코드 노이즈 제거
- 실제 유지보수 대상에 대한 품질 신호 강화

## 검증

- `npm run lint`
- `npm run build`
