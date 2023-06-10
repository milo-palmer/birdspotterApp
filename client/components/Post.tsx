import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import GoogleMapReact from 'google-map-react'

interface Props {
  name: string
  image: string
  lat: number
  lng: number
}

function Marker(props: Props) {
  return (
    <div
      className="onhover"
      style={{
        border: '2px solid rgba(251, 146, 60)',
        width: 'fit-content',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        transform: 'translateY(-100%)',
      }}
    >
      <p>{props.name}</p>
      <img src={props.image} alt="" className="img-hover" />
    </div>
  )
}

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
      <div style={{ width: '100%', height: '500px' }}>
        {process.env.REACT_APP_API_KEY && (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_API_KEY,
              language: 'en',
            }}
            defaultCenter={{ lat: -36.857703, lng: 174.761052 }}
            defaultZoom={12}
          >
            <Marker
              name={data?.name}
              lat={-36.8589}
              lng={174.7755}
              image={data?.image}
            />
          </GoogleMapReact>
        )}
      </div>
    </section>
  )
}
