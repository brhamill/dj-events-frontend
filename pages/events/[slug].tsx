import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { Layout } from '@/components/Layout'
import { EventMap } from '@/components/EventMap'
import { API_URL } from '@/config/index'
import { IEvent } from '@/interfaces/IEvent'
import React, { FunctionComponent } from 'react'

import styles from '@/styles/Event.module.css'
import { useRouter } from 'next/router'

type Props = {
  evt: IEvent
}

const EventPage: FunctionComponent<Props> = ({ evt }) => {
  const router = useRouter()

  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <ToastContainer />
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <EventMap evt={evt} />

        <Link href='/events'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  )
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/events`)
//   const events = await res.json()

//   const paths = events.map((evt: IEvent) => ({
//     params: { slug: evt.slug },
//   }))

//   return {
//     paths,
//     fallback: true,
//   }
// }

// type Params = {
//   params: {
//     slug: string
//   }
// }

// export async function getStaticProps({ params: { slug } }: Params) {
//   const res = await fetch(`${API_URL}/events?slug=${slug}`)

//   const events = await res.json()

//   return {
//     props: { evt: events[0] },
//     revalidate: 1,
//   }
// }

export async function getServerSideProps({ query: { slug } }: any) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`)

  const events = await res.json()

  return {
    props: { evt: events[0] },
  }
}

export default EventPage
