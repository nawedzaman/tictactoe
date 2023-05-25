import "./App.css";
import Board from "./Board";
let myArray = new Array(9).fill(null);
function App() {
  return (
    <div className="App">
      <Board values={myArray} />
    </div>
  );
}
export default App;
