import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav>
      <Link to={'/'}>
        <img
          src="/images/Kiwi-sleeping.avif"
          alt="Cartoon Kiwi sleeping"
          style={{ width: '100px', height: '100px' }}
        />
      </Link>
      <ul>
        <Link to={'/view'} className="Link">
          <li>Posts</li>
        </Link>
        <Link to={'/post'} className="Link">
          <li>Make a Post</li>
        </Link>
      </ul>
    </nav>
  )
}
