import { Route, Routes } from 'react-router-dom'

import Nav from './Nav'
import Root from './Root'
import AllPosts from './AllPosts'
import MakePost from './MakePost'
import Post from './Post'
import ManagePost from './ManagePost'

function App() {
  return (
    <>
      <div className="app">
        <Nav />
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/view" element={<AllPosts />} />
          <Route path="/view/:id" element={<Post />} />
          <Route path="/view/:id/manage" element={<ManagePost />} />
          <Route path="/post" element={<MakePost />} />
        </Routes>
      </div>
    </>
  )
}

export default App
