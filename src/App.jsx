import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import Introduction from './pages/Introduction'
import './App.css'

function App() {
  return (
    <Router>
        <Introduction />
    </Router>
  )
}

export default App
