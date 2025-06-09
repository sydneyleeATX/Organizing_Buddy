'use client';

import { useRouter } from 'next/router';

export default function Menu() {
  const router = useRouter();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Project Menu</h1>

      <button style={styles.button} onClick={() => router.push('/zone')}>
        Start New Project
      </button>

      <button style={styles.button} onClick={() => router.push('/progressProjects')}>
        Continue Existing Project
      </button>

      <button style={styles.button} onClick={() => router.push('/pastProjects')}>
        Completed Projects
      </button>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    gap: '1rem',
  },
  title: {
    marginBottom: '2rem',
    fontSize: '2rem',
    color: '#333',
  },
  button: {
    padding: '1rem 2rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    transition: 'background-color 0.2s',
  },
};
