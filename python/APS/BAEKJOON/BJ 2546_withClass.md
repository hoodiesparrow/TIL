# 2546. 경제학과 정원영

> | 시간 제한 | 메모리 제한 | 제출 | 정답 | 맞은 사람 | 정답 비율 |
> | :-------- | :---------- | :--- | :--- | :-------- | :-------- |
> | 1 초      | 128 MB      | 356  | 112  | 88        | 37.768%   |
>
> ## 문제
>
> C언어 성적이 나쁜 학생이 C언어를 드랍하고 경제학 원론을 듣는다면, 그 학생은 두 과목 수강생의 평균 IQ를 올려준다.
>
> 이 말은 어떤 학생이 직접 C언어를 드랍하고 경제학 원론을 수강하면서 증명하였다.
>
> 각 학생의 IQ가 주어진다. 이때, C언어 수강생 중에 C언어를 드랍하고 경제학 원론을 수강해서 두 과목의 평균 IQ를 모두 올려줄 수 있는 사람의 수를 구하시오.
>
> ## 입력
>
> 첫째 줄에 테스트 케이스의 개수 T가 주어진다. 각 테스트 케이스는 빈 줄로 구분되며, 다음과 같이 구성되어 있다. 
>
> 테스트 케이스의 첫째 줄에는 C언어 수강생의 수 N과 경제학 원론 수강생의 수 M이 주어진다. 둘째 줄에는 N+M 개의 숫자가 공백으로 구분되어 주어진다. 
>
> 처음 N개의 숫자는 C언어 수강생의 IQ이며, 다음 M개의 숫자는 경제학 원론 수강생의 IQ이다.
>
> N과 M은 200,000보다 작거나 같은 자연수이고, N은 2보다 크거나 같다. IQ는 100,000보다 작거나 같은 자연수이다.
>
> ## 출력
>
> 각 테스트 케이스의 정답을 한 줄에 하나씩 차례대로 출력한다.

```python
for t in range(int(input())):
    gbg = input()
    N, M = map(int, input().split())
    C = list(map(int, input().split()))
    E = list(map(int, input().split()))
    C_iq = sum(C) / N
    E_iq = sum(E) / M

    ans = 0
    # 개별 C 언어 수강생에 대해
    for c in C:
        if c < C_iq:
            if c > E_iq:
                ans += 1

    print(ans)
```

간단한 문제라서 여지껏 django 등에서 주구장창 쓰기만 하고 직접 작성해본 적이 없는  `class` 를 이용해서 풀어보기로 했다. 항상 구조만 대략적으로 이해하고 막상 타이핑하려니 구문들부터 인터넷에 검색한 뒤에 작성할 수 있었다.

```python
class subject:
    def __init__(self, iq, N):
        self.iq = iq
        self.N = N
        self.avg = sum(self.iq) / self.N


for t in range(int(input())):
    gbg = input()
    N, M = map(int, input().split())
    C = subject(list(map(int, input().split())), N)
    E = subject(list(map(int, input().split())), M)

    ans = 0
    for student in C.iq:
        if student < C.avg:
            if student > E.avg:
                ans += 1

    print(ans)
```

과목을 클래스로 만든 뒤 C, 경제학원론을 각각 해당 클래스의 객체로 만들어서 풀어보자고 생각했다. 나중에 다시 보면 되게 이상한 코드일 수도 있겠다는 생각이 들기도 했지만 아무튼 클래스를 활용해 풀어본 첫 알고리즘 문제가 되었다. 확실히 구조가 단순한 이런 문제에서는 굳이 객체지향 프로그래밍을 사용하더라도 얻어지는 이점이 없겠지만, 조금 더 어려운 문제들 / 실제 업무를 위한 코드에 사용했을 때는 비슷한 행동/특성을 가지는 여러 객체들을 관리하기에 적합하다는 생각이 들었다.

