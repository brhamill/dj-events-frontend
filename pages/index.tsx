import Link from 'next/link'
import { Layout } from '@/components/Layout'
import { API_URL } from '@/config/index'
import { FunctionComponent } from 'react'
import { IEvent } from '@/interfaces/IEvent'
import { EventItem } from '@/components/EventItem'

type Props = {
  events: Array<IEvent>
}

const Home: FunctionComponent<Props> = ({ events }) => {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>View All Events</a>
        </Link>
      )}
    </Layout>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`)
  const events = await res.json()

  return {
    props: { events },
    revalidate: 1,
  }
}

export default Home
