import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Github, Users, BookOpen, Star, MapPin, Link as LinkIcon, Calendar, Moon, Sun, Sparkles } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const profileRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const fetchProfile = async (user = username) => {
    if (!user.trim()) return;
    
    setError(null);
    setProfile(null);
    setLoading(true);
    
    try {
      const res = await fetch(`https://api.github.com/users/${user}`);
      if (!res.ok) throw new Error('User not found');
      const data = await res.json();
      setProfile(data);

      if (!history.includes(user)) {
        setHistory((prev) => [user, ...prev.slice(0, 4)]);
      }

      setTimeout(() => {
        profileRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchProfile();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github className="inline-block mr-2" size={24} />
          Profile Finder
        </motion.div>
        <div className="nav-links">
          <motion.a 
            href="#home"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Home
          </motion.a>
          <motion.a 
            href="#find"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Find Profile
          </motion.a>
          <motion.button 
            className="btn btn-secondary"
            onClick={() => setDarkMode(!darkMode)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            {darkMode ? 'Light' : 'Dark'}
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div 
        id="home" 
        className="hero"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="floating"
          whileHover={{ scale: 1.02 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover GitHub Profiles
            <motion.span
              className="inline-block ml-2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="inline-block text-yellow-500" size={32} />
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Search any GitHub username to explore their public profile, repositories, and contributions.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Search Section */}
      <motion.section 
        id="find" 
        className="search-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="search-container">
          <div className="relative flex-1">
            <Search className="search-icon" size={20} />
            <motion.input
              type="text"
              placeholder="Enter GitHub username (e.g., octocat)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input"
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>
          <motion.button 
            className="btn btn-primary"
            onClick={() => fetchProfile()}
            disabled={loading || !username.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? (
              <div className="loading-spinner w-4 h-4" />
            ) : (
              <Search size={16} />
            )}
            Search
          </motion.button>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <strong>Oops!</strong> {error}. Please try a different username.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              className="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="loading-spinner" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Card */}
        <AnimatePresence>
          {profile && (
            <motion.div
              ref={profileRef}
              className="profile-card"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
              <motion.img
                src={profile.avatar_url}
                alt={profile.login}
                className="profile-avatar"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              />
              
              <motion.h2
                className="profile-name"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {profile.name || profile.login}
              </motion.h2>
              
              <motion.p
                className="profile-username"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                @{profile.login}
              </motion.p>

              {profile.bio && (
                <motion.p
                  className="profile-bio"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {profile.bio}
                </motion.p>
              )}

              <motion.div
                className="profile-stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.div
                  className="stat-item"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="stat-number">{profile.public_repos}</span>
                  <span className="stat-label">
                    <BookOpen size={14} className="inline mr-1" />
                    Repositories
                  </span>
                </motion.div>
                
                <motion.div
                  className="stat-item"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="stat-number">{profile.followers}</span>
                  <span className="stat-label">
                    <Users size={14} className="inline mr-1" />
                    Followers
                  </span>
                </motion.div>
                
                <motion.div
                  className="stat-item"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="stat-number">{profile.following}</span>
                  <span className="stat-label">
                    <Users size={14} className="inline mr-1" />
                    Following
                  </span>
                </motion.div>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                className="flex flex-wrap gap-4 justify-center text-sm text-gray-600 dark:text-gray-400 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                {profile.location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    {profile.location}
                  </div>
                )}
                {profile.blog && (
                  <div className="flex items-center gap-1">
                    <LinkIcon size={14} />
                    <a href={profile.blog} target="_blank" rel="noreferrer" className="hover:text-blue-500">
                      Website
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  Joined {formatDate(profile.created_at)}
                </div>
              </motion.div>

              <motion.a
                href={profile.html_url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary w-full justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github size={16} />
                View GitHub Profile
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search History */}
        <AnimatePresence>
          {history.length > 0 && !loading && (
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                Recent Searches
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {history.map((user, index) => (
                  <motion.button
                    key={user}
                    onClick={() => {
                      setUsername(user);
                      fetchProfile(user);
                    }}
                    className="btn btn-secondary text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {user}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </>
  );
}

export default App;