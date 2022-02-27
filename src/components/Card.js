import React, { useState, useEffect } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { isEmpty, dateParser } from '../components/Utils';
import FollowHandler from '../components/Profil/FollowHandler';
import LikeButton from './post/LikeButton';
import { updatePost } from '../actions/post.actions';
const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const updateItem = () =>{
        if(textUpdate){
             dispatch(updatePost(post._id, textUpdate));

        }
        setIsUpdated(false);
    }
    useEffect(() => {
        if (usersData) setIsLoading(false)
    }, [usersData])
    return (
        <li className="card-container" key={post._id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>

            ) : (
                <>
                    <div className="card-left">
                        <img src={
                            !isEmpty(usersData[0]) &&
                            usersData.map((user) => {
                                if (user._id == post.posterId) return user.picture;
                            }).join('')

                        } alt="err" />
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>
                                    {
                                        !isEmpty(usersData[0]) &&
                                        usersData.map((user) => {
                                            if (user._id == post.posterId) return user.pseudo;
                                        }).join('')
                                    }
                                </h3>
                                {post.posterId != userData._id && (
                                    <FollowHandler idToFollow={post.posterId} type="card" />

                                )}
                            </div>
                            <span className=""> {dateParser(post.createdAt)} </span>
                        </div>

                        {isUpdated===false && <p> {post.message} </p>}
                        {isUpdated && (
                            <div className="update-post">
                                <textarea 
                                defaultValue={post.message}
                                onChange={(e) => setTextUpdate(e.target.value)}
                                />
                            <div className="button-container">

                                <button className="btn" onClick={updateItem}>Valider modification</button>
                            </div>

                                
                            </div>
                        )}
                        {post.picture && (
                            <img src={post.picture} alt="card-pic" className="card-pic" />
                        )}

                        {post.video && (
                            <iframe
                                width="500"
                                height="300"
                                src={post.video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                                gyroscope;picture-in-picture"
                                allowFullScreen
                                title={post._id}
                            >

                            </iframe>
                        )}
                        {userData._id === post.posterId && (
                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img src="./img/icons/edit.svg" alt="edit" />
                                </div>
                            </div>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img src='./img/icons/message1.svg' alt="comment" />
                                <span> {post.comments.length} </span>
                            </div>
                            <LikeButton post={post} />
                            <img src="./img/icons/share.svg" alt="share" />
                        </div>

                    </div>
                </>
            )}

        </li>
    );
};

export default Card;