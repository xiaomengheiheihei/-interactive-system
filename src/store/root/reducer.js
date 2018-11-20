

const initState = {
    ROOT_loading: false,
    ROOT_userInfo: {
        name: '',
        id: '',
    },
    ROOT_menuCollapsed: false,
}

const ROOT = (state = initState, action) => {
    const { ROOT_loading, ROOT_userInfo, ROOT_menuCollapsed }= action
    switch (action.type) {
        case 'ROOT_LOADING':
            return {
                ...state,
                ROOT_loading
            }
        case 'ROOT_USERINFO':
            return {
                ...state,
                ROOT_userInfo
            }
        case 'ROOT_MENUCOLLAPSED':
            return {
                ...state,
                ROOT_menuCollapsed
            }
        default:
            return state
    }
}

export default ROOT