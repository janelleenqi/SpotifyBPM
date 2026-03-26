export default function RoomStatus({ status, roomId }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div>Room: {roomId}</div>
      <div>Status: {status}</div>
    </div>
  )
}