import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export default function ManagePost() {
  const { id } = useParams()

  const { data } = useQuery(`bird${id}`, () =>
    fetch(`/api/v1/birds/${id}`).then((res) => res.json())
  )

  return (
    <section>
      <h2>Manage Post</h2>
      <h2>{data?.name}</h2>
      <p>{data?.description}</p>
    </section>
  )
}
