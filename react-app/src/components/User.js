import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostTile from './PostTile';
import SubsaidditList from './SubsaidditList';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  const postList = useSelector(state=>Object.values(state.posts))
  const subsaidditList = useSelector(state=>Object.values(state.subsaiddits))

  const userPosts = postList.filter(post=>post.owner_id === user?.id)
  const userSubsaiddits = subsaidditList.filter(subsaiddit=>subsaiddit.owner_id === user?.id)

  
  if (!user) {
    return null;
  }

  return (
    <>
    <div className='user-profile-content-container'>
      <div className='user-profile-posts-container'>
        <div className='posts-and-comments-header-container'>
          <h1>{`${user?.username}'s Posts and Comments`}</h1>
        </div>
        {userPosts.map(post=>(
          <PostTile post={post} />
        ))}
      </div>

      <div className='user-profile-subsaiddts-container'>
        <SubsaidditList subsaiddits={userSubsaiddits} header={'My Subsaiddits'} />
      </div>
    </div>
    </>
  );
}
export default User;
