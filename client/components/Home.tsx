import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section>
      <div className="hero-sec">
        <div>
          <h1>Found a Bird?</h1>
          <p>Share it with our community</p>
          <Link to={'/post'} className="Link-btn">
            Get Started
          </Link>
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
