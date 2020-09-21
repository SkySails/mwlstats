import "../styles/globals.scss";
import ThemeProvider from "@Context/ThemeContext";
import { AuthProvider } from "@Context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
