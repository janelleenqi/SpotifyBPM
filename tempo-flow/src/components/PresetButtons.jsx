export default function PresetButtons({ onSelect }) {
  return (
    <div className="presets">
      <button onClick={() => onSelect(90, 110)}>🚶 Walk</button>
      <button onClick={() => onSelect(110, 130)}>🏃 Jog</button>
      <button onClick={() => onSelect(120, 150)}>🔥 Run</button>
    </div>
  );
}
