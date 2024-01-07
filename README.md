# Youtube 클론 프로젝트

> React 와 Youtube API 를 이용한 유튜브 클론 프로젝트

## 사용 주요 라이브러리

- React v18
- React Query v5
- Typescript
  - jsx 를 사용 중이며, utils와 같은 모듈 js 파일에만 ts로 되어 있음.
- Styled Component
- React Icons

## 프로젝트 실행하기

프로젝트 실행에 필요한 라이브러리 설치

```bash
$ npm install
```

Youtube API Key 추가  
Project Root 에 .env 파일 생성 후 아래와 같이 `VITE_YOUTUBE_API_KEY` 키에 값 입력

```.env
VITE_YOUTUBE_API_KEY=키
```

프로젝트 실행

```bash
$ npm run dev
```

## .env 파일 환경 변수 정보

- VITE_TEST_MODE : API 테스트 모드 (기본값 true)
  - true : public/data 안의 json 파일 호출
  - false : 실제 Youtube Api 호출
- VITE_YOUTUBE_API_KEY : Youtube Access Key
  - GCP 에서 발급

## 진행 상황

[x] Youtube API 키 발급
[ ] 메인 페이지 Chips - Width 에 따른 화살표 생성
[x] infinite scroll - `IntersectionObserver` 사용
[X] 로딩 스켈레톤 만들기
[ ] 에러 페이지 만들기

## 관련 참고 문서

- IntersectionObserver 사용 방법 - [링크](https://tech.kakaoenterprise.com/149)
- useInfiniteQuery 사용 예시 - [링크](https://www.typescriptlang.org/play?target=6&ssl=51&ssc=34&pln=51&pc=57#code/JYWwDg9gTgLgBDAnmApnA3nAqgZxQSQDsAzYQ4GFARQFcUpEB5MGYCQnAGjlvsQGkUiOAF84xKBBBwA5AAEYAQw5KAxgGsA9FBSLVMALQBHOgxkBuALAAoUJFgY4NPEVLlKvBqPGTp8pSp6Wjp6hiZ8FjZ20PCKAB5sOD5SsvGJkdY2KHH28GSUUMR6aAAKigDmZIoepogAPAAqAHwYNnBwOjg0ADYwOABccA0A2gC6VtbtqhA0hDCDhDQgAEb0E+2E2fNwODBQZOVwAD5wi93d63BgOgBubM6Du-uEhydnFzYiNjZIqHCCiDKUEUICSAF5WpM4MN1EJHnsDqNBspEBMRBNsrk4NMVHAACIAUQAYgBBLAAGQaAH1yfgALL4BpwCEARgADBMsjkYuJZvo2IQ4OUUDBPAIhI04FsUIQACZJAFAkE4JoAClhiHhz3K3DAimBoIA-IMGgBKSHtHQwGhQQUwoTcAB0ztVeoNSUN0LdytGcEGY1N40+32smJ5ON22O6wBl8AhaQgOEdqhClFV6DacGWijwWAASuTBjIWQAmADsjrZlcdLP6AA42Y2ZJxPqbOZlQ9yHPl6EVVGhcPQLXBgLKFktVlBLqQoLsqYQQSgtQdLt0czB54vly9Ls56AuQEudgid5mUCBFMButvypc9TgcAB3aCy43H7WXZbAwiqAAWN8uSRuiPGRFFlEAyGAJ5qmgGRjlkPcoAydowF-dgUDfJ4V0zRQbmqfU3xRS5QmAG4MPHFY1mDDtflKfVlWZRw9WFJUQAoydRAmWi4DzFAcEgDg0AhTBEIGbA8CgMZOJDHNEB-Xkf1YdghRFQdZ3TK4KhQVjREGVicFNPTfCglA6l4-j2DwFoMyhCN4E6AS8EYxRH0veBVGjWN00zdobWvOAAAMcEQXZz00UTDWYlAwQAEnQKLWJEAKWyhdpDxgNCx1kABxAkGmbTMRDbTMrRtQUHMslBHVlfC0RDMMHGIPklMFPc1JwVUcVIcpBkHVxIJqPhmBanAzL4xyUG4WZ1EICBH0Ibg1O4cyJu4EkoGBeosJeeDFXo0Emm4RZKKgJpzRsqZLPgcIGABRjhVFWoAVVGRRJkYqoVK20nBcEgBuoWpvNSuBnWTdhupS9p2hu8VEEhqGYaJQhBge9r4faAbgEUboyhY-bBhZdGVJgAA5LZce0-G4FVNddgp7hsZxrSDOZayfKhuy4BAaBKeFHACQSSMIVpmAKcNR0IsdYCXgy5kwVZDl2Yx4hqYAQm5nQKf5wWYHNL7WrlFA3BQWVLihjoRTKuBGa1qWZXKWWAGo4BZM3RCJvBgP0QZVRqpRzTBFogfN9pQb9xQiZQ5nBnDx0oqTYg1xgOlFDAVVXS0gOWiiiWJIMomivhoq0SAA)
- Youtube Api
  - https://developers.google.com/youtube/v3/docs/
  - [search.list](https://developers.google.com/youtube/v3/docs/search/list?hl=ko&apix_params=%7B%22part%22%3A%5B%22snippet%22%5D%2C%22maxResults%22%3A10%7D#apps-script)
