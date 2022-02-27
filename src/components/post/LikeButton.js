import React, {useState, useEffect, useContext} from 'react';
import {UidContext} from "../AppContext";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index';
import { isEmpty } from '../Utils';
import { useDispatch } from 'react-redux';
import { likePost, unLikePost } from '../../actions/post.actions';

const LikeButton = ({post}) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const like =() =>{
        console.log("liked ", liked);
        dispatch(likePost(post._id, uid));
        
    }

    const unLike = () =>{
        console.log("liked ", liked);
        dispatch(unLikePost(post._id, uid));
    }

    

    useEffect(() =>{ 
        if(!isEmpty(post)){ 
            if(post.likers.includes(uid)){
                setLiked(true);

            } else { setLiked(false);}
        }
    }, [uid,post, liked])
    return (
        <div className="like-container">
            {uid == null && 
            <Popup 
                trigger={<img src="./img/icons/heart.svg" alt="like" />}
                position={['bottom center', 'bottom right', 'bottom left']}
                closeOnDocumentClick
            >
                <div>Connectez-vous pour aimer un post</div>

            </Popup>
            }

            {uid && !liked && (
                <img src="./img/icons/heart.svg" onClick={like} alt="like" /> 
            )}

            {uid && liked && ( 
                <img src="./img/icons/heart-filled.svg" onClick={unLike} alt="unlike" />
            ) }
            <span>{post.likers.length}</span>
        </div>
    );
};

export default LikeButton;