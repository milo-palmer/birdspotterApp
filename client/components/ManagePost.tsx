import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { PostWithID } from '../../models/Birds'
import { useAuth0 } from '@auth0/auth0-react'

export default function ManagePost() {
  const { id } = useParams()
  const { user } = useAuth0()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data } = useQuery(`bird${id}`, () =>
    fetch(`/api/v1/birds/${id}`).then((res) => res.json())
  )

  const [description, setDescription] = useState(data?.description)
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

  const newPost = useMutation('posts', {
    mutationFn: (newPost: PostWithID) => {
      return fetch('/api/v1/birds/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      })
    },
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries([`bird${id}`]),
        queryClient.invalidateQueries(['posts']),
      ]),
  })

  function handleDelete() {
    if (id) deletePost.mutate({ id: +id })
    navigate('/view')
  }

  function handleDesc(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(() => e.target.value)
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    //Last security check just incase
    if (data?.authId == user?.sub && id) {
      newPost.mutate({ id: +id, description })
    }
    navigate(`/view/${id}`)
  }

  return (
    <section>
      <h2>Manage Post</h2>
      <form>
        <label htmlFor="desc">Write a description: </label>
        <textarea
          id="desc"
          placeholder="Kiwi perching on egg"
          value={description}
          onChange={handleDesc}
        />
        <div>
          <button
            type="submit"
            onClick={handleSubmit}
            style={{ marginTop: '20px', marginBottom: '20px' }}
          >
            Submit Changes
          </button>
        </div>
      </form>
      <button onClick={handleDelete}>Delete Post</button>
    </section>
  )
}
