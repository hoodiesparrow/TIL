import sys
sys.stdin = open('input.txt')
T = int(input())

for t in range(T):
    N, M = map(int, input().split())
    arr = [[i for i in map(int, input().split())] for j in range(N)]

    # 시작점, 끝점은 N, M과 모두 관련있다
    # 합계 리스트에 더한 결과들을 저장한 후 뽑아내면 될 것 같다

    # 55 배열에서 22 파리채는? 한 행에서 4번, 전체 4번
    # 55 배열에서 33 파리채는? 한 행에서 3번, 전체 3번
    # 55 배열에서 55 파리채는? 1 1
    # 즉 N-M+1번 x N-M+1번씩이고, 행과 열 방향으로 for문을 돌리자
    # 근데 반복문 안에서도 다시 반복문을 돌려야 할 것 같다...
    # 파리채의 크기가 변하기 때문에, 반복문을 통해서 더할 값들을 건지자
    # 위에서 -M을 했으니 아래 for문에서 +를 해준다

    total = []
    for y in range(N-M+1):
        for x in range(N-M+1):
            tmp = 0
            for i in range(M):
                for j in range(M):
                    tmp += arr[y+i][x+j]
            total += [tmp]

    for num in range(len(total)-1):
        if total[num] > total[num+1]:
            total[num], total[num+1] = total[num+1], total[num]

    print(f'#{t+1} {total[-1]}')