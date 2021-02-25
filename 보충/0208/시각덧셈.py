import sys
sys.stdin = open('input.txt')
T = int(input())

for t in range(T):
    ahr, amin, bhr, bmin = map(int, input().split())

    # -12 -60으로 풀면 12 30 12 30이 입력으로 들어왔을 때 오류가 날 수도 있다
    # hrsum부분을 while문으로 처리하거나,
    # 나누기 연산으로 처리
    m = amin + bmin
    hr = ahr + bhr
    carry = m // 60
    m = m % 60
    hr += carry

    if hr % 12 == 0 and hr > 0:
        hr = 12
    else:
        hr %= 12

    print(f'#{t+1} {hr} {m}')