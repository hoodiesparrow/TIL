# LCP, Largest Contentful Paint

> 로딩, **2.5초**

배경

- [DOMContentLoaded](https://developer.mozilla.org/docs/Web/Events/DOMContentLoaded),  [First Contentful Paint (FCP)](https://web.dev/articles/fcp), [First Meaningful Paint (FMP)](https://developer.chrome.com/docs/lighthouse/performance/first-meaningful-paint), [Speed Index (SI)](https://developer.chrome.com/docs/lighthouse/performance/speed-index) 같은 예전 지표들은 유저가 인지하는 페이지 로딩 속도 측정에 그리 좋지 않았음

의미

- 유저가 탐색을 시작한 때부터 뷰포트 안의 가장 큰 이미지 또는 텍스트 블록이 렌더링 될 때까지의 시간을 뜻함
  - 아래 또한 포함
    - 이전 페이지에서의 unload time
    - connection setup time
    - Time To First Byte (TTFB)
      - 요청한 시간부터 응답의 첫 바이트가 도착한 시간의 차이: [리디렉션, DNS 룩업, 연결 및 TLS 협상, 요청-응답의 첫 바이트] 까지 걸린 시간의 합
      - SPA의 경우에는 TTFB가 중요할 수 있으나 서버사이드 렌더링되는 사이트는 TTFB가 더 높더라도 더 좋은 LCP를 가질 수 있음
        - SPA는 처음 fetch된 마크업에서 자바스크립트가 실행되어야 실제 사이트의 내용이 그려지기 때문
- 기준이 되는 요소: `<img>`, `<image> inside <svg>`, `<video>`, 텍스트 또는 인라인 요소를 자식으로 가지는 블록 요소
- 로딩되지 않은 이미지, [font block period](https://developer.mozilla.org/docs/Web/CSS/@font-face/font-display#The_font_display_timeline) 인 (웹 폰트를 사용한) 텍스트 노드 등은 렌더링 되었다고 간주하지 않음
- 성능상 요소의 첫 크기와 위치만을 고려함
  - 뷰포트 밖에서 렌더링되고 이후에 안으로 옮겨진 요소를 고려하지 않음

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e59cc94d-20d9-4551-947a-99fbc9e8db3a/4b6556ab-61f4-476c-9516-6ddb4919e570/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e59cc94d-20d9-4551-947a-99fbc9e8db3a/b9421674-f841-46ca-8bff-737db28726ea/Untitled.png)

# 