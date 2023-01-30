import React, { useContext, useState } from "react"
import PetForm from "./pages/PetForm"
import About from "./pages/About"
import {Route, Routes} from 'react-router-dom'
import Home from "./pages/Home"
import { PaginationContext } from "./context/PaginationContext"
import useApi from './utils/api';
import { PetContext } from './context/PetContext';
import { removeEmptyAttributes } from "./utils/generalFunctions"
import LoginForm from './pages/LoginFrom';
import SignUpForm from './pages/SignUpForm';
import { AuthContext } from './utils/auth/AuthContext';
import Navbar from "./Components/Navbar"
import MyProfile from "./pages/MyProfile"

export default function App(props) {
    
    const {isSearch, setNumberOfPages, currentPage } = useContext(PaginationContext)
    const {setPetList, searchData, searchTrigger} = useContext(PetContext);
    const {setAuth} = useContext(AuthContext)
  
    const api = useApi();

  /*   React.useEffect(() => {
        api.get("/pets/postsCount/")
        .then((res) => {
          setTotalPosts(res.data)
        })
        .catch(err => console.log(err));

    },[])
 */
    React.useEffect(() => {
      console.log("useEffect executed")
      if (localStorage.getItem('auth_token')) {
        setAuth(prevAuth => ({
            ...prevAuth,
            isAuthenticated : true,
        }))
      }
      isSearch ? filterPets() : getAllPets()
    },[currentPage, searchTrigger])


    const getAllPets = () => {
      console.log("inside getAllPets")
      api.get("/pets/petListPages/", {params: {page: currentPage}})
      .then((response) => {
        console.log(response.data)
        setPetList(response.data.items)
        setNumberOfPages(response.data.total)
      })
      .catch(err => console.log(err));
    }

    const filterPets = () => {
      console.log("inside filterPets")
      const newsearchData = removeEmptyAttributes(searchData) ;
      const filteredSearchData = {
        data : newsearchData,
        page : currentPage
      }
      console.log("filteredSearchData = ", filteredSearchData)
      api.get("/pets/Paginatedfilter", {params: filteredSearchData}).then((response) => {
          console.log("response in filter :", response.data)
          setPetList(response.data.items)
          setNumberOfPages(response.data.total)
      })
    }

    return (
        <div>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/CreatePost" element={<PetForm update={false} />} />
              <Route path="/updateForm" element={<PetForm update={true} />} />
              <Route path="/about" element={<About/>} />
              <Route path="/Login" element={<LoginForm />} />
              <Route path="/SignUp" element={<SignUpForm />} />
              <Route path="/MyProfile" element={<MyProfile />} />
              
          </Routes>
          <Navbar/>
        </div>
    )
}