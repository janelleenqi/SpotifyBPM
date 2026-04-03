import { useEffect, useState } from 'react'
import WaitingPage from './WaitingPage'
import EditorPage from './EditorPage'

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let intervalId = null
    let cancelled = false

    async function start() {
      try {
        // 🔥 1. CHECK if user already exists in this tab
        const savedUserId = sessionStorage.getItem('userId')

        let result

        if (savedUserId) {
          // ✅ RESUME EXISTING USER
          const res = await fetch(
            `http://localhost:3001/resume/${savedUserId}`
          )

          if (res.ok) {
            result = await res.json()
          } else {
            // ❌ user not found (backend restarted)
            sessionStorage.removeItem('userId')
            result = await joinNewUser()
          }
        } else {
          // ✅ NEW USER
          result = await joinNewUser()
        }

        if (cancelled) return

        setSession(result)

        // 🔥 2. IF WAITING → POLL
        if (result.status === 'waiting') {
          intervalId = setInterval(async () => {
            try {
              const res = await fetch(
                `http://localhost:3001/status/${result.userId}`
              )
              const updated = await res.json()

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

    // helper
    async function joinNewUser() {
      const res = await fetch('http://localhost:3001/join', {
        method: 'POST',
      })

      const data = await res.json()

      // 🔥 SAVE userId so refresh does NOT create new user
      sessionStorage.setItem('userId', data.userId)

      return data
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