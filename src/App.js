
import { UidContext } from "./components/AppContext";
import Routes from "./components/Routes";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const  App = () => { 

  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  useEffect( () => {
    const fetchToken = async () => {

      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials:true
      })
      .then((res) =>{
        setUid(res.data);
        console.log('id user: ',res.data)
      })
      .catch((err) => console.log("no token :", err))
    };
    fetchToken();

    if(uid){
      dispatch(getUser(uid)) ;
    }

  }, [uid]);

  return (
    // <div className="App">
      <UidContext.Provider value={uid} >
      <Routes />
      </UidContext.Provider>
    // </div>
  );
}

export default App;
