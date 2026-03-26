import useYjsRoom from './UseYjsRoom'

export default function Editor({ roomId }) {
  const { textareaRef } = useYjsRoom(roomId)

  return (
    <textarea
      ref={textareaRef}
      style={{ width: '100%', height: 300, fontSize: 16 }}
      placeholder="Type here..."
    />
  )
}