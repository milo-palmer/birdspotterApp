import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export default function Post() {
  const { id } = useParams()

  const { data } = useQuery(`bird${id}`, () =>
    fetch(`/api/v1/birds/${id}`).then((res) => res.json())
  )

  return (
    <section>
      <h2>{data?.name}</h2>
      <img src={data?.image} alt="" />
      <p>{data?.description}</p>
    </section>
  )
}
