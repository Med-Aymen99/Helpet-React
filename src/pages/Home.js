import React, { useContext } from "react"
import Navbar from "../Components/Navbar"
import Hero from "../Components/Hero"
import { PetContext } from "../context/PetContext"
import { AuthContext } from "../utils/auth/AuthContext"
import Card from "../Components/Card"
import Pagination from "../Components/Pagination"
import SearchBar from "../Components/SearchBar"
import useApi from './../utils/api';
import { NavigationContext } from './../context/NavigationContext';

export default function Home(props) {
  const {petList, setUpdatePetData, setSelectedPetId, setPetList} = useContext(PetContext);
  const {auth} = useContext(AuthContext);
 
  const api = useApi();

  const updateForm = (item) =>  {
    setSelectedPetId(item.id)
    const {id, ...data} = item
    setUpdatePetData(data)
  };

  const navigate = useContext(NavigationContext);

  const deletePet = (petId) => {
    api.delete(`pets/delete/${petId}`)
        .then((response) => {
        console.log(`pet of id ${petId} has been deleted`)
        setPetList(oldPetList => oldPetList.filter(pet => pet.id != petId))
        })
        .catch((err) => console.log(err));
    navigate('/')
  }

  const pets = petList.map(item => {
    return <Card
        key = {item.id}
        {...item}
        onClickDelete={() => deletePet(item.id)}
        onClickUpdate={() => updateForm(item)}
        isAuthenticated={auth.isAuthenticated}
    />
  })
  return (
    <div className="page-content">
      <Hero />
      <SearchBar />
      <section className="cards-list" >
        {pets}
      </section>
      <div className="pagination">
        <Pagination />
      </div>
    </div>
  )
}
