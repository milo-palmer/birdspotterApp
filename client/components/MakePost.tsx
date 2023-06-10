import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Post } from '../../models/Birds'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

export default function MakePost() {
  const { user } = useAuth0()

  const [post, setPost] = useState({} as Post)
  const [cursor, setCursor] = useState('not-allowed')
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const newPost = useMutation('posts', {
    mutationFn: (newPost: Post) => {
      return fetch('/api/v1/birds/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  function handleUser(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value

    setPost((oldPost) => {
      return { ...oldPost, name }
    })
  }

  function handleDesc(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const description = e.target.value

    setPost((oldPost) => {
      return { ...oldPost, description, authId: user?.sub }
    })
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return null
    }
    const file = e.target.files[0]

    // Encode the file using the FileReader API
    const reader = new FileReader()
    reader.onloadend = () => {
      setPost((oldPost) => {
        return { ...oldPost, image: reader.result }
      })
    }
    reader.readAsDataURL(file)
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (Object.getOwnPropertyNames(post).length >= 4) {
      newPost.mutate(post)
      navigate('/view')
    }
  }

  function handleCursor() {
    if (Object.getOwnPropertyNames(post).length >= 3) {
      setCursor(() => '')
    }
  }

  return (
    <section>
      <form>
        <label htmlFor="user">Enter your username: </label>
        <input
          type="text"
          id="user"
          placeholder={user?.nickname || 'eg. EagleTheEgirl'}
          onChange={handleUser}
        />
        <label htmlFor="desc">Write a description: </label>
        <textarea
          id="desc"
          placeholder="Kiwi perching on egg"
          onChange={handleDesc}
        />
        <label htmlFor="picture">Share your bird spotting picture</label>
        <input type="file" name="picture" id="picture" onChange={handleFile} />
        <div>
          <button
            type="submit"
            onClick={handleSubmit}
            onMouseEnter={handleCursor}
            style={{ marginTop: '20px', cursor }}
          >
            Make Post
          </button>
        </div>
      </form>
    </section>
  )
}
