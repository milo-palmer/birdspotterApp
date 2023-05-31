import { Route, Routes } from 'react-router-dom'

import Nav from './Nav'
import Root from './Root'
import AllPosts from './AllPosts'

function App() {
  return (
    <>
      <div className="app">
        <Nav />
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/view" element={<AllPosts />} />
        </Routes>
      </div>
    </>
  )
}

export default App
