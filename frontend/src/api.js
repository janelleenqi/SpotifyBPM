export async function joinMatch() {
  const res = await fetch('http://localhost:3001/join', {
    method: 'POST',
  })

  if (!res.ok) {
    throw new Error('Failed to join match')
  }

  return res.json()
}

export async function getStatus(userId) {
  const res = await fetch(`http://localhost:3001/status/${userId}`)

  if (!res.ok) {
    throw new Error('Failed to get status')
  }

  return res.json()
}