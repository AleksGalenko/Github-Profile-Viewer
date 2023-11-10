import React from 'react';

const Profile = ({ userData }) => {
  return (
    <div className="profile">
      <div className="profile-image">
        <img src={userData.avatar_url} alt={userData.login} />
      </div>
      <h2>{userData.name}</h2>
      <p>Username: {userData.login}</p>
      <p>Followers: {userData.followers}</p>
      <p>Following: {userData.following}</p>
      <p>Public Repositories: {userData.public_repos}</p>
    </div>
  );
};

export default Profile;
