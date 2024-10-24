import { useEffect, useState } from 'react';
import Layout from "@/components/layout/layout";
import { AuthContextProvider } from "@/store/auth-context";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('isDarkMode');
    if (storedTheme !== null) {
      setIsDarkMode(JSON.parse(storedTheme));
    } else {
      const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDarkScheme);
    }
  }, []);

 
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('isDarkMode', newDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.style.setProperty('--background', '#0a0a0a');
      document.documentElement.style.setProperty('--foreground', '#ffffff');
    } else {
      document.documentElement.style.setProperty('--background', '#ffffff');
      document.documentElement.style.setProperty('--foreground', '#171717');
    }
  }, [isDarkMode]);

  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
        <button onClick={toggleDarkMode} style={{ margin: '20px', padding: '10px' }}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </Layout>
    </AuthContextProvider>
  );
}
