import { Layout } from '@/components/Layout'
import { API_URL, PER_PAGE } from '@/config/index'
import { FunctionComponent } from 'react'
import { IEvent } from '@/interfaces/IEvent'
import { EventItem } from '@/components/EventItem'
import { Pagination } from '@/components/Pagination'

type Props = {
  events: Array<IEvent>
  page: number
  total: number
}

const EventsPage: FunctionComponent<Props> = ({ events, page, total }) => {
  const lastPage = Math.ceil(total / PER_PAGE)

  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  )
}

export const getServerSideProps = async ({ query: { page = 1 } }) => {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`)
  const total = await totalRes.json()

  // Fetch events
  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  )
  const events = await eventRes.json()

  return {
    props: { events, page: +page, total },
  }
}

export default EventsPage
