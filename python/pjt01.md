# 22.01.2021

> SSAFY에서 첫 프로젝트를 진행했다.



- 새로운 딕셔너리 `result` 를 만드는 중 오류가 발생했다.

```python
genre_ids = [1, 2]
result[genre_ids] = genre_ids
```

두개의 요소를 가진 리스트인 `genre_ids`는 딕셔너리의 키로 사용될 수 없었다.

대신 'genre_ids'로 따옴표를 입혀 스트링 타입으로 딕셔너리에 입력할 수 있었다.



- 리스트 속의 딕셔너리의 값을 찾으려 할 때 헤멨다.

```python
for y in genres_list:
    if x == y['id']:
```

`y`딕셔너리의 `key`를 찾는 방법은 `y['keyName']` 이다.



- 리스트 속에 들어있는 튜플 모양의 딕셔너리를 하나의 깔끔한 딕셔너리로 만드는 방법

```python
    g_dict = {}
    for z in genres_list:
        g_dict[z['id']] = z['name']
```

`g_dict[z['id']] = z['name']` 간단한 코드지만 생각이 잘 나지 않아서 아주 어려웠다!

내일 다시 복습해야 할 필요가 있다.



- `for`문 안에서  두개의 변수를 한 리스트 안에 넣을 때 `[]`의 사용

```python
 compare_list += [[vid, revenue]]
```

`[]`을 한번만 씌운다면 구분되지 않고 순차적으로, 두번 씌운다면 값 두개씩 구분되는 형태로 리스트 안에 들어가게 된다.

추가로,

```python
december += [name]
```

스트링인 name을 리스트에 넣을 때 `[]`을 하지 않고 넣으면 한 글자씩 구분되어 리스트에 들어오게 되고,

`[]`을 해주게 되면 한 `name`씩 구분되어 들어오게 된다.