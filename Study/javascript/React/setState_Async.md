# setState is asynchronous

프로젝트 중 state를 변경하고 바로 아래에서 `console.log`를 찍어봐도 값이 변경되지 않는 일이 있었다. 

```react
setStateName('userInputValue')
console.log(stateName)  // logged value is not concurrent(1~more letters behind)
```

아이디, 비밀번호가 변경될 때마다 `setState`를 하며 로그를 같이 찍었는데, 항상 한 글자 이상이 잘려서 나오는 것이였다. 



알고보니 React의 `setState`는 비동기로 작동했기에, state의 변경에 따라 알맞게 로그를 찍기 위해서는 첫 번째 인자로 콜백함수, 두 번째 인자로 배열을 갖는 `useEffect`를 사용해야 했다. 이 `useEffect`의 두 번째 인자, 배열은 여러 용도로 사용되는데, 빈 배열일 경우 Vue의 라이프사이클 중 `onMounted`와 같고, 배열에 state를 담을 경우 Vue의 `watch`와 비슷하게 동작한다. 배열에 넣은 state가 갱신되어 DOM이 변경될 때 실행되는 것 같다.

> https://medium.com/@leonardobrunolima/react-tips-why-is-setstate-asynchronous-f2dd66a434c0



```react
useEffect(() => {
  console.log(ID)
}, [ID])
```

