# minsangKwak.github.io

이 프로젝트는 React와 React Router, Firebase를 사용하여 구현된 블로그 사이트입니다. 디자인은 MDN 스타일을 참고하여 Tailwind CSS로 제작되었습니다. 지속적인 업데이트가 진행될 예정입니다.

사이트는 [GitHub Pages](https://minsangkwak.github.io/)에 호스팅됩니다.

## 프로젝트 개요

주요 기능에 따라 아래 기능으로 구성되었습니다:

-   **고정된 사이드바 메뉴**: 오른쪽에 고정된 네비게이션 메뉴로 쉽게 이동할 수 있습니다.
-   **메인 콘텐츠 영역**: 선택된 포스트 내용이 오른쪽에 표시됩니다.
-   **반응형 디자인**: 다양한 화면 크기에 적응하여 데스크탑과 모바일 기기에서 모두 좋은 사용자 경험을 제공합니다.
-   **Firebase 연동**: Firebase Firestore를 통해 블로그 포스트와 참고 자료 포스트 데이터를 관리합니다.

## 사용된 기술

-   **React** (v18.3.1): 재사용 가능한 컴포넌트와 상태 관리를 위해 사용했습니다.
-   **React Router** (v6.27.0): 화면 구분 및 페이지 간 이동을 위해 사용했습니다.
-   **Firebase** (v11.0.1): Firestore를 통해 데이터 관리 및 백엔드를 구축하였습니다.
-   **Three.js** (v0.170.0): 3D 그래픽 기능을 넣기 위해 사용했습니다.
-   **Tailwind CSS** (v3.4.14): 빠르고 유연한 반응형 디자인을 위해 사용했습니다.
-   **GitHub Pages**: 웹사이트 호스팅과 배포를 위해 사용했습니다.

## 프로젝트 구조

프로젝트 구조는 다음과 같습니다:

```plaintext
.
├── .github
│   └── workflows
│       └── static.yml           # GitHub Actions 워크플로우
├── build                        # 프로덕션 빌드 파일
├── node_modules                 # 의존성 모듈
├── public                       # 정적 파일
│   ├── 404.html                 # 404 페이지
│   └── index.html               # HTML 엔트리 파일
├── src                          # 소스 코드
│   ├── Components               # 공통 컴포넌트
│   │   ├── Category.js          # 카테고리 목록 관리 컴포넌트
│   │   ├── ConvexGeometry.js    # Three.js를 활용한 3D 그래픽 컴포넌트
│   │   ├── Header.js            # 상단 네비게이션 헤더
│   │   ├── Loader.js            # 로딩 화면 표시 컴포넌트
│   │   ├── LoginModal.js        # 로그인 모달 컴포넌트
│   │   ├── PostDetail.js        # 포스트 상세 정보 표시
│   │   ├── Skeleton.js          # 데이터 로딩 중 스켈레톤 UI
│   │   ├── Toast.js             # 토스트 메시지 컴포넌트
│   │   └── Wave.js              # 배경 애니메이션
│   ├── Pages                    # 페이지 컴포넌트
│   │   ├── PageBlog.js          # 블로그 포스트 목록 페이지
│   │   ├── PageCodePost.js      # 코드 참조 상세 페이지
│   │   ├── PageCreate.js        # 새 포스트 작성 페이지
│   │   ├── PageHome.js          # 메인 홈 화면
│   │   └── PageJoin.js          # 회원 가입 페이지
│   ├── data                     # JSON 데이터
│   │   ├── blogPosts.json       # 블로그 포스트 초기 데이터
│   │   └── codePosts.json       # 코드 참조 초기 데이터
│   ├── App.js                   # 애플리케이션 메인 컴포넌트
│   ├── firebaseConfig.js        # Firebase 설정 파일
│   ├── index.js                 # 애플리케이션 엔트리 파일
│   ├── style.css                # Tailwind CSS 커스터마이징 파일
│   └── uploadDataToFirestore.js # Firestore 데이터 업로드 스크립트
├── .gitignore                   # Git 관리에서 제외할 파일 목록
├── package.json                 # 프로젝트 메타 정보 및 의존성
└── README.md                    # 프로젝트 설명 문서

```

### 주요 파일 설명

-   **index.js**: 애플리케이션의 진입 파일로, ReactDOM을 통해 App.js 컴포넌트를 DOM에 렌더링하여 애플리케이션을 초기화합니다.
-   **App.js**: 전체 레이아웃과 라우팅을 담당하는 메인 컴포넌트입니다. Firebase Firestore에서 데이터를 가져와 화면에 표시합니다.
-   **firebaseConfig.js**: Firebase 설정 파일로, Firestore를 초기화하고 인증을 설정합니다.
-   **PageHome.js**: 블로그의 초기 페이지로, 사용자에게 블로그의 목적이나 간단한 소개 문구를 제공합니다.
-   **PageCodePost.js**: 포스트의 제목, 내용을 표시하며 코드 미리보기 기능을 제공하는 컴포넌트입니다. Blog와 References 탭에 따라 디자인이나 스타일이 다르게 적용됩니다.
-   **PageBlog.js**: Blog 탭에서 포스트 목록을 제공하며, 사용자가 목록에서 특정 포스트를 선택하면 해당 포스트의 상세 페이지로 이동할 수 있습니다.
-   **PostDetail.js**: 특정 포스트의 상세 정보를 보여주는 컴포넌트입니다. URL의 id 파라미터를 사용하여 해당 포스트의 내용을 Firestore에서 로드하고, 사용자가 메인 화면 또는 이전 페이지로 돌아갈 수 있는 링크를 제공합니다.
-   **style.css**: Tailwind CSS의 기본 스타일을 정의한 파일로, 애플리케이션의 전체적인 스타일을 관리하고 커스텀 설정을 추가합니다.
-   **ConvexGeometry.js**: Three.js를 사용하여 3D 그래픽을 렌더링하는 컴포넌트 파일입니다. 화면에 입체적인 그래픽 효과를 추가하여 시각적인 임팩트를 제공합니다.
-   **Toast.js**: 토스트 메시지를 표시하는 컴포넌트로, 사용자에게 짧은 알림 메시지를 전달하는 데 사용됩니다.
-   **LoginModal.js**: 로그인 모달을 구성하는 컴포넌트로, 사용자가 로그인 창을 열고 닫으며 로그인할 수 있는 기능을 제공합니다.
-   **Category.js**: 메인의 최신글 카테고리를 모아놓는 컴포넌트입니다. 링크를 누르면 해당 글로 이동하는 기능이 있습니다.
-   **Header.js**: 애플리케이션 상단의 헤더 컴포넌트로, 네비게이션 메뉴와 사이드바 토글 버튼을 포함합니다. 로고, 뒤로 가기, 홈, 이메일 문의 및 로그인 버튼을 통해 상단 메뉴를 구성하고 다양한 페이지로 쉽게 이동할 수 있도록 합니다.
-   **blogPosts.json / codePosts.json**: JSON 형식의 데이터 파일로, 현재 Firestore를 통해 데이터가 관리되고 있어 로컬 데이터 파일로 더 이상 사용되지 않습니다.

### 설치 및 실행 방법

1. **리포지토리 클론**:

    ```bash
    git clone https://github.com/minsangKwak/minsangKwak.github.io.git
    ```

2. **프로젝트 디렉토리로 이동**:

    ```bash
    cd minsangKwak.github.io
    ```

3. **의존성 설치**:

    ```bash
    npm install
    ```

4. **Firebase 설정**: Firebase 콘솔에서 프로젝트를 생성한 후, `firebaseConfig.js` 파일을 업데이트하여 Firebase 설정을 추가합니다.

5. **로컬 서버 시작**:

    ```bash
    npm start
    ```

6. **애플리케이션 확인**: 브라우저에서 http://localhost:3000으로 이동하여 애플리케이션을 확인합니다.

### 배포

-   이 프로젝트는 GitHub Pages에 배포할 수 있도록 설정되어 있습니다. 배포는 다음 단계를 통해 수행됩니다:

1. **프로덕션 빌드 생성**:

    ```bash
    npm run build
    ```

2. **GitHub Pages에 배포**:

    ```bash
    npm run deploy
    ```

### 데이터 업로드

Firestore에 데이터 업로드를 위해 다음과 같은 기능을 사용합니다:

-   **Firebase Firestore**: 블로그 포스트와 참고 자료 포스트를 Firestore 컬렉션으로 관리합니다.
