import React from 'react';

function Profile({ user }) {
  return (
    <div className="profile">
      <img src={user.avatar_url} alt={user.name} className="avatar" />
      <h2>{user.name}</h2>
      <p>@{user.login}</p>
      <p>{user.bio}</p>
      <p>Followers: {user.followers} | Following: {user.following}</p>
      <a href={user.html_url} target="_blank" rel="noopener noreferrer">
        View Profile
      </a>
    </div>
  );
}

export default Profile;
