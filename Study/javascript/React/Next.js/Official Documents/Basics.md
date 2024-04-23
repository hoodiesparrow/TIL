# Create a Next.js App

### Setup

Node.js( > 10.13) is required.



### Create a Next.js App

`$ npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"`

`$ cd nextjs-blog`

`npm run dev`

- App runs on http://localhost:3000/



# Navigate Between Pages

### Create a New Page

Next.js 에서 페이지는 `pages` 디렉토리에서 export된 React 컴포넌트로 구성된다.

- HTML 또는 PHP로 웹사이트를 작성하는 것과 비슷하게, 파일명과 경로에 따라 라우팅된다.
  - `pages/index.js` => `/`
  - `pages/posts/first-post.js` => `/posts/first-post`
- React 컴포넌트의 이름은 상관없지만, 항상 `default`로 export 되야 한다.



### Link Component : Client-Side Navigation

`import Link from 'next/link'`

- 가져온 `Link` 컴포넌트로 `<a>`태그를 감싸면 client side navigation을 할 수 있다.
  - 바닐라 `<a>`태그도 당연히 동작하지만 SPA로 동작하지 않는다.




### Code splitting and prefetching

Next.js는 자동으로 code splitting이 적용되어 있다.

- Production build) 브라우저의 viewport에 `Link` 컴포넌트가 나타나면, 해당 링크의 코드를 prefetch한다. 이를 통해 신속한 페이지 전환을 가능케 했다.

