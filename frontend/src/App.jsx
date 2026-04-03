import { useEffect, useRef, useState } from 'react'
import { joinMatch, getStatus } from './api'
import WaitingPage from './WaitingPage'
import EditorPage from './EditorPage'

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const hasJoinedRef = useRef(false)

  useEffect(() => {
    if (hasJoinedRef.current) return
    hasJoinedRef.current = true

    let intervalId = null
    let cancelled = false

    async function start() {
      try {
        const result = await joinMatch()
        if (cancelled) return

        setSession(result)

        if (result.status === 'waiting') {
          intervalId = setInterval(async () => {
            try {
              const updated = await getStatus(result.userId)
              if (cancelled) return

              if (updated.status === 'matched') {
                setSession(updated)
                clearInterval(intervalId)
              }
            } catch (err) {
              console.error('Polling error:', err)
            }
          }, 1500)
        }
      } catch (err) {
        console.error(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    start()

    return () => {
      cancelled = true
      if (intervalId) clearInterval(intervalId)
    }
  }, [])

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>
  if (!session) return <div style={{ padding: 24 }}>Could not join.</div>

  if (session.status === 'waiting') {
    return <WaitingPage userId={session.userId} />
  }

  return (
    <EditorPage
      userId={session.userId}
      roomId={session.roomId}
      partnerId={session.partnerId}
    />
  )
}