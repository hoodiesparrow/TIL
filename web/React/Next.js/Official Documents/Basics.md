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



