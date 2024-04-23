# Numpy

```python
import numpy as np
```

- np라는 이름으로 numpy를 import한다.



```python
data1 = [6, 7.5, 8, 0, 1]
arr1 = np.array(data1)
print(arr1)
```

- 1차원 리스트 정보로 array를 생성한다.



```python
data2 = [
    [1, 2, 3, 4], 
    [5, 6, 7, 8]
]
arr2 = np.array(data2)
print(arr2.dtype)
print(arr2.shape)
```

- 2차원 리스트 정보로 array를 생성한다.
  - array.dtype은 배열이 어떤 자료형인지에 대한 정보를 리턴한다.
  - array.shape는 (2, 4)를 반환하며, 배열의 축에 대해 크기 정보를 리턴한다.



```python
np.zeros((3,1))
np.ones((1,3))
```

- 주어진 축의 크기만큼 0, 1로 채워진 배열을 생성한다.



```python
arr1 = np.array([[1, 2, 3], [4, 5, 6]], dtype=np.float64)
arr2 = np.array([[7, 8, 9], [10, 11, 12]], dtype=np.float64)

print(arr1 + arr2)
print(arr1 - arr2)
print(arr1 * arr2)
print(arr1 / arr2)
print(arr1 + 1)
```

- 같은 크기를 가진 배열끼리는 연산이 가능하며, 연산된 배열을 리턴한다.
  - arr1 + 1의 경우에는 배열의 모든 요소에 대해 주어진 연산 후 결과 배열을 리턴한다.



```python
arr = np.arange(10)
arr[5]
```

- 파이썬의 range와 비슷한 arange이다. 



```python
names = np.array(["Charles", "Kilho", "Hayoung", "Charles", "Hayoung", "Kilho", "Kilho"])
print(names == "Charles")
```

- 1차원 array에 대해서 array == "value"를 입력시, 배열의 요소와 값을 비교한 후

  [ True False False  True False False False] 과 같이 불리언 값으로 이루어진 배열을 리턴한다.



```python
data = np.random.randn(7, 4)
data[names=="Charles", :]
data[(names=="Charles") | (names=="Kilho"), :]
```

- randn함수를 통해 7행 4열의 랜덤한 부동소수점으로 이루어진 array를 생성한다.
  - names와 data는 별개의 배열이지만, axis=0에 대해 같은 크기를 가지므로 `names == "Charles"`에서 반환된 불리언 값으로 이루어진 배열을 통해 data배열을 마스킹할 수 있다.
    - 결과적으로 names 배열에서 값이 'Charles'인 인덱스를 가지고 data의 행을 가져온 것이다.
      - `|`(pipe) 로 `or `연산을 할 수 있으며, `& `로 `and` 연산을 할 수 있다.





