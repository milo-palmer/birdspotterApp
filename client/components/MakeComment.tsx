import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

interface Props {
  id: number | undefined
}

interface CommentWithPostId {
  postId?: number
  comment?: string
  name?: string
}

export default function MakeComment({ id }: Props) {
  const { user } = useAuth0()
  const queryClient = useQueryClient()
  const [comment, setComment] = useState({})
  const [input, setInput] = useState('')

  useEffect(() => {
    setComment({ postId: id, name: user?.nickname })
  }, [user?.nickname, id])

  const newComment = useMutation('posts', {
    mutationFn: (comment: CommentWithPostId | undefined) => {
      return fetch(`/api/v1/birds/comments/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(() => e.target.value)

    setComment((oldComment) => {
      return { ...oldComment, comment: input }
    })
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (input) {
      newComment.mutate(comment)
      setComment((oldComment) => {
        return { ...oldComment, comment: '' }
      })
      setInput(() => '')
    }
  }

  return (
    <form>
      <label htmlFor="comment">Write a Comment</label>
      <input
        type="text"
        id="comment"
        name="comment"
        value={input}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Make Comment</button>
    </form>
  )
}
