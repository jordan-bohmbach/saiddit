import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostTile from './PostTile';
import SubsaidditList from './SubsaidditList';
import { useHistory } from 'react-router';
import { deletePost } from '../store/post';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const history = useHistory()
  const dispatch = useDispatch()

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
  const userSubsaiddits = subsaidditList.filter(subsaiddit=>subsaiddit.owner_id === parseInt(userId))

  const handlePostEdit = (e) => {
    history.push(`/posts/${e.target.value}/edit`)
  }

  const handlePostDelete = (e) => {
    dispatch(deletePost(e.target.value))
  }
  
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
          <div className='outer-post-container'>
            <PostTile post={post} />
            <div className='post-modification-buttons'>
                {parseInt(userId) === post?.owner_id ? <button value={post.id} onClick={handlePostEdit}>Edit Post</button> : ''}
                {parseInt(userId) === post?.owner_id ? <button value={post.id} onClick={handlePostDelete}>Delete Post</button> : ''}
            </div>
          </div>
        ))}
          {!userPosts.length && <div className='user-no-posts-filler'><h1>No Posts or Comments to Show!</h1></div>}
      </div>

      <div className='user-profile-subsaiddts-container'>
        <SubsaidditList subsaiddits={userSubsaiddits} header={`${user?.username}'s Subsaiddits`} />
      </div>
    </div>
    </>
  );
}
export default User;
