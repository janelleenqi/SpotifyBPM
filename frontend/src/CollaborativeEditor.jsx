import React, { useEffect, useRef, useState } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { CodemirrorBinding } from 'y-codemirror'

import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

export default function CollaborativeEditor() {
  const [code, setCode] = useState('')
  const editorRef = useRef(null)

  useEffect(() => {
    const ydoc = new Y.Doc()
    const provider = new WebsocketProvider(
      'ws://localhost:1234',
      'editor-room',
      ydoc
    )

    const ytext = ydoc.getText('codemirror')
    let binding = null

    const interval = setInterval(() => {
      if (editorRef.current) {
        binding = new CodemirrorBinding(
          ytext,
          editorRef.current,
          provider.awareness
        )

        setCode(ytext.toString())
        clearInterval(interval)
      }
    }, 100)

    return () => {
      clearInterval(interval)
      if (binding) binding.destroy()
      provider.destroy()
      ydoc.destroy()
    }
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h2>Collaborative Code Editor</h2>
      <CodeMirror
        value={code}
        options={{
          mode: 'javascript',
          theme: 'default',
          lineNumbers: true
        }}
        editorDidMount={(editor) => {
          editorRef.current = editor
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value)
        }}
      />
    </div>
  )
}