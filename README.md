# Youtube 클론 프로젝트

> React 와 Youtube API 를 이용한 유튜브 클론 프로젝트

## 사용 주요 라이브러리

- React v18
- React Query v5
- Typescript
  - jsx 를 사용 중이며, utils와 같은 모듈 js 파일에만 ts로 되어 있음.
- Styled Component
- React Icons
- Youtube Api

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

- [x] Youtube API 키 발급
- [x] 메인 페이지 Chips - Width 에 따른 화살표 생성
- [x] 메인 페이지 Chips - chip 클릭 시 해당 topic 으로 재 조회 (`감상한 동영상`은 어떻게 조회 가능한지 api 확인 필요.)
- [x] infinite scroll - `IntersectionObserver` 사용
- [x] 로딩 스켈레톤 만들기
- [x] Card 에 hover 시 비디오 재생
- [ ] 에러 페이지 만들기
- [x] 검색하면 results 페이지로 이동
- [x] Result 페이지 생성
- [x] Video 상세 페이지 - 비디오 및 비디오 상세 정보 표시
- [ ] Video 상세 페이지 - 우측 관련 목록 생성
- [x] Video 상세 페이지 - 댓글

## 개발 중 고민 사항

> [`useInfiniteQuery`에서 발생한 문제점 ]
> 개발하면서 수정사항을 저장하면 re-render 되는데 현재 데이터 page를 캐시되어 기억하고 있어 그만큼 재호출하게 되다보니 youtube api 호출이 많이 되어 쉽게 제한이 걸림. 또한 계속 남몰래 fetching 함.  
> 그리고, searchQuery 가 같은 경우 재 검색해도 queryKey 가 동일하기 떄문에 새롭게 검색을 안하고 캐시에 있는 데이터를 갖고 리랜더링하는 문제 발생.

