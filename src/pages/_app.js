import '@/styles/globals.css'
import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from "../redux/store"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}
