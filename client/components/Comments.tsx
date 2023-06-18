import { useQuery } from 'react-query'

interface Props {
  id: number | undefined
}

interface Comment {
  id: number
  comment: string
  name: string
}

export default function Commments({ id }: Props) {
  const { data } = useQuery('comments', () =>
    fetch(`/api/v1/birds/comments/${id}`).then((res) => res.json())
  )

  return (
    <div>
      {data?.map((comment: Comment) => (
        <div key={comment.id}>
          <p>
            <strong>{comment.name}</strong> {comment.comment}
          </p>
        </div>
      ))}
    </div>
  )
}
