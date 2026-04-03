import express from 'express'
import { joinRoom, leaveRoom } from './RoomService.js'

const router = express.Router()

router.post('/join', (req, res) => {
  const result = joinRoom()
  console.log(`User ${result.userId} joined ${result.roomId} (status: ${result.status})`)
  res.json(result)
})

router.post('/leave', (req, res) => {
  const { userId, roomId } = req.body
  const result = leaveRoom(userId, roomId)

  if (!result) {
    return res.status(404).json({ error: 'Room not found' })
  }

  res.json(result)
})

export default router