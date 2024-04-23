[S/W 문제해결 기본] 7일차 - 암호생성기

> 다음 주어진 조건에 따라 n개의 수를 처리하면 8자리의 암호를 생성할 수 있다.
>
> \- 8개의 숫자를 입력 받는다.
>
> \- 첫 번째 숫자를 1 감소한 뒤, 맨 뒤로 보낸다. 
>
> 다음 첫 번째 수는 2 감소한 뒤 맨 뒤로, 그 다음 첫 번째 수는 3을 감소하고 맨 뒤로, 그 다음 수는 4, 그 다음 수는 5를 감소한다.
>
> 이와 같은 작업을 한 사이클이라 한다.
>
> \- 숫자가 감소할 때 0보다 작아지는 경우 0으로 유지되며, 프로그램은 종료된다. 이 때의 8자리의 숫자 값이 암호가 된다.

```python
# 원형 큐
 
def enQueue(item):
    global rear
 
    if (rear + 1) % size == front:
        print('error')
    else:
        rear = (rear + 1) % size
        Q[rear] = item
 
 
def deQueue():
    global front
 
    if (front + 1) % size == rear:
        print('error')
    else:
        front = (front + 1) % size
        return Q[front]
 
 
def decoder(arr):
    while True:
        for n in range(1, 6):
            temp = deQueue() - n
            if temp <= 0:
                temp = 0
                enQueue(temp)
                return
            else:
                enQueue(temp)
 
 
for t in range(10):
    tc = input()
    arr = list(map(int, input().split()))
 
    size = 10
    front = 0
    rear = 8
    Q = [0] + arr + [0]
 
    decoder(arr)
    print(f'#{t + 1}', end=' ')
 
    idx = (front + 1) % size
    cnt = 0
    while cnt != 8:
        print(Q[idx], end=' ')
        idx = (idx + 1) % size
        cnt += 1
    print()
```

- 리스트 큐로 했으면 엄청 간단할테지만 연습 겸 원형 큐로 구현해 보았다.