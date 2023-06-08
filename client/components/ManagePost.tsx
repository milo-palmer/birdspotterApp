import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

export default function ManagePost() {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data } = useQuery(`bird${id}`, () =>
    fetch(`/api/v1/birds/${id}`).then((res) => res.json())
  )

  const deletePost = useMutation('posts', {
    mutationFn: (id: { id: number }) => {
      return fetch('/api/v1/birds/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  function handleDelete() {
    if (id) deletePost.mutate({ id: +id })
    navigate('/view')
  }

  return (
    <section>
      <h2>Manage Post</h2>
      <h2>{data?.name}</h2>
      <p>{data?.description}</p>
      <button onClick={handleDelete}>Delete Post</button>
    </section>
  )
}
