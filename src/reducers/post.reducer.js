const initialState = {};

export default function postReducer(state = initialState, action) {

    switch (action.type) {
        case "GET_POSTS":
            return action.payload;
            
        case "UPDATE_POST":
            return state.map((post) =>{
                if(post._id === action.payload.postId) {
                    return {
                        ...post,
                    message: action.payload.message
                    }
                }else {return post}
            })
        default:
           return state
    }
}