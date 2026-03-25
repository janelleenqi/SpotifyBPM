export default function BpmSlider({ label, value, setValue }) {
  return (
    <div className="slider">
      <label>
        {label}: <strong>{value}</strong>
      </label>
      <input
        type="range"
        min="80"
        max="170"
        step="1"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </div>
  );
}
