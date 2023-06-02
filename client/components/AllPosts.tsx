import { useQuery } from 'react-query'
import { BirdDb } from '../../models/Birds'
import { Link } from 'react-router-dom'

export default function AllPosts() {
  const { data } = useQuery('posts', () =>
    fetch('api/v1/birds/').then((res) => res.json())
  )

  return (
    <section>
      <h2>All Posts</h2>
      <div className="card-container">
        {data?.map((post: BirdDb) => (
          <Link to={`/view/${post.id}`} key={post.id} className="post-card">
            <img src={post.image} alt="Bird Spotting" className="post-img" />
            <div className="post-text">
              <h3>{post.name}</h3>
              <p>{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
