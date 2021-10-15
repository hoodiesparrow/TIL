import './App.css';
import { useState } from 'react'

function App() {
  let [post, setPost] = useState('자바스크립트 코드 추천')

  return (
    <div className="App">
      <div className="black-nav">
        <div style="{ { color : 'blue', fontSize : '30px' } }">
          개발 blog
        </div>
      </div>
      <div className="list">
        <h3>{ post }</h3>
        <p>10월 15일 발행</p>
        <hr />
      </div>
    </div>
  );
}

export default App;
