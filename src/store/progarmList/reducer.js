
const initState = {
    Program_list: []
}

const PROGRAM_LIST = (state = initState, action) => {
    const { Program_list }= action
    switch (action.type) {
        case 'PROGRAMLIST':
            return {
                ...state,
                Program_list
            }
        default:
            return state
    }
}

export default PROGRAM_LIST