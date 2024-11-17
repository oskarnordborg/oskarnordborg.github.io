import "./App.css";
import Navbar from "./components/Navbar";
import Startpage from "./components/Startpage";
import BoardMembers from "./components/BoardMembers";
import Information from "./components/Information";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <section id="startpage">
          <Startpage />
        </section>
        <section id="information">
          <Information />
        </section>
        <section id="boardmembers">
          <BoardMembers />
        </section>
        <section id="signup">
          <SignUp />
        </section>
      </main>
    </div>
  );
}

export default App;
