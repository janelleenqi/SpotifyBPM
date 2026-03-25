export default function PlaylistPreview({ bpmList }) {
  if (!bpmList.length) return null;

  return (
    <div className="preview">
      <h4>BPM Progression</h4>
      <ul>
        {bpmList.map((bpm, i) => (
          <li key={i}>🎵 {bpm} BPM</li>
        ))}
      </ul>
    </div>
  );
}
