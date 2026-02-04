import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  async function handleLogout() {
  try {
    await logoutUser();
    setOpen(false);
    navigate("/");
  } catch (err) {
    console.error("Logout failed:", err);
  }
}

  return (

// begin header content

    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link to="/" style={styles.logo}>
          codejacket.io
        </Link>

        {/* Hamburger button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={styles.hamburger}
        >
          ☰
        </button>
      </nav>

      {/* Dropdown menu */}
      <div
        style={{
          ...styles.menu,
          ...(open ? styles.menuOpen : styles.menuClosed),
        }}
        >
          <Link
            to="/dashboard"
            style={styles.menuLink}
            onMouseEnter={(e) =>
          Object.assign(e.currentTarget.style, styles.menuLinkHover)
      }
            onMouseLeave={(e) =>
          Object.assign(e.currentTarget.style, styles.menuLink)
      }
            onFocus={(e) =>
          Object.assign(e.currentTarget.style, styles.menuLinkHover)
      }
            onBlur={(e) =>
          Object.assign(e.currentTarget.style, styles.menuLink)
      }
            onClick={() => setOpen(false)}
      >
        Dashboard
          </Link>

          <Link 
            to="/signup" 
            style={styles.menuLink}
            onMouseEnter={(e) =>
          Object.assign(e.currentTarget.style, styles.menuLinkHover)
      }
            onMouseLeave={(e) =>
          Object.assign(e.currentTarget.style, styles.menuLink)
      }
            onFocus={(e) =>
          Object.assign(e.currentTarget.style, styles.menuLinkHover)
      }
            onBlur={(e) =>
          Object.assign(e.currentTarget.style, styles.menuLink)
      }
            onClick={() => setOpen(false)}
      >
        Create Account
          </Link>
          
          <Link
  to="/resources"
  style={styles.menuLink}
  onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.menuLinkHover)}
  onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.menuLink)}
  onFocus={(e) => Object.assign(e.currentTarget.style, styles.menuLinkHover)}
  onBlur={(e) => Object.assign(e.currentTarget.style, styles.menuLink)}
  onClick={() => setOpen(false)}
>
  What is Linux?
</Link> 

{/* ... logout link removed ...

<Link
    to="/"
  style={styles.menuLink}
  onClick={async (e) => {
    e.preventDefault(); // stop immediate navigation

    try {
      await handleLogout(); // clears cookie/session
      navigate("/", { state: { loggedOut: true } });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setOpen(false);
    }
  }}
  onMouseEnter={(e) =>
    Object.assign(e.currentTarget.style, styles.menuLinkHover)
  }
  onMouseLeave={(e) =>
    Object.assign(e.currentTarget.style, styles.menuLink)
  }
  onFocus={(e) =>
    Object.assign(e.currentTarget.style, styles.menuLinkHover)
  }
  onBlur={(e) =>
    Object.assign(e.currentTarget.style, styles.menuLink)
  }
>
  Log out
</Link>
*/}

        </div>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    fontFamily: "Menlo",
    width: "100%",
    padding: "0.65rem 1.75rem",
    backgroundColor: "#161616",
    borderBottom: "1px solid #2A2A2A",
    position: "relative",
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#FFD700",
  },

  hamburger: {
    fontSize: "1.5rem",
    background: "transparent",
    border: "none",
    color: "#EAEAEA",
    cursor: "pointer",
  },

  menu: {
  position: "absolute",
  right: "1.5rem",
  top: "3.25rem",
  backgroundColor: "#1C1C1C",
  border: "1px solid #2A2A2A",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  minWidth: "180px",
  padding: "0.5rem 0",
  zIndex: 100,

  /* Fade + slide */
  transition: "opacity 180ms ease, transform 180ms ease",
  transformOrigin: "top right",
},

menuOpen: {
  opacity: 1,
  transform: "translateY(0)",
  pointerEvents: "auto",
},

menuClosed: {
  opacity: 0,
  transform: "translateY(-6px)",
  pointerEvents: "none",
},

  menuLink: {
  padding: "0.75rem 1.25rem",
  color: "#EAEAEA",
  textDecoration: "none",
  fontSize: "0.95rem",

  display: "flex",
  alignItems: "center",
  gap: "0.5rem",

  borderLeft: "2px solid transparent",

  transition:
    "background-color 120ms ease, color 120ms ease, transform 120ms ease, border-color 120ms ease",
},

menuLinkHover: {
  backgroundColor: "#242424",
  color: "#FFD700",
  borderLeft: "2px solid #FFD700",
  transform: "translateX(2px)",
},

};

