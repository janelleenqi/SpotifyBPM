export default function WaitingPage({ userId }) {
  return (
    <div style={{ padding: 24 }}>
      <h1>Waiting for another user...</h1>
      <p>Your user ID: {userId}</p>
      <p>Please keep this page open.</p>
    </div>
  )
}