# _.get()

> [Lodash Documentation](https://lodash.com/docs/4.17.15#get)

![main](get.assets/main.gif)



위 사진의 버튼을 만들 때 정말 유용하게 사용한 함수이다.

우선 import를 [Stop Importing Whole JavaScript Packages | by Aakash Yadav | Better Programming](https://betterprogramming.pub/stop-importing-whole-javascript-packages-39a5f3d4c8) 참조하여 

```js
import get from 'lodash/get';
```

전체 모듈을 import하는 것이 아니라 사용할 함수만 import하면 빌드시 잡아먹는 쓸데없는 용량을 줄일 수 있다.



여기서 주의할 점은, 

```js
import { get } from 'lodash';
```

의 경우는 전체 모듈을 임포트하므로 아무 차이가 없다는 것! 결국 from문에서 선언한 모듈을 전부 가져오는 모양새인 듯 하다. 이 부분은 더 알아보면 좋을 것 같다.



내 코드에서 `_.get`을 사용한 곳은,

```json
{
  "휴대폰": {
    "tag": "제조사",
    "Samsung": {
      "tag": "기종",
      "갤럭시 S21 시리즈": {
        "tag": "세부 기종",
        "S21": {
          "pid": 13
        },
        "S21 Plus": {
          "pid": 14
        },
        "S21 Ultra": {
          "tag": "스토리지",
          "256G": {
            "pid": 15
          },
          "512G": {
            "pid": 16
          }
            
          ...
```

이렇게 휴대폰 제조사 및 기종 등 트리형으로 구성한 json파일에서 버튼을 누를 때마다 treeDepth 변수에 key를 저장하고, 다음 트리의 내용을 가져오는 데에 사용했다.

```js
tree1.value = get(store.getters['getCategoryData'], tree1Depth.value)
```

_tree1Depth는 vue composition api의 `ref`라 value로 접근해야 한다._

두 번째 인자로 키 값들이 저장된 배열을 넘겨주어 간편하게 json 파일의 트리 구조를 사용할 수 있었다.

이 `get` 함수는 또 3번째 인자로 기본값을 설정할 수도 있어서, 객체를 안전하게 호출하는 데에도 사용할 수 있다는 점도 참고하자.

