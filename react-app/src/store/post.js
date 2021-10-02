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
    dispatch(loadPosts(postList))
}

export const createOnePost = (payload) => async dispatch => {
    let {
        title,
        content,
        image,
        ownerId,
        subsaidditId,
        createdat,
        updatedat,
    } = payload

    const form = new FormData()

    form.append('title', title)
    form.append('content', content)
    form.append('file', image)
    form.append('ownerId', ownerId)
    form.append('subsaidditId', subsaidditId)
    form.append('createdat', createdat)
    form.append('updatedat', updatedat)

    const response = await fetch('/api/posts', {
        method: "POST",
        body: form
    });

    let newPost
    if (response.ok) {
        newPost = await response.json();
        dispatch(addOnePost(newPost))
    }
    return newPost
}


export const updatePost = post => async dispatch => {

    let {
        title,
        content,
        image,
        ownerId,
        subsaidditId,
        createdat,
        updatedat
    } = post

    const form = new FormData()

    form.append('title', title)
    form.append('content', content)
    form.append('file', image)
    form.append('ownerId', ownerId)
    form.append('subsaidditId', subsaidditId)
    form.append('createdat', createdat)
    form.append('updatedat', updatedat)

    const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        body: form
    });

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
                // ...state,
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
