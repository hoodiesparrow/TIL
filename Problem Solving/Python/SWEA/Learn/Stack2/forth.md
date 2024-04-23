```python
operand = ['*', '+', '-', '/', '.']

for t in range(int(input())):
    arr = list(input().split())
    stack = []
    N = len(arr)
    for i in range(N):
        validity = 1
        if arr[i] not in operand:
            stack.append(int(arr[i]))
        elif arr[i] in operand and arr[i] != '.':
            if len(stack) < 2:
                validity = 0
                break
            else:
                B = stack.pop()
                A = stack.pop()
                if arr[i] == '*':
                    stack.append(A * B)
                elif arr[i] == '/':
                    stack.append(A // B)
                elif arr[i] == '+':
                    stack.append(A + B)
                elif arr[i] == '-':
                    stack.append(A - B)
        elif arr[i] == '.':
            if len(stack) != 1:
                validity = 0

    ans = ''
    if validity == 0:
        ans = 'error'
    else:
        ans = stack[0]

    print(f'#{t + 1} {ans}')
```

- 연산자들을 스택에 넣을 때의 우선순위를 떠올리니 로직은 별로 어렵지는 않았는데, 정확한 답을 이끌어 내기까지 디버깅이 몇번 필요했다.

