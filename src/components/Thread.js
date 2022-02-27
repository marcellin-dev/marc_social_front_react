import React, { useEffect,useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts} from '../actions/post.actions';
import {isEmpty} from '../components/Utils';

import Card from './Card';
const Thread = () => {

    const [loadPost, setLoadPost ]= useState(true);
    const [count, setCount] = useState(5);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);

    const loadMore =() =>{ console.log(loadPost)
        if((window.innerHeight + window.scrollY) > document.body.scrollHeight){
            console.log('loadPost')
            setLoadPost(true);

        }
    }
    useEffect(() => {

        if(loadPost){
            dispatch(getPosts(count));
            setLoadPost(false);
            setCount(count + 5)
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);

    }, [loadPost])
    return (
        <div className="thread-container">
            <ul> 
                {!isEmpty(posts) && 
                    posts.map((post) =>{
                        return <Card key={post._id} post={post} /> 
                    })
                }
            </ul>
           
        </div>
    );
};

export default Thread;