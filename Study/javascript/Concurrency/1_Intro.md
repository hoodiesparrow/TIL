# 자바스크립트 동시성 모델

> [동시성 모델과 이벤트 루프 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/ko/docs/Web/JavaScript/EventLoop)
>
> [Tasks, microtasks, queues and schedules - JakeArchibald.com](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
>
> Promise, Async&Await를 다루기 전 기초가 되는 자바스크립트 동시성 모델에 대해서 다루는 MDN문서를 직접 번역하며 공부했다.

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



## Event Loop

```js
while(queue.waitForMessage()){
  queue.processNextMessage();
}
```

이벤트 루프는 보통 위와 같이 동작한다. `queue.waitForMessage()`는 현재 아무 메세지도 없다면 동기적으로 메세지의 도착을 기다린다. 

##### Run to completion

각각의 메세지는 하나가 완전히 처리된 후 다음 메세지가 처리된다.

- 이를 통해 프로그램에 대해 추론할 때 편의성을 얻을 수 있다. 하나의 함수가 실행되면 선점(pre-empted)되지 않고 다른 코드가 실행되기 전 해당 함수가 먼저 실행되기 때문이다. 선점되어 다른 코드가 먼저 실행된다면 이전에 실행된 함수가 조작하던 데이터를 수정할 수도 있기 때문.
  - 이는 C언어와 다른데, 예를 들면 한 쓰레드의 함수가 실행되는 중에도 런타임이 언제라도 이를 멈추고 다른 쓰레드에 있는 다른 코드를 실행할 수 있기 때문이다.

이 모델의 단점은 한 메세지가 종료까지 너무 오랜 시간이 걸린다면 web application이 사용자의 클릭과 스크롤같은 상호작용을 처리할 수 없다는 것이다. 브라우저는 보통 이런 경우 "a script is taking too long to run" 이라는 다이얼로그를 통해 사용자에게 알려준다. 따라서 메세지 처리 시간을 짧게, 가능하다면 메세지를 여러 메세지로 나누는 것이 추천되는 방법이다.

##### Adding Messages

웹 브라우저에서는 event가 발생하고 해당 event에 연결된 event listener가 있을 때 메세지가 추가된다.

`setTimeout` 함수는 -메세지 큐에 추가될 메세지, 시간값- 두 개의 인자를 가지고 호출된다. 시간값은 메세지가 실제로 메세지 큐에 푸시되는 최소한의 딜레이을 의미한다. 메세지 큐가 비어있고, 스택이 비어있다면 해당 메세지는 딜레이 이후 바로 처리된다. 만약 다른 메세지가 있다면, 우리의 `setTimeout` 메세지는 다른 메세지가 처리될 때까지 기다려야 한다. 따라서 두번째 인자인 시간값은 `최소한의` 딜레이가 된다.

##### Zero Delays

`setTimeout`에서 시간값을 0으로 준다고 해서 콜백함수(메세지)를 0ms 이후 바로 실행한다는 뜻은 아니다. 

실제 실행은 메세지 큐에서 대기하고 있는 작업의 수에 따라 달라진다. 아래의 예제에서 `'this is just a message', 'this is the end'` 는 콜백함수가 처리되기 전에 먼저 처리된다. 

`setTimeout`은 대기중인 메세지들의 코드들이 모두 실행될 때까지 기다려야 한다.

```js
(function() {

  console.log('this is the start');

  setTimeout(function cb() {
    console.log('Callback 1: this is a msg from call back');
  }); // has a default time value of 0

  console.log('this is just a message');

  setTimeout(function cb1() {
    console.log('Callback 2: this is a msg from call back');
  }, 0);

  console.log('this is the end');

})();

// "this is the start"
// "this is just a message"
// "this is the end"
// "Callback 1: this is a msg from call back"
// "Callback 2: this is a msg from call back"
```



조금 더 극단적인 예시를 위해 약간의 코드를 끝부분에 추가해 보았다.

```js
(function() {

  console.log('this is the start');

  setTimeout(function cb() {
    console.log('Callback 1: this is a msg from call back');
  }); // has a default time value of 0

  console.log('this is just a message');

  setTimeout(function cb1() {
    console.log('Callback 2: this is a msg from call back');
  }, 0);

  console.log('this is the end');
    
  let idx = 0
  while (idx < 50000) {
    console.log('hi');
    idx += 1
  }
})();
```

5만번의 `'hi'`가 찍힌 이후에야 콜백함수가 실행되는 것을 볼 수 있었다. 이를 통해 익명 즉시실행함수 대괄호 내부에 있는 코드들이 모두 메세지 큐에 담기고, 동기적인 코드(`console.log()`)들은 함수가 실행되는 즉시 대기상태로 들어간다는 것을 알 수 있었다.

##### Several Runtimes communicating together

Web worker나 크로스 오리진 `iframe`은 고유의 스택, 힙, 메세지 큐를 가지고 있다. 두 개의 다른 런타임들은 `postMessage` 메서드를 통해서만 통신할 수 있다. 해당 메서드는 다른 런타임이 `message` 이벤트 핸들러를 가지고 있다면 그 런타임에 메세지를 등록한다.

##### Never Blocking

이벤트 루프에서 자바스크립트는 다른 언어와 다르게 Block을 하지 않는다. I/O 처리는 대개 이벤트와 콜백으로 처리되기 때문에, (네트워크 등) 어떤 응답을 기다리고 있는 동안에도 사용자의 입력과 같은 다른 동작들을 처리할 수 있다. 

`alert` 또는 synchronous XHR와 같은 legacy 예외가 존재하긴 하지만, 사용하지 않는 것이 바람직하다. 
