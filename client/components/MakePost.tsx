import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Post } from '../../models/Birds'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'

export default function MakePost() {
  const { user } = useAuth0()

  const [post, setPost] = useState({ name } as Post)
  const [cursor, setCursor] = useState('not-allowed')
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const {
    value,
    suggestions: { data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: ['nz'] },
    },
  })

  useEffect(() => {
    setPost({ authId: user?.sub, name: user?.nickname })
  }, [user?.nickname, user?.sub])

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
      return { ...oldPost, description }
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
    if (Object.getOwnPropertyNames(post).length >= 6) {
      newPost.mutate(post)
      navigate('/view')
    }
  }

  function handleCursor() {
    if (Object.getOwnPropertyNames(post).length >= 6) {
      setCursor(() => '')
    }
  }

  function handleAddress(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  function handleSelect({ description }: any) {
    setValue(description, false)

    clearSuggestions()

    getGeocode({ address: description })
      .then((res) => {
        const { lat, lng } = getLatLng(res[0])
        setPost((oldPost) => {
          return { ...oldPost, lat, lng }
        })
      })
      .catch(() => Error)
  }

  return (
    <section>
      <form>
        <label htmlFor="user">Change your username:</label>
        <input
          type="text"
          id="user"
          placeholder={user?.nickname || 'eg. EagleTheEgirl'}
          onChange={handleUser}
        />
        <label htmlFor="address">Enter the Address of the Photo:</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="123 Example Road"
          value={value}
          onChange={handleAddress}
        />
        {data.map((suggestion) => {
          const {
            place_id,
            structured_formatting: { main_text, secondary_text },
          } = suggestion

          return (
            <li key={place_id} onClick={() => handleSelect(suggestion)}>
              <strong>{main_text}</strong> <small>{secondary_text}</small>
            </li>
          )
        })}
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
