import { useEffect, useRef, useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const profileRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const fetchProfile = async (user = username) => {
    setError(null);
    setProfile(null);
    try {
      const res = await fetch(`https://api.github.com/users/${user}`);
      if (!res.ok) throw new Error('User not found');
      const data = await res.json();
      setProfile(data);

      if (!history.includes(user)) {
        setHistory((prev) => [user, ...prev]);
      }

      // Scroll to profile section
      setTimeout(() => {
        profileRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav>
        <div><strong>👤 Profile Finder</strong></div>
        <div>
          <a href="#home">Home</a>
          <a href="#find">Find Profile</a>
          <button className="toggle-theme" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div id="home" style={{ marginBottom: '0rem' }}>
  <h1 style={{ marginBottom: '0.25rem', textAlign:'center' }}>Welcome to Profile Finder</h1>
  <p style={{ marginTop: 0 , textAlign:'center' }}>Search any GitHub username to view their public profile.</p>
</div>

      {/* Find Section */}
      <section id="find" style={{ textAlign: 'center', padding: '1rem 2rem 1rem 1rem' }}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            marginRight: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            minWidth: '250px'
          }}
        />
        <button className="toggle-theme" onClick={() => fetchProfile()}>
          Search
        </button>

        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

        {/* Profile Info */}
        {profile && (
          <div ref={profileRef} style={{ marginTop: '2rem' }}>
            <img src={profile.avatar_url} alt={profile.login} width={120} style={{ borderRadius: '50%' }} />
            <h2>{profile.name || profile.login}</h2>
            <p>{profile.bio}</p>
            <p>Public Repos: {profile.public_repos}</p>
            <a href={profile.html_url} target="_blank" rel="noreferrer">
              View GitHub Profile →
            </a>
          </div>
        )}

        {/* 
        {history.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <h3>🔎 Previous Searches</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {history.map((user, index) => (
                <li key={index}>
                  <button
                    onClick={() => fetchProfile(user)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#646cff',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      padding: '0.3rem',
                    }}
                  >
                    {user}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )} */}
      </section>
    </>
  );
}

export default App;
