import './App.css';
import { v4 as uuidv4 } from 'uuid';
import ChatComponent from './ChatComponent';

function App() {
  return (
    <div id={uuidv4()} className="App">
      <ChatComponent name="Paradox" />
    </div>
  );
}

export default App;
