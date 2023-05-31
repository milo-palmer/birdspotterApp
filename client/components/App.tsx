import { Route, Routes } from 'react-router-dom'

import Nav from './Nav'
import Root from './Root'
import AllPosts from './AllPosts'
import MakePost from './MakePost'

function App() {
  return (
    <>
      <div className="app">
        <Nav />
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/view" element={<AllPosts />} />
          <Route path="/post" element={<MakePost />} />
        </Routes>
      </div>
    </>
  )
}

export default App
