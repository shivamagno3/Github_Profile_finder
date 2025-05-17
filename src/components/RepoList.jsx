import React from 'react';

function RepoList({ repos }) {
  return (
    <div className="repos">
      <h3>Top Repositories</h3>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
            <p>{repo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RepoList;
