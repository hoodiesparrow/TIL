import logo from './logo.svg';
import './App.css';


function App() {

  let posts = '구미 고기 맛집';

  return (
    <div className="App">
      <div className="black-nav">
        <div style="{ { color : 'blue', fontSize : '30px' } }">
          개발 blog
        </div>
      </div>
      <img src="{ logo }" />
      <h4> { posts } </h4>
    </div>
  );
}

export default App;
