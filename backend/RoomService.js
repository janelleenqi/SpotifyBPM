import { rooms } from './RoomStore.js'

let roomCounter = 1
let userCounter = 1

function createRoom(userId) {
  const roomId = `room-${roomCounter++}`
  const room = {
    roomId,
    users: [userId],
    status: 'waiting',
  }
  rooms.set(roomId, room)
  return room
}

function findWaitingRoom() {
  for (const room of rooms.values()) {
    if (room.users.length === 1 && room.status === 'waiting') {
      return room
    }
  }
  return null
}

export function joinRoom() {
  const userId = `user-${userCounter++}`

  const waitingRoom = findWaitingRoom()

  if (waitingRoom) {
    waitingRoom.users.push(userId)
    waitingRoom.status = 'full'
    return {
      userId,
      roomId: waitingRoom.roomId,
      status: waitingRoom.status,
    }
  }

  const newRoom = createRoom(userId)
  return {
    userId,
    roomId: newRoom.roomId,
    status: newRoom.status,
  }
}

export function leaveRoom(userId, roomId) {
  const room = rooms.get(roomId)
  if (!room) return null

  room.users = room.users.filter(u => u !== userId)

  if (room.users.length === 0) {
    rooms.delete(roomId)
    return { roomId, deleted: true }
  }

  room.status = 'waiting'
  return { roomId, deleted: false, status: room.status }
}
