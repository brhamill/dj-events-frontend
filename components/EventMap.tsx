import Image from 'next/image'
import { useState, useEffect } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import GeoCode from 'react-geocode'

export const EventMap: any = ({ evt }: any) => {
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [loading, setLoading] = useState(true)
  const [viewport, setViewport] = useState({
    latitude: 40.712772,
    longitude: -73.935242,
    width: '100%',
    height: '500px',
    zoom: 12,
  })

  useEffect(() => {
    // Get latitude  & longitude from address.
    GeoCode.fromAddress(evt.address).then((response) => {
      const { lat, lng } = response.results[0].geometry.location
      setLat(lat)
      setLng(lng)
      setViewport({ ...viewport, latitude: lat, longitude: lng })
      setLoading(false)
    }),
      (error: any) => {
        console.error(error)
      }
  }, [])

  GeoCode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!)

  if (loading) return false

  console.log(lat, lng)

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onViewportChange={(vp: any) => setViewport(vp)}
    >
      <Marker key={evt.id} latitude={lat ?? 0} longitude={lng ?? 0}>
        <Image src='/images/pin.svg' width={30} height={30} />
      </Marker>
    </ReactMapGL>
  )
}
