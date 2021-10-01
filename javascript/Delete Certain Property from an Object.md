# 객체의 프로퍼티 삭제하기



### delete

> [delete 연산자 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/delete)

`delete objectName.objectPropertyName` 으로 객체의 속성을 삭제할 수 있다.

다만, `delete`는 원본 객체를 수정하기에 타입스크립트에서 `delete`를 사용하게 되면 경고를 띄운다고 한다.



### 구조 분해 할당으로 삭제할 프로퍼티를 왕따시키기

```js
      const { market: temp, ...rest } = query.value
      
      if (store.getters['getMarket'] >= 1) {
        query.value = {
          ...rest,
          page: 0,
          market: store.getters['getMarket']
        }
      } else {
        query.value = {
          ...rest,
          page: 0,
        }
      }
```

( 클라이언트가 전체 마켓 / 특정 마켓을 선택한 경우 ) => query라는 ref의 값에 'market'이라는 속성을 덮어씌우거나 제외해야 했다.

- query의 값을 구조 분해 할당으로 'market'이라는 속성, 그리고 그 외의 속성들을 모은 'rest'로 나누었다.
  - 직접 해본 결과 query 객체 내부에 'market'이 들어있지 않아도 'temp'는 `undefined`로 잡혔다. 자유롭게 사용할 수 있을 것 같다.



```vue
<script>
import { ref } from 'vue'

export default {
  setup() {
    const asd = ref({asd: 1, qwe: 2, zxc: 3})
    const { asd: temp, ...rest } = asd.value
    console.log(rest)
    console.log(temp)

    return { asd }
  },
}
</script>
```

- 간단한 vue SFC 테스트 코드

