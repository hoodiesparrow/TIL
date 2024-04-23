import './App.css';
import ReducerTutorial from './Reducer/ReducerTutorial'

function App() {
  const [state, dispatch] = ReducerTutorial()

  return (
    <div className="App">
      { state.count }
      {/* <button onClick={() => dispatch({ type: 'add', value: state })}>
        add
      </button> */}
      <button onClick={() => dispatch('add')}>
        add
      </button>
    </div>
  );
}

export default App;
