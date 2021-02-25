import sys
sys.stdin = open('input.txt')

for t in range(10):
    T = int(input())
    arr = [[i for i in map(int, input().split())] for j in range(100)]

    total = []
    diag = 0
    diag_alt = 0

    for y in range(100):
        tmp_row = 0
        tmp_column = 0
        diag += arr[y][y]
        diag_alt += arr[y][-(y+1)]

        for x in range(100):
            tmp_row += arr[y][x]
            tmp_column += arr[x][y]
        total += [tmp_row]
        total += [tmp_column]
    total += [diag]
    total += [diag_alt]

    for idx in range(len(total)-1):
        if total[idx] > total[idx+1]:
            total[idx], total[idx+1] = total[idx+1], total[idx]

    print(f'#{t+1} {total[-1]}')