export default function Login() {
  return (
    <div className="center">
      <h1>SpotifyBPM</h1>
      <p>Create walking & running playlists by BPM</p>

      <a href="http://localhost:5000/auth/spotify/login">
        <button className="primary-btn">
          Login with Spotify
        </button>
      </a>
    </div>
  );
}
