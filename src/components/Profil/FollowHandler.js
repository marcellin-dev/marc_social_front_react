import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {follow, unFollow} from '../../actions/user.actions';
                                                      
const FollowHandler = ({idToFollow}) => {
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

            <span>
                <h5 className="" onClick={handleUnFollow} >Abonné</h5>
            </span>
                )}

                {isFollowed === false && (
                     <span>
                     <h5 className="" onClick={handleFollow}>Suivre</h5>
                 </span>
                )}
        </>
    );
};

export default FollowHandler;