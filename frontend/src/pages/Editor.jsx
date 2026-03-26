import { useEffect, useState } from 'react'
import Editor from '../components/Editor'
import RoomStatus from '../components/RoomStatus'

export default function EditorPage() {
  const [roomId, setRoomId] = useState(null)
  const [userId, setUserId] = useState(null)
  const [status, setStatus] = useState('connecting')

  useEffect(() => {
    const join = async () => {
      const res = await fetch('http://localhost:3001/join', {
        method: 'POST',
      })
      const data = await res.json()

      setRoomId(data.roomId)
      setUserId(data.userId)
      setStatus(data.status)
    }

    join()
  }, [])

  if (!roomId) return <div>Joining room...</div>

  return (
    <div>
      <RoomStatus status={status} roomId={roomId} />
      <Editor roomId={roomId} userId={userId} />
    </div>
  )
}