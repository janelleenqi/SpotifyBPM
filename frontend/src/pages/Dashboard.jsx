import { useState } from "react";
import BpmSlider from "../components/BpmSlider";
import PresetButtons from "../components/PresetButtons";
import PlaylistPreview from "../components/PlaylistPreview";
import { generatePlaylist } from "../api/PlaylistAPI";

export default function Dashboard() {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("userId");

  const [startBpm, setStartBpm] = useState(90);
  const [endBpm, setEndBpm] = useState(150);
  const [preview, setPreview] = useState([]);

  function applyPreset(start, end) {
    setStartBpm(start);
    setEndBpm(end);
  }

  function buildPreview() {
    const steps = 10;
    const step = (endBpm - startBpm) / (steps - 1);

    const bpmList = Array.from({ length: steps }, (_, i) =>
      Math.round(startBpm + step * i)
    );

    setPreview(bpmList);
  }

  async function handleGenerate() {
    await generatePlaylist(userId, startBpm, endBpm);
    alert("Playlist created in Spotify!");
  }

  return (
    <div className="container">
      <h2>Walking & Running Playlists</h2>

      <PresetButtons onSelect={applyPreset} />

      <BpmSlider label="Start BPM" value={startBpm} setValue={setStartBpm} />
      <BpmSlider label="End BPM" value={endBpm} setValue={setEndBpm} />

      <button onClick={buildPreview}>Preview BPM Progression</button>

      <PlaylistPreview bpmList={preview} />

      <button className="primary-btn" onClick={handleGenerate}>
        Generate Playlist
      </button>
    </div>
  );
}
