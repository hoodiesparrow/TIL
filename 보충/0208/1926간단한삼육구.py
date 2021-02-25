#import sys
#sys.stdin = open('input.txt')
# N = int(input())
N = 100

tsn = ['3', '6', '9']
out_str = ''
for num in range(1, N+1):
    num_list = []
    num_list = list(str(num))
    cnt = 0
    for n in num_list:
        if n in tsn:
            cnt += 1

    if cnt > 0:
        out_str += '-' * cnt
    else:
        for n in num_list:
            out_str += n
    out_str += ' '

print(out_str)