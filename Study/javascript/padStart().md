# String.prototype.padStart()

> [String.prototype.padStart() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)



백엔드와 REST api로 소통하기 위해 현재 시간에서 딱 한시간을 뺀 시간의 `YYMMDDHH` 문자열이 필요했다.

타임스탬프에서 (60분 * 60초 * 1000 밀리세컨드)를 뺀 값으로 Date() 객체를 만든 뒤 템플릿 리터럴을 이용해 문자열을 만드는 구상을 했다.



타임스탬프에서 Date 객체를 만드는 것은 `new Date(timestamp)`를 통해 할 수 있었지만,

아래 주석의 내용처럼 월, 일, 시간 등을 반환하는 메서드는 1월일 때는 한 자릿수인 1만을 반환하기에 함수를 통해 앞에 '0'을 붙여준 후 반환할까 생각했다.

하지만 불필요한 코드라는 생각이 들어 찾아보니, `padStart()`라고 간단히 해당 동작을 수행하는 메서드가 있었다.

```js
const date = new Date()
console.log(date)  // 날짜로 현재 시간
console.log(date.getMonth())  // 0~11까지 현재 달을 표시

// 여기서 시간, 분 등도 앞에 0을 붙이지 않음
// 21년 1월 1일 1시를 21010101 형태로 표시해야 한다면
// 함수를 짜서 리턴하는 방법도 있겠지만
// padStart() 메서드를 사용하면 간단함

const timeStamp = ${certain_timestamp_at_2021.01.01.01}
const date2 = new Date(timeStamp)  // 특정 타임스탬프의 Date 객체를 생성하려면 new를 붙여야 함

// String 메서드이므로 추가 변수 선언 없이 사용하려면 String()으로 감싸준다.
console.log(`${String(date2.getMonth() + 1).padStart(2, '0')}`  // 01
// +(여기서 month는 0~11까지의 값이므로 +1)

//ARGS
String.prototype.padStart(targetLength, filler)  // ref. MDN for more detail
```

