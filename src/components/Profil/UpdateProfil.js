import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeftNav from '../LeftNav';
import UploadImg from './UploadImg';
import { updateBio } from '../../actions/user.actions';
import { dateParser } from '../Utils';
import FollowHandler from './FollowHandler';

const UpdateProfil = () => {
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const [triFollowings, setTriFollowings] = useState([]); 
    const [triFollowers, setTriFollowers] = useState([]);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);

    const dispatch = useDispatch();
    const [followingPopup, setFollowingPopup] = useState(false);
    const [followerPopup, setFollowerPopup] = useState(false);

    const handleUpdate = () => {
        dispatch(updateBio(userData._id, bio));
        setUpdateForm(false);
    }

    const handleModalFollowing = () => {
        triFollowing();
        // setFollowingPopup(true);
        console.log('yess');

        // Get the modal
        var modal = document.getElementById("myModal");

        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal 
        btn.onclick = function () {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    const handleModalFollower = () => {
        triFollower();
        // Get the modal
        var modal = document.getElementById("myModal1");

        // Get the button that opens the modal
        var btn = document.getElementById("myBtn1");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[1];

        // When the user clicks the button, open the modal 
        btn.onclick = function () {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    const triFollowing = () => {
        let folowing = [];
        userData.following.map((elem) => {

            usersData.map((data) => {
                if (data._id == elem) {
                    folowing.push(data);
                    console.log(folowing)
                }
            })
        })

        setTriFollowings(folowing)
    }
    const triFollower = () =>{
        let folowers = [];
        userData.followers.map((elem) => {

            usersData.map((data) => {
                if (data._id == elem) {
                    folowers.push(data);
                    console.log(folowers)
                }
            })
        })

        setTriFollowers(folowers);
    }
    return (
        <div className="profile-container ">
            <LeftNav />
            <div className="container">

                <h1>Profil de {userData.pseudo}</h1>
                <div className="update-container row ">
                    <div className="left-part col mx-1">

                        <img src={userData.picture} alt="erreur de limage" />
                        {/* userData.picture */}
                        <UploadImg />
                    </div>

                    <div className="right-part col">
                        <div className="bio-update"> <h2>Bio </h2>
                            {updateForm == false && (

                                <>
                                    <p onClick={() => setUpdateForm(!updateForm)}> {userData.bio} </p>
                                    <button onClick={() => setUpdateForm(!updateForm)}>Modifier Bio</button>
                                </>
                            )}

                            {updateForm && (

                                <>
                                    <textarea type="text" defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                                    <button onClick={handleUpdate}> valider les modifications</button>
                                </>
                            )}
                        </div>

                        <h4>Membre depuis le {dateParser(userData.createdAt)} </h4>
                        <h5 id="myBtn" onClick={handleModalFollowing}>Abonnements: {userData.following ? userData.following.length : 0} </h5>




                        <div id="myModal" className="modal">

                            {/* <!-- Modal content --> */}
                            <div className="modal-content">
                                <span className="close">&times;</span>
                                <ul>
                                    {userData.following ? (

                                        triFollowings.map((elem) => {

                                            return (
                                                <li>
                                                    <div className="row my-4">
                                                        <div className="col "> <img className="imagefollow" src={elem.picture} /> </div>
                                                        <div className="col  "> <h3 className="pseudo"> {elem.pseudo} </h3> </div>
                                                        <div className="col ">  <FollowHandler idToFollow={elem._id} type="suggestion" /> </div>

                                                    </div>

                                                </li>
                                            )

                                        })


                                    ) : (
                                        <>
                                            <li>no following</li>
                                        </>
                                    )
                                    }

                                </ul>
                            </div>

                        </div>

                        <h5 id="myBtn1" onClick={handleModalFollower}>Abonés: {userData.followers ? userData.followers.length : 0} </h5>

                        <div id="myModal1" className="modal">

                            {/* <!-- Modal content --> */}
                            <div className="modal-content">
                                <span className="close">&times;</span>
                                <ul>
                                    {userData.followers ? (

                                        triFollowers.map((elem) => {

                                            return (
                                                <li>
                                                    <div className="row my-4">
                                                        <div className="col "> <img className="imagefollow" src={elem.picture} /> </div>
                                                        <div className="col  "> <h3 className="pseudo"> {elem.pseudo} </h3> </div>
                                                        <div className="col ">  <FollowHandler idToFollow={elem._id} type="suggestion" /> </div>

                                                    </div>

                                                </li>
                                            )

                                        })


                                    ) : (
                                        <>
                                            <h3>no followers</h3>
                                        </>
                                    )
                                    }

                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {followingPopup &&
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnements</h3>
                        <span className="cross">&#10005;</span>
                    </div>
                </div>
            }
        </div>
    );
};

export default UpdateProfil;