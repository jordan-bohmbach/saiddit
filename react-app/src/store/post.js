const LOAD_POSTS = 'posts/LOAD'
const ADD_POST = 'posts/ADD'
const REMOVE_POST = 'posts/REMOVE'
const EDIT_POST = 'posts/EDIT'

const loadPosts = (posts) => ({
    type: LOAD_POSTS,
    posts
})

const update = (post) => ({
    type: EDIT_POST,
    post
})

const addOnePost = (post) => ({
    type: ADD_POST,
    post
})

const remove = (postId) => ({
    type: REMOVE_POST,
    postId,
})

export const getPosts = () => async (dispatch) => {
    const response = await fetch(`/api/posts`);
    const postList = await response.json()
    console.log('in the store the postList is', postList)
    dispatch(loadPosts(postList))
}

export const createOnePost = (payload) => async dispatch => {
    const {
        title,
        content,
        image,
        ownerId,
        subsaidditId,
        createdat,
        updatedat,
    } = payload

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, image, ownerId, subsaidditId, createdat, updatedat })
    });

    let newPost
    if (response.ok) {
        newPost = await response.json();
        dispatch(addOnePost(newPost))
    }
    return newPost
}


export const updatePost = post => async dispatch => {
    const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post)
    })

    if (response.ok) {
        const post = await response.json()
        dispatch(update(post))
        return post
    }
}

export const deletePost = postId => async dispatch => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(remove(postId))
    }
}

export default function postReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_POSTS:
            const newPosts = {}
            action['posts'].posts.forEach(post => {
                newPosts[post.id] = post;
            })
            return {
                ...state,
                ...newPosts,
            }

        case ADD_POST:
            if (!state[action.post.id]) {
                return {
                    ...state,
                    [action.post.id]: action.post
                }
            }

            return {
                ...state,
                [action.post.id]: {
                    ...state[action.post.id],
                    ...action.watchlist
                }
            }

        case REMOVE_POST:
            let newState = { ...state }
            delete newState[action.postId]
            return newState

        case EDIT_POST:
            return {
                ...state,
                [action.post.id]: action.post
            }

        default:
            return state
    }
}
