# React

> 싸피에서 마지막 프로젝트에는 리액트를 사용할 것 같아 간단하게 유튜브 영상을 따라해 보았다.
>
> https://www.youtube.com/watch?v=nahwuaXmgt8



## 1. 프로젝트 생성

```bash
npx create-react-app {{ projectName }}
```

`create-react-app` 라이브러리를 통해 기본적인 프로젝트 구조를 잡아줄 수 있다. `vue cli`환경에서 Vue 프로젝트를 시작했을 때와 거의 동일한 package.json, node_modules, public, src 폴더 구조로 만들어지는 것을 볼 수 있다. 다만 Vue는 프레임워크로 별도 확장자를 가진 .vue 파일을 통해 index.html의 DOM을 수정했지만, React에서는 .js파일로 같은 동작을 하는 걸 확인했다.



##### ./public

Static 파일(favicon, index.html, manifest.json, robots.txt) 보관함

- `build`시에도 압축되지 않음
-  Vue에서 볼 수 없었던 robots.txt, manifest.json 파일의 존재



프로젝트 실행 :

```bash
npm start
```



div태그가 자동완성이 되지 않아 extension을 안 깔았나 싶었지만, VSC 우측 하단 language 버튼을 눌러 `Javascript React` 를 선택해주니 문제없이 자동완성되었다.



## 2. JSX

현재 index.html 안에 app.js의 코드를 삽입하는 역할은 index.js에서 담당하고 있다.

```js
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```



다만 이때 app.js의 코드를 살펴보면,

```js
function App() {
  return (
    <div className="App">
      
    </div>
  );
}
```

익숙하면서도 이상한 코드를 만날 수 있다. JS의 함수 내부에 소괄호로 감싸진 html태그를 바로 선언한 것. 

div태그의 class가 className으로 바뀌어있는 걸 볼 수 있는데, 이건 바로 해당 언어가 html이 아닌 JSX이기 때문. 물론 className은 html에서 class에 해당한다.

```js
import './App.css';
```

파일 상단에서 css파일이 import 된 것을 확인할 수 있는데, 이곳에서 css 스타일링을 하면 된다.



##### 데이터 바인딩

JS 변수에 저장한 값을 html에서 불러올 때 :

```react
function App() {

  let posts = '구미 고기 맛집';

  return (
    <div className="App">
      <div className="black-nav">
        <div> 개발 blog</div>
      </div>
      <h4> { posts } </h4>
    </div>
  );
}
```

큰 차이점이라기 보다는 Vue에서는 {{ variableName }} 이였지만 react에서는 { variableName } 이다.



html 태그 속성 지정할 때 :

```react
import './App.css';
const someClass = 'some-class-name'
...

function App() {
  ...
  <img src="{ logo }" />
  <div className="{ someClass }"> 개발 blog </div>
  ...
}
```

Vue와 크게 다르지 않은 느낌이지만, 수염태그를 붙여 줘야 한다.



inline-style 지정시 :

```react
        <div style="{ { color : 'blue' } }">
          개발 blog
        </div>
```

문법상 Object 형식으로 값을 넣어줘야 하므로, 수염 태그를 두번 감싸주는 식이 된다. 

다만 이때

```react
<div style="{ { color : 'blue', font-size : '30px' } }">
```

이런 식으로 작성하게 되면, `-`가 JS의 뺄셈으로 해석되므로 lowerCamelCase 작명을 따라주면 된다. 이 부분은 tailwindcss의 설정을 할 때와 비슷한 원리라는 생각이 들었다.

```react
<div style="{ { color : 'blue', fontSize : '30px' } }">
```

물론 style 내부의 객체도 JS 변수에 할당하여 사용할 수도 있다. 



## 3. useState()

`function` 내부에 const, let으로 변수를 선언할 수도 있지만, 리액트가 값의 변화에 따라 html를 다시 그릴 수 있도록 하려면 `useState()`를 활용하면 된다.

```react
import { useState } from 'react'
...

function App() {
  let [post, setPost] = useState('자바스크립트 코드 추천')
  ...
  
}
```

아마도 Vue Composition API의 `reactive`의 원류가 되는 문법이라는 생각이 들었다.

여기서 사용된 `let [var1, var2] = [value1, value2]` 문법은 배열의 요소를 간편하게 할당하는 문법이다. 왜 이렇게 값을 할당하느냐면, `useState(someValue)`는 [someValue, function]으로 이루어진 길이 2의 배열을 리턴하기 때문이다. 두번째 인자에 할당된 함수는 첫번째 인자인 값을 변경할 때 사용된다. react 공식 문서를 보았을 때 보통 setVariableName 식으로 앞에 'set'을 붙여주는 방식이 일반적인 것 같다. 

여기서 변수 대신 쓰는 state에는 문자, 숫자, 배열, 객체 모두 저장이 가능하다. state가 변경되면 html이 자동으로 재 렌더링된다.

