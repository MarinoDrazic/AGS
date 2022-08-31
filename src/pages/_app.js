import "../styles/globals.css";
import { firestore, auth } from "../config/firebase";
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
