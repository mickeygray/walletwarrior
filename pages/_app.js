  
import './globals.css'
import { AppWrapper } from '../contexts/state.js'; // import based on where you put it

export default function Application({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}
