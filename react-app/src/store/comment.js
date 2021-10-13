const LOAD_COMMENTS = 'comments/LOAD'
const ADD_COMMENT = 'comments/ADD'
const REMOVE_COMMENT = 'comments/REMOVE'
const EDIT_COMMENT = 'comments/EDIT'

const loadComments = (comments) => ({
    type: LOAD_COMMENTS,
    comments
})

const update = (comment) => ({
    type: EDIT_COMMENT,
    comment
})

const addOneComment = (comment) => ({
    type: ADD_COMMENT,
    comment
})

const remove = (commentId) => ({
    type: REMOVE_COMMENT,
    commentId,
})

export const getComments = () => async (dispatch) => {
    const response = await fetch(`/api/comments`);
    const commentList = await response.json()
    dispatch(loadComments(commentList))
}

export const createOneComment = (payload) => async dispatch => {
    let {
        userId,
        postId,
        parentId,
        content,
        createdat,
        updatedat,
    } = payload

    const form = new FormData()

    form.append('user_id', userId)
    form.append('post_id', postId)
    form.append('parent_id', parentId)
    form.append('content', content)
    form.append('createdat', createdat)
    form.append('updatedat', updatedat)

    const response = await fetch('/api/comments', {
        method: "POST",
        body: form
    });

    let newComment
    if (response.ok) {
        newComment = await response.json();
        dispatch(addOneComment(newComment))
    }
    return newComment
}


export const updateComment = comment => async dispatch => {
    const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        const comment = await response.json()
        dispatch(update(comment))
        return comment
    }
}

export const deleteComment = commentId => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(remove(commentId))
    }
}

export default function commentReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_COMMENTS:
            const newComments = {}
            action['comments'].comments.forEach(comment => {
                newComments[comment.id] = comment;
            })
            return {
                // ...state,
                ...newComments,
            }

        case ADD_COMMENT:
            if (!state[action.comment.id]) {
                return {
                    ...state,
                    [action.comment.id]: action.comment
                }
            }

            return {
                ...state,
                [action.comment.id]: {
                    ...state[action.comment.id],
                    ...action.watchlist
                }
            }

        case REMOVE_COMMENT:
            let newState = { ...state }
            delete newState[action.commentId]
            return newState

        case EDIT_COMMENT:
            return {
                ...state,
                [action.comment.id]: action.comment
            }

        default:
            return state
    }
}