추가적인 routing 관련 정보는 [Routing: Introduction | Next.js (nextjs.org)](https://nextjs.org/docs/routing/introduction)에서 찾아볼 수 있다.



# Assets, Metadata, and CSS

### Assets

이미지같은 정적 asset은 root위치의 `public` 디렉토리에서 관리할 수 있다. 

- [Basic Features: Static File Serving | Next.js (nextjs.org)](https://nextjs.org/docs/basic-features/static-file-serving)

- `robots.txt`, `favicon.ico` 등의 다양한 정적 파일도 포함된다.
- `public` 폴더 내부에 `pages` 폴더 내부에 있는 파일과 같은 이름을 가진 파일을 두면 에러가 난다.
- **빌드 타임**에 `public` 폴더에 들어있는 asset만 Next.js에서 사용할 수 있다. 따라서 file storage를 위해서는 AWS S3과 같은 서드파티 서비스의 사용을 권장한다. (런타임에 추가된 파일은 Next.js에서 접근할 수 없다.)



### Image Component and Image Optimization

`next/image`는 현대적인 웹 환경을 위한 `<img>` 태그이다.

- 외부 소스에서 온 이미지에도 적용되는 Automatic Image Optimization을 통해 리사이징, 최적화, WebP 포맷 활용 등이 가능하다.



### Using the Image Component

빌드 타임에 이미지를 최적화하지 않고, on-demand 방식으로 최적화한다. 또한 이미지들은 lazy-load 되는 것이 기본 설정이다.

- 또한 이미지들은 [Cumulative Layout Shift(누적 레이아웃 이동, CLS) (web.dev)](https://web.dev/cls/) 를 피하는 방식으로 렌더링된다.



### Metadata

```js
import Head from 'next/head'

...
	return (
    	<Head>
        	<title>First Post</title>
      	</Head>
        ...
    )
```

`Head` 태그로 `title`태그를 감싸 브라우저 탭의 타이틀을 바꿀 수 있다.

- [next/head | Next.js (nextjs.org)](https://nextjs.org/docs/api-reference/next/head) 
- [Advanced Features: Custom `Document` | Next.js (nextjs.org)](https://nextjs.org/docs/advanced-features/custom-document)



## Third-Party JavaScript

Third-Party JavaScript는 분석/광고/고객 지원 등 외부 출처의 스크립트를 말한다.



### Adding Third-Party JavaScript

```js
<Head>
  <title>First Post</title>
  <script src="https://connect.facebook.net/en_US/sdk.js" />
</Head>
```

Facebook SDK를 추가한 모습이다. 우선하여 실행되어야 하는 스크립트들은 보통 `<head>` 내부에 추가되어야 한다.

하지만 이런 방식으로 스크립트를 추가하는 것은 같은 페이지에서 fetch되는 코드들과 비교했을 때 언제 로드되어야 하는 지를 명시적으로 나타낼 수 없고, 특정 스크립트가 render-blocking하다면 페이지의 로딩을 늦출 수도 있다.



### Using the Script Component

```js
import Script from 'next/script'
...
    <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
	/>
```

`strategy` 속성은 서드파티 스크립트가 언제 로드되어야 하는지를 나타내며, `lazyOnload`는 브라우저 idle 시에 스크립트를 로드한다.

- [Basic Features: Handling Scripts | Next.js (nextjs.org)](https://nextjs.org/docs/basic-features/script)

`onLoad` 속성에는 해당 스크립트의 로딩이 끝난 후 즉시 실행될 자바스크립트 코드를 작성한다.



### CSS Styling

Next.js는 `styled-jsx`라는 CSS in JS 라이브러리가 내장되어 있는데, `styled-components` 또는 `emotion`과 같은 다른 CSS in JS 라이브러리 또한 사용할 수 있다.

```js
<style jsx>{`
	.container {
	min-height: 100vh;
  	…
`}</style>
```

라이브러리 사용법은 템플릿 리터럴 내부에 CSS를 작성하는 형식으로, 타 CSS in JS 라이브러리와 크게 다르지 않은 것 같다. 

- [vercel/styled-jsx: Full CSS support for JSX without compromises (github.com)](https://github.com/vercel/styled-jsx)



### Writing and Importing CSS

Next.js는 CSS와 Sass를 빌트인 지원하므로, `.css`와 `.scss` 파일을 import 할 수 있다. 또한 Tailwind CSS같은 유명한 CSS 라이브러리들도 지원된다.



### Layout Component

```js
// @components/layout.js

import styles from './layout.module.css'

export default function Layout({ children }) {
  return <div className={styles.container}>{children}</div>
}
```

```css
// @components/layout.module.css
    
.container {
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
}
```

CSS module을 이용해 React Component를 작성했다.

- [Basic Features: Built-in CSS Support | Next.js (nextjs.org)](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css)
- HTML 태그의 클래스명의 마지막에 unique한 값이 들어가므로 중복된 클래스명에 대해서 걱정할 필요는 없다.
- Next.js의 code splitting은 CSS 모듈에도 작동한다. 또한 **빌드 타임**에 번들에서 추출되어 `.css` 파일을 생성한 후 Next.js에 의해 자동으로 로드된다.



### Global Styles

전역 CSS 파일을 쓰기 위해서는 `pages/_app.js` 라는 컴포넌트를 생성해야 한다. 

```js
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

이 `App` 컴포넌트는 다른 페이지에도 공통적으로 적용되는 최상위 컴포넌트이며, state를 저장하거나 전역 CSS를 적용하는 등에 사용할 수 있다.



### Adding Global CSS

전역 CSS 파일은 경로와 이름이 정해져 있지는 않지만, `App` 컴포넌트에서만 import할 수 있다.

```js
import '../styles/global.css'
```

 

### Polishing Layout

다큐먼트에서 제공되는 코드를 이용해 `Index`와 `First-post` 페이지에서 사용할 `Layout` 컴포넌트를 다듬고, 두 페이지의 구성을 수정했다.

- ```js
  export default function Home() {
    return (
      <Layout home>
  ```

  - 이런 코드가 있었는데 `Home`에서 렌더링 될 때에는 true로, `First-post`에서는 undefined로 잡혔다. 



### Styling Tips

` classnames` 라이브러리를 통해 

```js
import styles from './alert.module.css'
import cn from 'classnames'

export default function Alert({ children, type }) {
  return (
    <div
      className={cn({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error'
      })}
    >
      {children}
    </div>
  )
}
```

위와 같이 특정 속성의 변경에 따라 특정 엘리먼트의 css class를 변경할 수 있다.

물론 아래와 같이 다양한 방법이 존재하니 편한 방법으로 하면 될 것 같다.

```js
    <div className={name === 'HoodieSparro' ? styles.container : 'hi' }>
```



### Customizing PostCSS Config

기본값으로 Next.js는 PostCSS로 CSS를 컴파일한다. 루트에 `postcss.config.js` 파일을 생성해서 PostCSS의 설정을 만질 수 있는데, Tailwind CSS 같은 라이브러리를 사용할 때 유용하다. 지금은 넘어가도록 하겠다.

- https://postcss.org/
- [Styling Tips - Assets, Metadata, and CSS | Learn Next.js (nextjs.org)](https://nextjs.org/learn/basics/assets-metadata-css/styling-tips)



# Pre-rendering and Data Fetching

### Pre-rendering

기본값으로 Next.js는 모든 페이지를 미리 렌더링한다. 즉, 클라이언트 측 자바스크립트로 HTML을 생성하는 것이 아니라, 미리 각 페이지의 HTML을 생성한다는 것이다. 이는 더 빠른 성능과 좋은 [SEO](https://en.wikipedia.org/wiki/Search_engine_optimization)로 이어질 수 있다. 또한 페이지가 로드될 때 **Hydration**을 통해 HTML과 최소한의 자바스크립트 코드가 합쳐져 정상적으로 반응하는 페이지를 구성한다.



### Two Forms of Pre-rendering

- ##### [Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)

  - **빌드 타임**에 HTML이 생성되며 해당 HTML은 매 요청마다 재활용된다.

- ##### [Server-side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering)

  - **매 요청**마다 HTML을 생성한다.

> Development mode (`npm run dev`)에서는 Static Generation과 상관없이 모든 페이지가 항상 Server-side Rendering 방식으로 동작한다.

- ##### Per-page Basis

  - 한 앱에서 Static Generation과 Server-side Rendering을 페이지마다 다르게 사용할 수 있다.



### Static Generations with and without Data

데이터를 받아올 필요가 없는 페이지들은 자동적으로 Static Generation이 적용된다. 하지만 데이터가 필요한 정적인 페이지들이 있을 수 있는데, `getStaticProps`를 사용하면 된다.



### Static Generation with Data using `getStaticProps`

```js
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

async 함수 `getStaticProps`를 이용해 Next.js에 필요한 데이터를 알려주면 된다. 리턴된 props는 `Home` 컴포넌트의 props로 보내진다.



### Implement getStaticProps

실제 블로그 글 데이터를 md파일로 작성 후 불러오는 식으로 예제를 진행한다. `gray-matter` 라이브러리를 이용해 YAML Front Matter (title 등) 읽을 것이다.

파일 시스템에서 블로그 글을 읽어오는 `lib/posts.js` 모듈을 만든 후, `index`에서 `getStaticProps`를 이용해 블로그 글들을 출력한다.



### Fetch External API or Query Database

예제는 파일 시스템을 이용했지만, API 엔드포인트 또는 데이터베이스 쿼리를 직접 날리는 것도 가능하다. `getStaticProps`는 결국 서버에서만 실행되므로, 데이터베이스 또한 접근이 가능한 것이다. 심지어 클라이언트 측의 자바스크립트 번들에는 포함되지도 않는다는 것을 기억하자.

- 또한 Incremental Static Regeneration, getStaticPath 등 상황에 맞는 활용법에 대한 고민이 필요하다.
- [Data Fetching: Overview | Next.js (nextjs.org)](https://nextjs.org/docs/basic-features/data-fetching/overview#getstaticpaths-static-generation)



### Fetching Data at Request Time

매 요청마다 데이터를 받아와야 할 때의 접근법은 서버 또는 클라이언트 어느 곳에서 데이터를 받을 것인지에 따라 갈리게 된다.

- ##### Server Side Rendering Using `getServerSideProps` : 서버에서 데이터를 받아오기

  ```js
  export async function getServerSideProps(context) {
    return {
      props: {
        // props for your component
      }
    }
  }
  ```

  - `getServerSideProps` 를 이용한다. [서버 응답 시간(TTFB)](https://web.dev/time-to-first-byte/)은 CDN에 캐시되지 않으며 서버의 계산 시간이 있으므로 앞서 다룬 방법보다 느리다.
    - 이로 인해 pre-render가 필요할 때에만 사용하는 것이 좋다.
  - `context` 프롭 내부에 요청 관련 파라미터들이 들어있다.

  

- ##### Client-side Rendering
