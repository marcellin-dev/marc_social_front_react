import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {follow, unFollow} from '../../actions/user.actions';
                                                      
const FollowHandler = ({idToFollow, type}) => {
    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    const handleFollow = () =>{ console.log("id to follow ",idToFollow);
            dispatch(follow(idToFollow, userData._id));
    }

    const handleUnFollow =() =>{
        console.log("id to unfollow ",idToFollow);
        dispatch(unFollow(idToFollow, userData._id));
    }

    useEffect(() =>{
        if(userData.following){

            if(userData.following.includes(idToFollow)){
                setIsFollowed(true);
            }else {
                setIsFollowed(false);
            }
        }   

    }, [userData, idToFollow])

    return (
        <>
        {isFollowed && (

            <span onClick={handleUnFollow}>
                
                {type == "suggestion" && 
                         <h5 className="" >Abonné</h5>
                    }
                     {type == "card" && 
                        <img src="./img/icons/checked.svg" alt="checked" />
                    }
            </span>
                )}

                {isFollowed === false && (
                     <span onClick={handleFollow}>
                    {type == "suggestion" && 
                         <h5 className="" >Suivre</h5>
                    }

                    {type == "card" && 
                        <img src="./img/icons/check.svg" alt="check" />
                    }
                 </span>
                )}
        </>
    );
};

export default FollowHandler;