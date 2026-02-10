# 구현 계획서 - 파티클 백그라운드 모션 개선 (Particle Background Motion Enhancement)

사용자가 제공한 React Native 기반의 파티클 인터랙션 코드를 참조하여, 현재 리액트 웹(Vite) 프로젝트에 맞는 **3D 파티클 백그라운드 시스템**을 구현합니다.
2025년 트렌드 컬러를 적용하고, 로그인 입력 폼의 포커스 상태에 따라 파티클이 아이콘(사람, 자물쇠)으로 변형되는 인터랙티브한 시각 효과를 제공합니다.

## 1. 목표 (Goals)
- **React Native 코드를 웹 표준(R3F)으로 이식**: `expo-gl` 의존성을 제거하고 `react-three-fiber`를 사용하여 웹 브라우저에서 동일한 효과 구현.
- **고품질 시각 효과**: GLSL 셰이더를 활용하여 부드러운 입자 움직임과 '젤리피시 할로' 효과, 아이콘 모핑(Morphing) 구현.
- **인터랙티브 경험**: 마우스 움직임과 입력 필드 포커스(ID/PW)에 반응하는 동적인 배경 제작.
- **최신 디자인 트렌드 적용**: 2025 트렌드 컬러(Mocha Mousse, Soft Lavender 등) 활용.

## 2. 기술 스택 (Tech Stack)
- **Three.js**: 3D 그래픽 렌더링 코어.
- **React Three Fiber (R3F)**: 리액트 컴포넌트 스타일로 Three.js를 다루기 위한 라이브러리.
- **React Three Drei**: R3F용 유틸리티 모음 (카메라, 컨트롤 등).
- **GLSL (OpenGL Shading Language)**: 파티클의 위치와 색상을 계산하는 셰이더 프로그래밍.

## 3. 구현 단계 (Implementation Steps)

### 단계 1: 의존성 설치 (Dependencies)
프로젝트에 3D 관련 라이브러리를 추가합니다.
```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

### 단계 2: 파티클 컴포넌트 구현 (`src/components/ui/ParticleBackground.tsx`)
제공된 코드의 로직을 웹 환경에 맞게 재구성합니다.

1.  **셰이더 포팅 (Shader Porting)**:
    -   `vertexShader`: 제공된 GLSL 코드 사용 (`attribute`, `position` 처리 방식은 Three.js BufferGeometry에 맞게 조정).
    -   `fragmentShader`: 제공된 2025 트렌드 컬러 팔레트 및 로직 사용.

2.  **데이터 생성 (Geometry Data)**:
    -   `THREE.BufferGeometry` 사용.
    -   `createPersonIcon`, `createLockIcon` 함수 로직을 `useMemo`로 최적화하여 구현.
    -   `aOffset`, `aIconTarget` 등 커스텀 속성(Attribute) 주입.

3.  **애니메이션 루프 (Animation Loop)**:
    -   `useFrame` 훅을 사용하여 매 프레임마다 `uTime`, `uMouse`, `uFormationIntensity` 등의 `uniform` 변수 업데이트.
    -   마우스 좌표 정규화 (-1.0 ~ 1.0) 처리.

### 단계 3: 로그인 페이지 통합 (`src/components/LoginPage.tsx`)
기존 로그인 페이지에 파티클 배경을 적용하고, 입력 필드 상태를 연동합니다.

1.  **배경 교체**: 기존 배경(또는 `AntiGravityBackground`) 대신 `ParticleBackground` 컴포넌트 배치.
2.  **상태 연동**:
    -   `div` 또는 `Canvas` 래퍼에 `z-index: -1`을 주어 배경으로 배치.
    -   로그인 폼(`Input`)의 `onFocus` / `onBlur` 이벤트를 통해 `particleMode` 상태 관리 (`'none'`, `'id'`, `'password'`).
    -   해당 상태를 `ParticleBackground` 컴포넌트의 props로 전달하여 셰이더의 `uIconMode` 및 `uFormationIntensity` 제어.

## 4. 커스텀 셰이더 로직 상세 (Shader Logic Details)

- **Vertex Shader**:
    -   기본적으로 파티클은 그리드 형태로 부유.
    -   `uFormationIntensity`가 1에 가까워지면 `aIconTarget`(아이콘 형상 위치)으로 `mix`되어 이동.
    -   마우스 근처에서 밀려나는(Repulsion) '젤리피시 할로' 효과 유지.
- **Fragment Shader**:
    -   `uIconMode`에 따라 색상 테마 변경 (Person: Lavender/Rose, Lock: Blue/Green).
    -   배경색은 `Peachy Cream` (#F5E6D3)으로 설정 (CSS 또는 셰이더 배경).

## 5. 예상 파일 구조
```
src/
  components/
    ui/
      ParticleBackground.tsx  (New: R3F 기반 파티클 컴포넌트)
    LoginPage.tsx             (Update: 배경 연동 및 상태 관리)
```

## 6. 검증 계획 (Verification Plan)
1.  **설치 확인**: 라이브러리 설치 후 빌드 에러 없는지 확인.
2.  **렌더링 확인**: 로그인 페이지 진입 시 파티클들이 정상적으로 렌더링되고 움직이는지 확인.
3.  **인터랙션 확인**: 
    -   마우스 이동 시 파티클들이 반응하는지.
    -   '아이디' 입력창 포커스 시 파티클들이 사람 모양으로 모이는지.
    -   '비밀번호' 입력창 포커스 시 파티클들이 자물쇠 모양으로 모이는지.
4.  **반응형 확인**: 브라우저 리사이즈 시 캔버스 크기가 적절히 조절되는지.
