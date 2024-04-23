# Redux

> [Getting Started with React Redux | React Redux (react-redux.js.org)](https://react-redux.js.org/introduction/getting-started)
>
> [Quick Start | React Redux (react-redux.js.org)](https://react-redux.js.org/tutorials/quick-start)



### 설치

```bash
// Create React App과 같이 사용시
npx create-react-app my-app --template redux
----------------------------------------------
// 이미 만들어진 React App의 경우
yarn add react-redux
```



### Provider

전역에서 Redux Store를 사용 가능하게 만들어 줌

**@ src/index.js**

```react
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './store'

import App from './App'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
```

'Provider' 태그에 `import`한 'store'를 `props`로 넘겨준다.



### Redux Toolkit

```bash
npm install @reduxjs/toolkit react-redux
```



액션 및 리듀서를 관리하기 위한 코드가 번거롭기 때문에, Redux에서 공식적으로 개발 도구를 만들어 배포한 것이다. 사실 유명한 Redux 관련 라이브러리를 내부적으로 도입한 것이며, 리듀서 생성은 'Immer', 셀렉터 생성은 'Reselect'를 사용하고 있다. 

> [Redux Toolkit을 활용한 React 상태 관리 | blog.rhostem.com](https://blog.rhostem.com/posts/2020-03-04-redux-toolkits)



### Redux Store

store.js 생성

**@ src/app/store.js**

```js
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {},
})
```



### Redux State Slice

Redux Toolkit은 액션이나 리듀서 외에 다른 방식으로 상태를 관리할 수 있는 도구를 제공한다. `createSlice` API를 이용해 액션, 리듀서를 한 번에 만들 수 있다.

이때 `createSlice` 와 `createReducer` API는 'Immer'를 이용해 state의 값을 복사한 후 수정하는 방식이 아니라 "mutating"하는 식으로 코드를 짜도 올바른 "immutable update"를 하게 해주는 식으로 동작한다.

**@ src/features/counter/counterSlice.js**

```js
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

이때 slice를 판별할 이름, 초기값, 리듀서 함수를 입력하면 된다. [name, initialState, reducers]



### Slice Reducers in the Store

위에서 작성한 'counter' 슬라이스를 스토어에 import한다.

**@ src/app/store.js**

```js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})
```

'counterSlice' 파일에서 가져온 `counterReducer`를 `reducer` 객체 내부에 선언해주면 된다.



### In React Components

`useSelector`와 `useDispatch`를 이용해 React 컴포넌트 내부에서 Redux 스토어에 접근할 수 있다. Counter.js 파일을 생성하여 `Counter` 컴포넌트를 작성해준다.

**@ src/features/counter/Counter.js**

```react
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'
import styles from './Counter.module.css'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
```

`const count`에서 `state`를 사용하는데 아마 `Provider`에서 제공되는 것 같다.



