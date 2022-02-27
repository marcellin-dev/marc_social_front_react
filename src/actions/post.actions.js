import axios from 'axios';

//posts 

export const GET_POSTS = "GET_POSTS";
export const UPDATE_POST = "UPDATE_POST";


export const getPosts = (num) =>{
    return (dispatch) => {
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/post`)
        .then((res) =>{
            const array = res.data.slice(0, num)
            dispatch({type: GET_POSTS, payload: array})
        })
        .catch((err) => console.log(err)) 
    }
}


export const likePost = (idPost, idLiker) =>{
    return (dispatch) => {
        return axios
        .patch(`${process.env.REACT_APP_API_URL}api/post/like-post/${idPost}`, {id: idLiker})
        .then((res) =>{console.log(res)
            axios
        .get(`${process.env.REACT_APP_API_URL}api/post`)
        .then((res) =>{
            dispatch({type: GET_POSTS, payload: res.data})
        })

        })
        .catch((err) => console.log(err)) 
    }
}

export const unLikePost = (idPost, idLiker) =>{ console.log(idPost, idLiker)
    return (dispatch) => {
        return axios
        .patch(`${process.env.REACT_APP_API_URL}api/post/unlike-post/${idPost}`, {id: idLiker})
        .then((res) =>{console.log('----res unlike',res)
            axios
        .get(`${process.env.REACT_APP_API_URL}api/post`)
        .then((res) =>{ console.log('----res post',res.data)
            dispatch({type: GET_POSTS, payload: res.data})
        })
            
        })
        .catch((err) => console.log(err)) 
    }
}

export const updatePost = (postId, message) =>{
    return(dispatch) => {
        return axios({

            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            data: {message}
        })
        .then((res) =>{
            dispatch({type:UPDATE_POST, payload: {message, postId}})
        })
        .catch((err) => console.log(err));
    }
}