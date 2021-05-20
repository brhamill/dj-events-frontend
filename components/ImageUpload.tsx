import { ChangeEvent, FormEvent, useState } from 'react'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import { FunctionComponent } from 'react'

type Props = {
  evtId: number
  imageUploaded: any
  token: string
}

export const ImageUpload: FunctionComponent<Props> = ({
  evtId,
  imageUploaded,
  token,
}) => {
  const [image, setImage] = useState<File>()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('files', image as Blob)
    formData.append('ref', 'events')
    formData.append('refId', evtId.toString())
    formData.append('field', 'image')

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (res.ok) {
      imageUploaded()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files![0])
  }

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange} />
        </div>
        <input type='submit' value='Upload' className='btn' />
      </form>
    </div>
  )
}
