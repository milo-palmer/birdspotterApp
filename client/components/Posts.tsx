import { useQuery } from 'react-query'
import { BirdDb } from '../../models/Birds'

export default function Posts() {
  const { data } = useQuery('posts', () => {
    return fetch('/api/v1/birds').then((res) => res.json())
  })
  console.log(data)
  return (
    <section>
      <h2>Recent Spottings</h2>
      <div className="card-container">
        {data?.map((post: BirdDb) => (
          <div key={post.id} className="post-card">
            <img src={post.image} alt="Bird Spotting" className="post-img" />
            <div className="post-text">
              <p>{post.name}</p>
              <p>{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
