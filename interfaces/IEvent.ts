export interface IEvent {
  id: number
  name: string
  slug: string
  venue: string
  address: string
  performers: string
  date: string
  time: string
  description: string
  image: {
    formats: {
      medium: {
        url: string
      }
      thumbnail: {
        url: string
      }
    }
  }
}
