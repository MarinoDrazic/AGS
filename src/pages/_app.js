import "../styles/globals.css";
import { firestore, auth } from "../config/firebase";
import { store } from "../features/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
