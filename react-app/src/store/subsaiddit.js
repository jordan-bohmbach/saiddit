const LOAD_SUBSAIDDITS = 'subsaiddits/LOAD'
const ADD_SUBSAIDDIT = 'subsaiddits/ADD'
const REMOVE_SUBSAIDDIT = 'subsaiddits/REMOVE'
const EDIT_SUBSAIDDIT = 'subsaiddits/EDIT'

const loadSubSaiddits = (subsaiddits) => ({
    type: LOAD_SUBSAIDDITS,
    subsaiddits
})

const update = (subsaiddit) => ({
    type: EDIT_SUBSAIDDIT,
    subsaiddit
})

const addOneSubSaiddit = (subsaiddit) => ({
    type: ADD_SUBSAIDDIT,
    subsaiddit
})

const remove = (subsaidditId) => ({
    type: REMOVE_SUBSAIDDIT,
    subsaidditId,
})

export const getSubSaiddits = () => async (dispatch) => {
    const response = await fetch(`/api/subsaiddits`);
    const subsaidditList = await response.json()
    dispatch(loadSubSaiddits(subsaidditList))
}

export const createOneSubSaiddit = (payload) => async dispatch => {
    const {
        name,
        image,
        owner_id,
        description,
        rules,
        moderator_id,
        createdat,
        updatedat,
    } = payload

    const form = new FormData()

    form.append('name', name)
    form.append('file', image)
    form.append('owner_id', owner_id)
    form.append('description', description)
    form.append('rules', rules)
    form.append('moderator_id', moderator_id)
    form.append('createdat', createdat)
    form.append('updatedat', updatedat)


    const response = await fetch(`/api/subsaiddits`, {
        method: 'POST',
        body: form
    });

    let newsubSaiddit
    if (response.ok) {
        newsubSaiddit = await response.json();
        dispatch(addOneSubSaiddit(newsubSaiddit))
    }
    return newsubSaiddit
}


export const updateSubSaiddit = subsaiddit => async dispatch => {
    const response = await fetch(`/api/subsaiddits/${subsaiddit.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subsaiddit)
    })

    if (response.ok) {
        const subsaiddit = await response.json()
        dispatch(update(subsaiddit))
        return subsaiddit
    }
}

export const deletesubSaiddit = subsaidditId => async dispatch => {
    const response = await fetch(`/api/subsaiddits/${subsaidditId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(remove(subsaidditId))
    }
}

export default function subsaidditReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_SUBSAIDDITS:
            const newsubSaiddits = {}
            action['subsaiddits'].subsaiddits.forEach(subsaiddit => {
                newsubSaiddits[subsaiddit.id] = subsaiddit;
            })
            return {
                ...state,
                ...newsubSaiddits,
            }

        case ADD_SUBSAIDDIT:
            if (!state[action.subsaiddit.id]) {
                return {
                    ...state,
                    [action.subsaiddit.id]: action.subsaiddit
                }
            }

            return {
                ...state,
                [action.subsaiddit.id]: {
                    ...state[action.subsaiddit.id],
                    ...action.watchlist
                }
            }

        case REMOVE_SUBSAIDDIT:
            let newState = { ...state }
            delete newState[action.subsaidditId]
            return newState

        case EDIT_SUBSAIDDIT:
            return {
                ...state,
                [action.subsaiddit.id]: action.subsaiddit
            }

        default:
            return state
    }
}
