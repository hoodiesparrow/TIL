console.log('client code running');
const axios = require('axios')
const URI = 'http://localhost:3000'

const test = async() => {
  console.time('loading time: ')
  let { data: { blogs }} = await axios.get(`${URI}/blog`)
  console.log(blogs)
  // console.log(blogs.length, blogs[0])

  // blogs = await Promise.all(blogs.map(async blog => {
  //   const [res1, res2] = await Promise.all([
  //     axios.get(`${URI}/user/${blog.user}`), 
  //     axios.get(`${URI}/blog/${blog._id}/comment`),
  //   ])
  //   blog.user = res1.data.user
  //   blog.comments = await Promise.all(res2.data.comments.map(async comment => {
  //     const { data: { user } } = await axios.get(`${URI}/user/${comment.user}`)
  //     comment.user = user
  //     return comment
  //   }))
  //   return blog
  // }))
  console.timeEnd('loading time: ')
}

// test()

const testGroup = async () => {
  for (let i = 0; i < 5; i++) {
    await test()
  }
}
testGroup()