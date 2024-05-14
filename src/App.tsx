import Canvas from './Canvas';
import Prediction from './Prediction';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h1>Drawing Recognition Web UI</h1>
      <p>Draw a digit on the canvas on the left, and watch the right panel for an AI prediction of what you are drawing.</p>
      <p>When you finish, select "Correct" or "Incorrect" to help train the AI.</p>
      <div className='Container'>
        <Canvas className='Canvas' />
        <Prediction className='Prediction' />
      </div>
    </div>
  );
}

export default App;