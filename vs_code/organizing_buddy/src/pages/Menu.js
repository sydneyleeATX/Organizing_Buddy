import { useNavigate } from "react-router-dom";

// Defines Menu buttons' path after click
export default function Menu() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Project Menu</h1>
      
      <button style={styles.button} onClick={() => navigate("/empty")}>
        Start New Project
      </button>
      
      <button style={styles.button}>
        Continue Existing Project
      </button>
      
      <button style={styles.button}>
        Completed Projects
      </button>
    </div>
  );
}

// Inline styles for buttons
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
    gap: "1rem",
  },
  title: {
    marginBottom: "2rem",
    fontSize: "2rem",
    color: "#333",
  },
  button: {
    padding: "1rem 2rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    width: "250px",
    transition: "background-color 0.2s",
  },
};