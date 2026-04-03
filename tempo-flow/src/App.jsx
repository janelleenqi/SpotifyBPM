import { useEffect, useRef } from 'react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

export default function App() {
  const textareaRef = useRef(null)

  useEffect(() => {
    const ydoc = new Y.Doc()
    // Yjs document is the shared in-memory collaborative document
    const provider = new WebsocketProvider('ws://localhost:1234', 'editor-room', ydoc)
    // ydoc is the Yjs document to sync through that room
    const ytext = ydoc.getText('shared-text')
    const textarea = textareaRef.current

    provider.on('status', (event) => {
      console.log('WebSocket status:', event.status) // connected / disconnected
    })

    provider.on('connection-error', (err) => {
      console.error('WebSocket connection error:', err)
    })


    const syncFromYjs = () => { // server to client sync on load
      if (textarea && textarea.value !== ytext.toString()) {
        textarea.value = ytext.toString()
      }
    }

    syncFromYjs() 
    ytext.observe(syncFromYjs) //

    const onInput = () => { // client to server sync on input
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
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <h1>Yjs Test</h1>
      <textarea
        ref={textareaRef}
        style={{ width: '100%', height: '300px', fontSize: '16px' }}
        placeholder="Type here..."
      />
    </div>
  )
}