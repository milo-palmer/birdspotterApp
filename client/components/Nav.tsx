import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

export default function Nav() {
  const { logout, loginWithRedirect } = useAuth0()

  const handleSignOut = () => {
    logout()
  }

  const handleSignIn = () => {
    loginWithRedirect()
  }

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
      <IfAuthenticated>
        <button onClick={handleSignOut}>Sign Out</button>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <button onClick={handleSignIn}>Sign In</button>
      </IfNotAuthenticated>
    </nav>
  )
}
