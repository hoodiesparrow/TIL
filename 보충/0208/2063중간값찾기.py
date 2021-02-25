import sys
sys.stdin = open('input.txt')
N = int(input())
arr = [x for x in map(int, input().split())]

# 중간값 중 n이 홀수인 경우일 때
# n = 9이면, 정렬한 후 idx = 4인 값이 중간값임
# 버블소팅은 쉬우니 카운팅소트로 해보자
L = len(arr)
mmax = 0
for i in range(L):   # 방금 배운 max 알고리즘 활용
    if arr[i] > mmax:
        mmax = arr[i]

cnt = [0] * (mmax+1) # 인덱스는 0부터 시작하므로 +1 조심

for i in range(L):
    cnt[arr[i]] += 1

# cnt누적

for i in range(1, len(cnt)): # index 0이 들어가면 에러가 뜨니 조정
    cnt[i] += cnt[i-1]

# 재배열
res = [0] * N

for i in range(L):
    cnt[arr[-(i+1)]] -= 1
    res[cnt[arr[-(i+1)]]] = arr[-(i+1)]

print(res[(len(res)//2)])
