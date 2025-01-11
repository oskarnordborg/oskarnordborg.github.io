import "./App.css";
import Navbar from "./components/Navbar";
import Startpage from "./components/Startpage";
import BoardMembers from "./components/BoardMembers";
import Information from "./components/Information";
import SignUp from "./components/SignUp";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message state
  const [siteData, setSiteData] = useState([]);
  const sheetUrl = process.env.REACT_APP_INFO_SHEET_URL;

  const PASSWORD = process.env.REACT_APP_REPORT_PASSWORD;
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

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const response = await axios.get(sheetUrl);
          const dataDict = response.data.split("\r\n").reduce((acc, row) => {
            const [level, key, value] = row.split(",");
            if (!acc[level]) {
              acc[level] = {};
            }
            acc[level][key] = value;
            return acc;
          }, {});
          setSiteData(dataDict);
        } catch (error) {
          console.error("Error fetching Google Sheets data:", error);
        }
      };

      fetchData();
    }
  }, [isAuthenticated]); // Fetch data only when authenticated

  const handleLogin = () => {
    if (passwordInput === PASSWORD) {
      document.cookie = `${COOKIE_NAME}=true; path=/; max-age=86400`;
      setIsAuthenticated(true);
    } else {
      showSnackbar("Nehe du, det var fel!");
    }
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
      <main>
        <section id="startpage">
          <Startpage />
        </section>
        <section id="information">
          <Information pageData={siteData.info} />
        </section>
        <section id="boardmembers">
          <BoardMembers pageData={siteData.board} />
        </section>
        <section id="signup">
          <SignUp />
        </section>
      </main>
    </div>
  );
}

export default App;
