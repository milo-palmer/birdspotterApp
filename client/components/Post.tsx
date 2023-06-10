import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'

export default function Post() {
  const { id } = useParams()
  const { user } = useAuth0()

  const { data } = useQuery(`bird${id}`, () =>
    fetch(`/api/v1/birds/${id}`).then((res) => res.json())
  )

  return (
    <section>
      <h2>{data?.name}</h2>
      <img src={data?.image} alt="" className="img-fit-to-div" />
      <p>{data?.description}</p>
      {user?.sub == data?.authId && (
        <Link to={`manage`} className="Link-btn">
          Manage
        </Link>
      )}
    </section>
  )
}
