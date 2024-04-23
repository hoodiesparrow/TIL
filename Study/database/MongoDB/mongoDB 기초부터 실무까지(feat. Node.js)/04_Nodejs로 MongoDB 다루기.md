[MongoDB Node Driver — Node.js](https://docs.mongodb.com/drivers/node/current/)

- Usage Examples & Fundamentals가 정리되어 있는 공식 페이지.



# Mongoose

`$ npm install mongodb` 몽고디비에서 자체 제공하는 드라이버로 Node상에서 DB를 제어할 수 있다.

강의에서는 해당 드라이버를 이용하는 `mongoose` 라이브러리를 사용한다.

```js
const mongoose = require('mongoose')
const MONGO_URI = 'mongodb+srv://admin:gyfhUCt8q8BwFjIK@mongodbtutorial.wuvui.mongodb.net/BlogService?retryWrites=true&w=majority'
mongoose.connect(MONGO_URI)
  .then(res => console.log(res))
```

- `cloud.mongodb.com`에서 `connect your application`을 눌러 code를 긁으면 되며, credential 부분과 db이름을 수정해주면 된다.

- `mongoose.connect()` 는 프로미스를 리턴하므로, 마지막 줄을 통해 연결 결과를 볼 수 있다.

  - 순차적인 서버 시작을 위해서 (DB와 연결되지 않았을 때 리퀘스트를 받기 시작하는 것을 방지하기 위해) `async`를 적용해준다

    ```js
    const server = async() => {
      let mongodbConnection = await mongoose.connect(MONGO_URI)
    
    ...
    ```

    나중에 TDD를 적용할 때에도 유용할 수 있다.



`models` 폴더 생성 후 `User.js` 모듈에 유저 데이터베이스의 스키마 || 모델 ??을 생성한다.

```js
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: {
  ...}
}, { timestamps: true })

const User = mongoose.model('user', UserSchema)
module.exports = { User }
```

- es6 export를 안 쓰고, 또 모듈을 가져올 때도 import를 쓰지 않고 require를 쓰는 것은 아마도 Nodejs의 특징인 것 같다.(확인필요)



# Get

```js
    app.get('/user', async(req, res) => {
      try {
        const users = await User.find({})
        return res.send({ users })
      } catch(err) {
        return res.status(500).send({ error: err.message })
      }
    })
```

- `User` 모델을 통해 전에 compass 터미널에서 입력했던 명령어들을 사용할 수 있음
  - `User.find({})`의 경우 배열을 리턴
    - `findOne`의 경우 객체를 리턴



# Unique Key

```js
  username: { type: String, required: true, unique: true },
```

- 강의에서는 `unique: true` 구문을 추가하여 `username`이 겹치지 않도록 처리했지만, 내 환경에서는 해당 구문의 유무에 **상관없이** `"error": "E11000 duplicate key error collection` 라는  오류를 뱉어서 같은 `username`을 가지는 데이터를 생성할 수 없었다.

  - ```js
      username: { type: String, required: true },
      dummy: { type:String, required: true },
    ```

    이런 식으로 더미를 `User.js`에 추가했을 때, `username`의 중복은 허용하지 않았지만 `dummy`의 중복은 허용되었다.![캡처](04_Nodejs로 MongoDB 다루기.assets/캡처.PNG)

    compass에서 확인해보니 `username`이 unique로 설정되어 있었기에 위와 같은 문제가 발생했던 것 같다.

    compass에서 `BlogService` DB를 삭제 후 다시 시도했을 때는, 같은 문제가 발생하지 않았다.

    몇 번 실험해본 결과, 지금 내 환경에서는 `unique` 옵션을 true로 준 후에는 해당 구문을 지우거나, false로 두더라도 compass 상에서도 `unique key`로 잡히고, 동일한 `username`을 사용하면 위의 에러를 반복하는 현상을 관찰할 수 있었다.

    `let mongodbConnection = await mongoose.connect(MONGO_URI)`
    
    - 서버가 실행되면 해당 구문에서 mongoose에 연결하는 데, 어떻게 `User` 모델의 정보를 넘기는 지는 잘 모르겠다. 너무 궁금해서 구문들을 소거해보며 검사했더니,
    
      ```js
      // @server.js
      const { User } = require('./models/User')
      // @User.js
      const User = model('user', UserSchema)
      module.exports = { User }
      ```
    
      `User.js`에서 작성된 `model()`  함수를 `server.js`에서 호출했을 때 해당 스키마가 적용되는 것으로 생각된다.
    
    [node.js - How do I change mongoose schema from unique true to unique false - Stack Overflow](https://stackoverflow.com/questions/64576294/how-do-i-change-mongoose-schema-from-unique-true-to-unique-false)를 참고해보니 index는 schema를 변경하더라도 자동으로 삭제되지 않는다는 것을 볼 수 있었다. keyword => mongoose unique false
    
    더하여, 강의에서 deprecation warning을 없애기 위해 다른 코드들을 추가했지만, [Mongoose v6.1.7: Migrating to Mongoose 6 (mongoosejs.com)](https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options) 해당 옵션들은 default로 처리되며 더 이상 지원되지 않는 코드이므로 추가하지 않았다.



# Get_specific user ID

`/user/123` 형태로 특정한 유저 ID에 대응하는 엔드포인트

```js
    app.get('/user/:userId', async(req, res) => {
      const { userId } = req.params
    })
```

- `/user/:userId` 세미콜론을 통해 query param을 지정할 수 있다.
  - `req.params` 으로 요청된 parameter가 들어오며, 구조는`{ userId: '123' }`과 같다.  `url`에 지정한 그대로 들어오므로, destructuring으로 간편하게 파라미터를 받을 수 있다.

```js
    app.get('/user/:userId', async(req, res) => {
      try {
        const { userId } = req.params
        if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ error: "Invalid User ID"});
        const user = await User.findOne({ _id: userId })
        return res.send({ user })
      } catch(err) {
        console.log(err)
        return res.status(500).send({ error: err.message })
      }
    })
```

- `mongoose.isValidObjectId()` 메서드로 유효한 ID인지 아닌지를 검사할 수 있다.



# Delete

```js
    app.delete('/user/:userId', async(req, res) => {
      try {
        const { userId } = req.params
        if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ error: "Invalid User ID"});
        const user = await User.findOneAndDelete({ _id: userId })
        return res.send({ user })
      } catch(err) {
        return res.status(500).send({ error: err.message })
      }
    })
```

- `User.findOneAndDelete()`의 경우 삭제된 user를 리턴하고, 해당 ID의 유저가 없는 경우 `null`을 리턴
  - `deleteOne()`의 경우 찾지 않고 삭제만 하며 삭제된 유저를 리턴하지 않음.



# Update

수정을 다루기 전에, `findOneAndUpdate()`와 `findByIdAndUpdate()`의 차이를 알아보자

```js
// findOneAndUpdate
        const user = await User.findOneAndUpdate({ _id: userId }, )
// findByIdAndUpdate
        const user = await User.findByIdAndUpdate(userId, )
```

실제 동작은 같으나 `findById`의 경우 `_id`를 생략할 수 있다.



```js
    app.put('/user/:userId', async(req, res) => {
      try {
        const { userId } = req.params
        if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ error: 'Invalid User ID' })
        const { age } = req.body
        if (!age) return res.status(400).send({ error: 'age is required' })
        if (typeof age !== 'number') return res.status(400).send({ error: 'age must be a number'})
        const user = await User.findByIdAndUpdate(userId, { $set: { age } }, { new: true })
        return res.send({ user })
      } catch(err) {
        return res.status(500).send({ error: err.message })
      }
    })
```

- `const user = await User.findByIdAndUpdate(userId, { $set: { age } }, { new: true })` 에서, 마지막 옵션 부분의 `new: true`를 설정해주지 않으면 업데이트 되기 전의 값이 반환된다.

- 또한 `{ $set: { age } }`를 `{ age }`로만 써도 mongoose에서 자동으로 `$set`을 붙여서 쿼리하며, mongoose 설정을 바꾸면 이를 자세히 확인할 수 있다.

  ```js
  // @server.js
  ...
      mongoose.set('debug', true)
  ```

  위의 구문을 추가하게 되면, mongoose를 통해 보내지는 쿼리들을 터미널에 출력해 준다. 

  ```
  Mongoose: users.findOneAndUpdate({ _id: new ObjectId("61eea5210985de7a7de8e886") }, { '$setOnInsert': { createdAt: new Date("Mon, 24 Jan 2022 13:21:47 GMT") }, '$set': { age: 30, updatedAt: new Date("Mon, 24 Jan 2022 13:21:47 GMT") }}, { upsert: false, remove: false, projection: {}, returnDocument: 'after', returnOriginal: false})
  ```

  한 가지 더 추가하자면 스트링으로 `userId` 값을 사용했지만, 자동으로 `ObjectId()`로 감싸준 모습도 확인할 수 있다. 맨 끝의 `returnOriginal` 옵션도 `new: true`에 맞춰 수정되었다. 

  - `new: true` 옵션을 주게 되면 업데이트 후 전체 객체를 찾는 연산도 추가된다.



```js
        const { age, name } = req.body
        if (!age && !name) return res.status(400).send({ error: 'age or name is required' })
        if (age && typeof age !== 'number') return res.status(400).send({ error: 'age must be a number'})
        if (name && typeof name.first !== 'string' && typeof name.last !== 'string') return res.status(400).send({ error: 'first and last name should be string'})
        const user = await User.findByIdAndUpdate(userId, { $set: { age, name } }, { new: true })
```

이름과 나이를 변경할 수 있도록 api를 수정 후, 강의에서는 `{"age": 30}`과 같은 형태로만 http body를 구성해서 보냈을 때 `name`이 DB상에서 `null`로 잡히는 결과가 나왔다. 이는 당연히 수신받은 body에 `name`이 없기 때문에 `null` 값이 넘어가서 DB가 수정된 것이다. 내 환경에서는 `name`이 바뀌지는 않아서 

```
{
	"age": 30,
	"name": null
}
```

형식으로 request를 보냈더니 똑같은 결과를 볼 수 있었다. 새로운 객체를 선언 후 if문을 통해 속성을 추가해 주는 식으로 해결할 수 있다. 하지만 여기서 문제가 되는 점은, 

```js
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
```

`User.js`에서는 `name`의 두 속성을 필수로 잡아줬다는 점이다. 하지만 `findOneAndUpdate()`의 경우 mongoose에서 validation 과정을 거치지 않는다. mongoDB의 validation 과정을 거치고 싶다면, `findOne()`을 통해 다큐먼트를 불러온 후, 수정 후 `save()` 메서드를 통해 저장하면 validation 과정을 거칠 수 있다. DB 호출이 두번 되는 단점과 스키마를 통한 validation이 가능한 장점이 있으므로 필요에 따라 사용할 수 있다.

```js
...
    let user = await User.findById(userId)
    if (age) user.age = age;
    if (name) user.name = name;
    await user.save()
    return res.send({ user })
```

- 이 경우 `save()` 구문 자리에서 mongoose가 원본과 수정본을 비교하여 바뀐 부분에 대해 `updateOne()`을 날림
  - `save()` 의 경우 수정본이 반환됨



# Router Refactoring

`server.js`에 api부분을 모두 긁어서 외부 모듈화 + 미들웨어 추가를 통해 `/user`로 들어오는 request를 해당 모듈로 응답

``` js
// @server.js
const { userRouter } = require('./routes/userRoute')
...
    app.use('/user', userRouter)

// @userRouter.js
const mongoose = require('mongoose')
const { User } = require('../models/User')
const { Router } = require('express')
const userRouter = Router()

userRouter.get('/', async(req, res) => {
...
})

userRouter.get('/:userId', async(req, res) => {
...
})

userRouter.post('/', async(req, res) => {
...
})

userRouter.delete('/:userId', async(req, res) => {
...
})

userRouter.put('/:userId', async(req, res) => {
...
})

module.exports = {
  userRouter
}
```

