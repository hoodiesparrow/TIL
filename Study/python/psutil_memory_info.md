# 파이썬에서 메모리 사용량 확인하기

> [python 프로그램 메모리 사용량 확인 (tistory.com)](https://jybaek.tistory.com/895)

Merge Sort를 구현한 코드 중 성능이 좋은 코드를 확인하기 위해서 메모리 사용량을 확인하는 법을 찾아보았다.

걸린 시간은 `time` 패키지를 사용하면 된다.



```python
import psutil


def mem_usage():
    p = psutil.Process()
    return p.memory_info().rss / 2 ** 20


def do_sth(N):
    return [[[0] * N for n in range(N)] for n in range(N)]


first_state = mem_usage()
print(f'1: {first_state} MB')

do_sth(500)

second_state = mem_usage()
print(f'2: {second_state} MB')

print(f'실행 전후의 차이: {second_state - first_state} MB')
```



> [psutil을 사용해서 python의 CPU, RAM의 사용량을 확인하자. : frhyme.code](https://frhyme.github.io/python/python_check_memory_usage/)

이곳에서 프로세스 구분 없이 하는 법과 현재 프로세스의 메모리 사용량을 체크하는 법을 확인할 수 있다.





직접 실행해본 후 한가지 아쉬운 점이 있었다. 파이썬의 Garbage Collector 때문에 매번 실행할 때마다 값이 조금씩 다르게 나왔으므로 알고리즘의 효율성을 비교하려면 충분히 큰 사이즈의 input으로 여러 번 비교해야 할 것 같다.

- 직접 메모리 사용량을 추적해본 것은 처음이라 여지껏 알고도 모르고 살았던 Garbage Collector의 존재를 처음으로 실감할 수 있었다. 덕분에 Garbage Collector의 작동 원리에 대해 호기심이 생겨서 찾아볼 거리가 늘었다.



아래는 실행 결과이다.

```
1: 12.9609375 MB
2: 15.29296875 MB
실행 전후의 차이: 2.33203125 MB

1: 12.9609375 MB
2: 15.8828125 MB
실행 전후의 차이: 2.921875 MB

1: 12.96875 MB
2: 15.17578125 MB
실행 전후의 차이: 2.20703125 MB

1: 12.9609375 MB
2: 15.203125 MB
실행 전후의 차이: 2.2421875 MB
```

