import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

export default function Home() {
  const { isAuthenticated, loginWithRedirect } = useAuth0()

  return (
    <section>
      <div className="hero-sec">
        <div>
          <h1>Found a Bird?</h1>
          <p>Share it with our community</p>
          {isAuthenticated ? (
            <Link to={'/post'} className="Link-btn">
              Get Started
            </Link>
          ) : (
            <button onClick={() => loginWithRedirect()}>Sign up</button>
          )}
        </div>
        <img
          className="hero-img"
          src="/images/Kiwi-background.jpeg"
          alt="Kiwi Bird Looking to the left"
        />
      </div>
    </section>
  )
}
