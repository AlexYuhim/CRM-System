import "@/App.css";
import { TodoBoardPages } from "@/pages/TodoBoardPages/TodoBoardPages";

function App() {
  return (
    <>
      <h1 className="tile_main">CRM-System</h1>
      <div className="app_wr">
        <TodoBoardPages />
      </div>
    </>
  );
}

export default App;
