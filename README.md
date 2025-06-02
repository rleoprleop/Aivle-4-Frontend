# 📚 Aivle 4차 미니프로젝트 프론트엔드
React 기반 도서 리뷰 웹 애플리케이션  

---

## ✨ 주요 기능

- 📚 **도서 CRUD**  
  - 도서 생성 / 조회 / 수정 / 삭제  
  - OpenAI API를 사용한 표지 이미지 자동 생성 및 등록  
- 🔍 **키워드 기반 도서 검색 & 페이지네이션**  
  - 키워드 입력으로 도서 검색  
  - 페이지별 목록 조회 및 이동  
- 💬 **댓글 CRUD**  
  - 도서별 댓글 작성 / 조회 / 수정 / 삭제  

---

## 🛠 기술 스택

- **Frontend**  
  - React  
  - Vite  
  - Material-UI (MUI)  
  - Axios (API 통신)  
  - React Router  
  - OpenAI API 호출  
- **스타일링**  
  - CSS & MUI 컴포넌트  

---

## 📂 폴더 구조

```
src/
├── api/          # API 통신 관련 모듈
├── assets/       # 정적 자원
├── components/   # 재사용 가능한 컴포넌트
├── pages/        # 페이지 컴포넌트
├── theme/        # 테마 관련 파일
├── App.jsx       # 메인 애플리케이션 컴포넌트
└── main.jsx      # 애플리케이션 진입점
```
---

## ⚙️ 환경 변수

- `VITE_API_BASE_URL`: 백엔드 서버 주소  
- `VITE_OPENAI_API_KEY`: OpenAI API 키  

---
