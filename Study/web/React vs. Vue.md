# React vs. Vue

> [다른 프레임워크와의 비교 — Vue.js (vuejs.org)](https://kr.vuejs.org/v2/guide/comparison.html#MobX)
>
> [[node.js\] React.js vs Vue.js, 자바스크립트 프레임워크 비교 | 가비아 라이브러리 (gabia.com)](https://library.gabia.com/contents/8284/)

리액트와 뷰를 모두 사용해보며 서로의 공통점과 차이점을 정리해 보았다.



## 공통점

리액트와 뷰 모두 Virtual DOM을 이용해 DOM을 조작한다. 가상 돔을 쓰는 이유는 HTML 파일이 변할 때마다 브라우저는 일련의 렌더링 과정을 거치게 되며, 이는 상당히 비효율적이므로 가상 돔에서 변화된 부분들을 모아서 실제 돔에 한번만 적용하여 불필요한 렌더링을 줄이기 위함이다.

또한 둘 모두 반응적이고 조합 가능한 컴포넌트를 통해 SPA를 구성할 수 있다. Router와 상태 관리 도구가 제공되며, 



## 차이점

JSX => 자유도, single file component => 편의성, 퍼포먼스(리액트는 별도의 최적화가 필요함), 생태계 크기, css(css in js), 레거시 코드에의 적용(jsx), 리더-팔로워 (hook => composition api)

