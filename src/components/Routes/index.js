import React from 'react';
import {BrowserRouter, Routes , Route} from "react-router-dom"
// import { NavLink } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import Navbar from '../Navbar';


const index = () => {
    return (

<BrowserRouter>
<Navbar />
<Routes>
  <Route path="/" element={<Home />} />

  <Route path="/profil" element={<Profil />} />
  <Route path="/trending" element={<Trending />} />
  <Route path="*" element={<Home />} />
</Routes>
</BrowserRouter>
        // <Router>
        //     <Switch>
        //         <Route path="/" exact component={Home} />
        //         <Route path="/" exact component={Profil} />
        //         <Route path="/" exact component={Trending} />
        //         <Redirect to="/" />
        //     </Switch>
        // </Router>
    );
};

export default index;