# 자바스크립트 동시성 모델

> [동시성 모델과 이벤트 루프 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/ko/docs/Web/JavaScript/EventLoop)
>
> [Tasks, microtasks, queues and schedules - JakeArchibald.com](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
>
> Promise, Async&Await를 다루기 전 기초가 되는 자바스크립트 동시성 모델에 대해서 알아보았다.

자바스크립트는 싱글 스레드 기반 언어이기에 한번에 하나의 작업을 처리할 수 있다. 따라서 http 요청 등 시간이 걸리는 작업을 처리할 때에는 **비동기** 방식을 통해 동시성을 지원한다. C 또는 Java와 같은 언어와 완전히 다른 구조를 가지고 있어, 구조를 잘 파악해 두어야 한다. 이 섹션에서 설명할 내용은 이론적인 모델이며, 현대적인 자바스크립트 엔진들은 이 구조를 많이 최적화하여 사용한다는 것을 유념하자.

- 공부할 거리 => C 또는 Java와 같은 언어들은 어떻게 동시성 모델을 구현했는가? 또 C와 Java간의 차이점이 있다면 무엇이고, Python과는 어떤 점이 다를까?

![Stack, heap, queue](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop/the_javascript_runtime_environment_example.svg)

## CallStack

```js
function foo(b) {
  let a = 10
  return a + b + 11
}

function bar(x) {
  let y = 3
  return foo(x * y)
}

const baz = bar(7) // assigns 42 to baz
```

1. `bar`를 호출하면 `bar` 의 인자와 지역 변수를 참조하는 첫번째 프레임이 생성된다.
2. `bar`가 `foo`를 호출하면 `foo`의 인자와 지역 변수를 참조하는 두번째 프레임이 생성된다.
3. `foo`가 리턴되면 최상단의 프레임(두번째)이 `pop`된다. 
4. `bar`가 리턴되면 스택은 비게 된다.

- 인자와 지역 변수들은 스택 밖에 저장되기에 함수가 리턴된 후에도 남아있을 수도 있다. 이를 통해 중첩된 함수를 감싸는 외부 함수가 리턴된 후에도 중첩된 함수에서 해당 값에 접근할 수 있다.



## Heap

객체들은 큰 용량의 메모리 영역인 힙에 저장된다.



## Queue

하나의 자바스크립트 런타임은 하나의 메세지 큐를 사용한다. 메세지 큐는 처리될 메세지의 리스트이다. 각각의 메세지는 연결된 함수가 있으며 함수를 호출하여 메세지를 처리한다. 

이벤트 루프의 한 순간에, 런타임은 메세지 큐의 가장 오래된 메세지부터 처리한다. 이는 메세지를 큐에서 제거하면서 연결된 함수에 해당 메세지를 매개변수로 넘기는 것으로 이루어진다. 항상 함수의 호출은 새로운 스택 프레임을 생성한다. 함수들은 콜스택이 빌 때까지 계속된다. 콜스택이 비게 되면, 이벤트 루프는 메세지 큐에 있는 다음 메세지를 처리한다.



...[Concurrency model and the event loop - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#event_loop)
