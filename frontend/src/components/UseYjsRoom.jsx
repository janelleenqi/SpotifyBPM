import { useEffect, useRef } from 'react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

export default function useYjsRoom(roomId) {
  const textareaRef = useRef(null)

  useEffect(() => {
    if (!roomId) return

    const ydoc = new Y.Doc()
    const provider = new WebsocketProvider('ws://localhost:1234', roomId, ydoc)
    const ytext = ydoc.getText('shared-text')
    const textarea = textareaRef.current

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

    textarea?.addEventListener('input', onInput)

    return () => {
      textarea?.removeEventListener('input', onInput)
      ytext.unobserve(syncFromYjs)
      provider.destroy()
      ydoc.destroy()
    }
  }, [roomId])

  return { textareaRef }
}