- queryKey 가 리스트로 받게 되는데, 리스트 안의 데이터와 순서가 일치하는 경우 같은 키로 인식하고 업데이트 함. [[참조](https://tanstack.com/query/v4/docs/react/guides/query-keys#if-your-query-function-depends-on-a-variable-include-it-in-your-query-key)]
- unmount 될 때 해당 queryKey 를 사용하는 쿼리 캐시를 제거하도록 함. (useEffect)
- queryKey 가 고유해야 하므로, 현재 페이지 key 값(useLocation().key)을 queryKey 에 넣어줌. -> 검색어가 같더라도 submit 으로 새 페이지를 불렀기 때문에 페이지Key 값이 달라져서 다시 검색됨.
- 데이터가 변경되더라도 업데이트할 필요 없기 때문에, staleTime 이 기본적으로 0 인데 60분으로 변경하여 변경을 최대한 안하도록 함.

> [ IntersectionObserver 문제 ]  
> Base 페이지에서 새로고침하면 가끔씩 List가 생성되기 전 Target을 인식하여, 2번 API 가 호출되는 문제 발생.

- 내가 만든 useInfiniteScroll 코드가 문제임. 임시방편으로 `react-intersection-observer`를 사용하도록 바꿔 해결함.
- delay 를 주는 방법은 안되는지 확인 필요.

> [ IFrame Player API 문제 ]
>
> 1. 오류 발생 `Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('<URL>') does not match the recipient window's origin ('<URL>').`
> 2. `<div className="overlay" ref={videoRef} />`로 한 경우 mouseover, mouseout 이벤트가 제대로 감지되지 않음.
> 3. 보안 정책상 autoplay 옵션을 사용하려면 mute=1(음소거) 되어있어야 함. -> 즉, 음소거 되어 있지 않으면 자동 재생 불가능

- 오류가 발생한다고 youtube iframe 이 실행되지 않는 건 아니므로 일단 무시함. 구글링 해봤지만 딱히 방법을 찾지 못함.
- div 에 YT.Player를 설정한 경우, `div` 가 `iframe` 으로 변경되기 때문에 이벤트 감지가 제대로 되지 않음. 그렇다고, `Thumbnail`태그에 하면 YT.Player를 저장한 `player` 객체가 null 로 표시되어 제대로 되지 않음.
- 그래서, `iframe` 를 직접 만들고, src 에 playerVars 값들을 설정해서 해결하였다. (iframe 으로 한 경우 playerVars 값을 인식하지 못함.)
- 하지만, Youtube Iframe API 불러오는 속도가 너무 느리다. 방법이 필요하다. 그래서 검색 결과 목록(Result)페이지에만 먼저 적용시킴.

## 관련 참고 문서

- IntersectionObserver 사용 방법 - [링크](https://tech.kakaoenterprise.com/149)
- useInfiniteQuery 사용 예시 - [링크](https://www.typescriptlang.org/play?target=6&ssl=51&ssc=34&pln=51&pc=57#code/JYWwDg9gTgLgBDAnmApnA3nAqgZxQSQDsAzYQ4GFARQFcUpEB5MGYCQnAGjlvsQGkUiOAF84xKBBBwA5AAEYAQw5KAxgGsA9FBSLVMALQBHOgxkBuALAAoUJFgY4NPEVLlKvBqPGTp8pSp6Wjp6hiZ8FjZ20PCKAB5sOD5SsvGJkdY2KHH28GSUUMR6aAAKigDmZIoepogAPAAqAHwYNnBwOjg0ADYwOABccA0A2gC6VtbtqhA0hDCDhDQgAEb0E+2E2fNwODBQZOVwAD5wi93d63BgOgBubM6Du-uEhydnFzYiNjZIqHCCiDKUEUICSAF5WpM4MN1EJHnsDqNBspEBMRBNsrk4NMVHAACIAUQAYgBBLAAGQaAH1yfgALL4BpwCEARgADBMsjkYuJZvo2IQ4OUUDBPAIhI04FsUIQACZJAFAkE4JoAClhiHhz3K3DAimBoIA-IMGgBKSHtHQwGhQQUwoTcAB0ztVeoNSUN0LdytGcEGY1N40+32smJ5ON22O6wBl8AhaQgOEdqhClFV6DacGWijwWAASuTBjIWQAmADsjrZlcdLP6AA42Y2ZJxPqbOZlQ9yHPl6EVVGhcPQLXBgLKFktVlBLqQoLsqYQQSgtQdLt0czB54vly9Ls56AuQEudgid5mUCBFMButvypc9TgcAB3aCy43H7WXZbAwiqAAWN8uSRuiPGRFFlEAyGAJ5qmgGRjlkPcoAydowF-dgUDfJ4V0zRQbmqfU3xRS5QmAG4MPHFY1mDDtflKfVlWZRw9WFJUQAoydRAmWi4DzFAcEgDg0AhTBEIGbA8CgMZOJDHNEB-Xkf1YdghRFQdZ3TK4KhQVjREGVicFNPTfCglA6l4-j2DwFoMyhCN4E6AS8EYxRH0veBVGjWN00zdobWvOAAAMcEQXZz00UTDWYlAwQAEnQKLWJEAKWyhdpDxgNCx1kABxAkGmbTMRDbTMrRtQUHMslBHVlfC0RDMMHGIPklMFPc1JwVUcVIcpBkHVxIJqPhmBanAzL4xyUG4WZ1EICBH0Ibg1O4cyJu4EkoGBeosJeeDFXo0Emm4RZKKgJpzRsqZLPgcIGABRjhVFWoAVVGRRJkYqoVK20nBcEgBuoWpvNSuBnWTdhupS9p2hu8VEEhqGYaJQhBge9r4faAbgEUboyhY-bBhZdGVJgAA5LZce0-G4FVNddgp7hsZxrSDOZayfKhuy4BAaBKeFHACQSSMIVpmAKcNR0IsdYCXgy5kwVZDl2Yx4hqYAQm5nQKf5wWYHNL7WrlFA3BQWVLihjoRTKuBGa1qWZXKWWAGo4BZM3RCJvBgP0QZVRqpRzTBFogfN9pQb9xQiZQ5nBnDx0oqTYg1xgOlFDAVVXS0gOWiiiWJIMomivhoq0SAA)
- Youtube Api
  - https://developers.google.com/youtube/v3/docs/
  - [search.list](https://developers.google.com/youtube/v3/docs/search/list?hl=ko&apix_params=%7B%22part%22%3A%5B%22snippet%22%5D%2C%22maxResults%22%3A10%7D#apps-script)
- Youtube IFrame Player API - [링크](https://developers.google.com/youtube/iframe_api_reference?hl=ko#Getting_Started)
- ReactQuery (Tanstack) - [링크](https://tanstack.com/query/v4/docs/react/guides/infinite-queries)
  - ReactQuery 관련 설명 한글 블로그 - [링크](https://mycodings.fly.dev/blog/2023-09-24-react-query-paginated-query-and-infinite-query#1-%ED%8E%98%EC%9D%B4%EC%A7%80%EB%84%A4%EC%9D%B4%EC%85%98pagination-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)
