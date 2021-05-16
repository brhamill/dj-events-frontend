import { Layout } from '@/components/Layout'
import { API_URL } from '@/config/index'
import { FunctionComponent } from 'react'

type Props = {
  events: [
    {
      id: number
      name: string
      slug: string
      venue: string
      address: string
      performers: string
      date: string
      time: string
      description: string
      image: string
    }
  ]
}

export const Home: FunctionComponent<Props> = ({ events }) => {
  console.log(events)
  return (
    <Layout>
      <h1>Upcoming Events</h1>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  return {
    props: { events },
    revalidate: 1,
  }
}
