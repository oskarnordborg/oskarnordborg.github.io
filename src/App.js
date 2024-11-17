import "./App.css";
import Countdown from "./components/Countdown";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Countdown />
        <h1>
          Save the date <br />
          Helårsrapporten <br />
          10e maj 2025
        </h1>
      </header>
    </div>
  );
}

export default App;
