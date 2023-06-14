import { useQuery } from 'react-query'

interface Props {
  id: number | undefined
}

interface Comment {
  id: number
  comment: string
}

export default function Commments({ id }: Props) {
  const { data } = useQuery('comments', () =>
    fetch(`/api/v1/birds/comments/${id}`).then((res) => res.json())
  )

  console.log(data, id)

  return (
    <div>
      {data?.map((comment: Comment) => (
        <p key={comment.id}>{comment.comment}</p>
      ))}
    </div>
  )
}
