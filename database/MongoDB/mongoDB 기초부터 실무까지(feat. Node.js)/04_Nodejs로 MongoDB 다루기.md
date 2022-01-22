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
  username: {type: String, required: true},
  name: {
  ...}
}, {timestamps: true})

const User = mongoose.model('user', UserSchema)
module.exports = { User }
```

- es6 export를 안 쓰고, 또 모듈을 가져올 때도 import를 쓰지 않고 require를 쓰는 것은 아마도 Nodejs의 특징인 것 같다.(확인필요)

