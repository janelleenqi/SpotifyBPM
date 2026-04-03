import { useEffect, useRef } from 'react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

export default function EditorPage({ userId, roomId, partnerId }) {
  const textareaRef = useRef(null)

  useEffect(() => {
    const ydoc = new Y.Doc()
    const provider = new WebsocketProvider('ws://localhost:1234', roomId, ydoc)
    const ytext = ydoc.getText('shared-text')
    const textarea = textareaRef.current

    provider.on('status', (event) => {
      console.log(`[${userId}] WebSocket status:`, event.status)
    })

    provider.on('connection-error', (err) => {
      console.error(`[${userId}] WebSocket connection error:`, err)
    })

    const syncFromYjs = () => {
      if (textarea && textarea.value !== ytext.toString()) {
        textarea.value = ytext.toString()
      }
    }

    syncFromYjs()
    ytext.observe(syncFromYjs)

    const onInput = () => {
      const value = textarea.value

      ydoc.transact(() => {
        ytext.delete(0, ytext.length)
        ytext.insert(0, value)
      })
    }

    textarea.addEventListener('input', onInput)

    return () => {
      textarea.removeEventListener('input', onInput)
      ytext.unobserve(syncFromYjs)
      provider.destroy()
      ydoc.destroy()
    }
  }, [roomId, userId])

  return (
    <div style={{ padding: 24 }}>
      <h1>Collaborative Editor</h1>
      <p>Your user ID: {userId}</p>
      <p>Partner ID: {partnerId}</p>
      <p>Room ID: {roomId}</p>

      <textarea
        ref={textareaRef}
        style={{ width: '100%', height: '300px', fontSize: '16px' }}
        placeholder="Type here..."
      />
    </div>
  )
}