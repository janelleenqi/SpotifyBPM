export async function generatePlaylist(userId, bpmStart, bpmEnd) {
  return fetch("http://localhost:5000/playlist/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      bpmStart,
      bpmEnd
    })
  });
}
