import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import Introduction from './pages/Introduction'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Introduction />
      </div>
    </Router>
  )
}

export default App
