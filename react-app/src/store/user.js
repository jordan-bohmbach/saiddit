const LOAD_USERS = 'users/LOAD'

const loadUsers = (users) => ({
    type: LOAD_USERS,
    users
})

export const getUsers = () => async (dispatch) => {
    const response = await fetch(`/api/users/`);
    const userList = await response.json()
    dispatch(loadUsers(userList))
}


export default function userReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_USERS:
            const newUsers = {}
            action.users?.users?.forEach(user => {
                newUsers[user.id] = user;
            })
            return {
                // ...state,
                ...newUsers,
            }

        default:
            return state
    }
}
