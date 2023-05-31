import { Route, Routes } from 'react-router-dom'

import Nav from './Nav'
import Root from './Root'

function App() {
  return (
    <>
      <div className="app">
        <Nav />
        <Routes>
          <Route path="/" element={<Root />} />
        </Routes>
      </div>
    </>
  )
}

export default App
