import './App.css';
import { ComponentTodoBoard } from './components/ComponentTodoBoard/ComponentTodoBoard';

function App() {
  return (
    <>
      <h1 className='tile_main'>CRM-System</h1>
      <div className='app_wr'>
        <ComponentTodoBoard />
      </div>
    </>
  );
}

export default App;
