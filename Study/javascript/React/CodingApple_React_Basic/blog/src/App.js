import './App.css';
import { useState } from 'react'

function App() {
  let [post, setPost] = useState(['자바스크립트 코드 추천', '타입스크립트 코드 추천'])
  let [likes, setLikes] = useState(0)

  function changePost () {
    const newArray = [...post]
    newArray[0] = 'JS 코드 추천'
    setPost(newArray)
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div style={ { color: 'blue', fontSize: '30px' } }>
          개발 blog
        </div>
      </div>
      <button onClick={ changePost }>제목바꾸기용</button>
      <div className="list">
        <h3>{ post[0] } <span onClick={ (()=> { setLikes(likes + 1) }) }>🥰</span>{ likes } </h3>        <p>10월 15일 발행</p>
        <hr />
        <h3>{ post[1] } <span onClick={ (()=> { setLikes(likes + 1) }) }>🥰</span>{ likes } </h3>        <p>10월 15일 발행</p>
        <hr />
      </div>
    </div>
  );
}

export default App;
