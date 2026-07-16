import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
// import StarRaiting from './StarRaiting.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <StarRaiting maxRating={5} color="red"/>
    <StarRaiting maxRating={10} />
    <StarRaiting size={64}/> */}
  </StrictMode>
)
