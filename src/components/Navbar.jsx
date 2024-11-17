import React, { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 } // Adjust threshold to define when a section is considered "active"
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false); // Close menu after clicking a link
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <button
        className={`main-nav home-nav`}
        onClick={() => handleScroll("startpage")}
      >
        Helårsrapporten
      </button>
      <button className="burger-menu" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <li>
          <button
            className={`section-nav ${
              activeSection === "information" ? "active" : ""
            }`}
            onClick={() => handleScroll("information")}
          >
            Information
          </button>
        </li>
        <li>
          <button
            className={`section-nav ${
              activeSection === "boardmembers" ? "active" : ""
            }`}
            onClick={() => handleScroll("boardmembers")}
          >
            Styrelsen
          </button>
        </li>
        <li>
          <button
            className={`section-nav ${
              activeSection === "signup" ? "active" : ""
            }`}
            onClick={() => handleScroll("signup")}
          >
            Anmälan
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
