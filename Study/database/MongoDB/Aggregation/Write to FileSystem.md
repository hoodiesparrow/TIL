# Write file from MongoSH in Compass

부산에 클래스가 있는 강사의 이메일을 뽑을 일이 있었다.

쿼리에서도 헤매고 파일로 출력하는 부분에서도 헤맸지만 난이도가 그렇게 높지는 않아서 이것저것 찾아보며 해결할 수 있었다.



1. Query

```jsx
const results = db.classes.aggregate([
{
  $match: {
		'location.category': '부산',
		'status': 'APPROVED',
  }
},
{
  $project: {
    createUserId: 1,
    title: 1,
    _id: 1
  }
}, 
{
  $lookup: {
    from: 'users',
    localField: 'createUserId',
    foreignField: '_id',
    as: 'user'
  }
},
{
  $project: {
    _id: 0,
    title: 1,
    email: '$user.email',
    username: '$user.username',
    classUrl: {
      $concat: ['<https://mochaclass.com/class/>', { $toString: '$_id'}]
    }
  }
}, 
{ $unwind: { path: '$email' } }, 
{ $unwind: { path: '$username' } }
]).toArray()
```

- 끝에 `toArray()`를 주어야 JSON으로 내보내졌다.



우선 쿼리에서는 처음에 `$lookup`을 쓰면 되겠다 싶었는데 users를 user로 오타내놓곤 안된다고 생각해서 돌고 돌다가 다시 룩업으로 해결했다.

클래스를 생성하게 되면 생성한 유저의 ObjectId가 클래스 도큐먼트 내부에 createUserId로 저장되었는데, 

```js
const ids = db.classes.aggregate([{ $match: { "지역": "부산" }}])
```

이런 식으로 뽑은 뒤 `cursor.map()`을 통해 배열로 변환한 다음 해당 배열을 users 콜렉션에서 `$in`에서 사용하려고 했으나, 뭘 잘못하고 있는건지 원래 안되는 건지 `users` 콜렉션에 먹이는 aggregation, find의 스코프에 `ids`가 없는 것처럼 나왔다. 뭔가 함수로 감싸거나 어떻게든 방법이 있을 것 같았지만 검색이 잘 되지 않아서 다른 방법을 찾기로 했다.

node 상에서 진행했다면 그냥 자바스크립트로 처리했으면 될 것 같긴 하지만 compass 내부에서 해결하고 싶어서 다시 룩업을 시도해봤더니 잘 되어서 보는 사람 편의상 url도 달아주었다.



2. import `fs`

```jsx
const fs = require('fs')
```

이것저것 찾아보다 보니 자바스크립트 기본 모듈은 그냥 가져올 수 있었다.

- [Use require() to Include External Modules](https://www.mongodb.com/docs/mongodb-vscode/require-modules/)



3. Write to FileSystem

```jsx
fs.writeFileSync('/Users/hoodiesparrow/Redikins/BusanTeachersEmail.json', JSON.stringify(results, null, 2))
```

`stringify()` 세 번째 인자에 인덴트 값을 주면 pretty 출력된다.