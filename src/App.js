import "./App.css";
import Navbar from "./components/Navbar";
import Startpage from "./components/Startpage";
import BoardMembers from "./components/BoardMembers";
import Information from "./components/Information";
import SignUp from "./components/SignUp";
import React, { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message state

  const PASSWORD = process.env.REACT_APP_SITE_PASSWORD;
  console.log("Test");
  console.log(PASSWORD);
  const COOKIE_NAME = "authenticated";

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const authCookie = cookies.find((cookie) =>
      cookie.trim().startsWith(`${COOKIE_NAME}=`)
    );
    if (authCookie && authCookie.split("=")[1] === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (passwordInput === PASSWORD) {
      document.cookie = `${COOKIE_NAME}=true; path=/; max-age=86400`;
      setIsAuthenticated(true);
    } else {
      showSnackbar("Nehe du, det var fel!");
    }
  };

  const handleLogout = () => {
    document.cookie = `${COOKIE_NAME}=false; path=/; max-age=0`;
    setIsAuthenticated(false);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setTimeout(() => {
      setSnackbarMessage("");
    }, 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-heading">Hemligt lösen</h2>
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <input
              type="password"
              placeholder="Lösenord"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="login-input"
            />
            <button type="submit" className="login-button">
              Logga in
            </button>
          </form>
        </div>
        {snackbarMessage && <div className="snackbar">{snackbarMessage}</div>}
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
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
