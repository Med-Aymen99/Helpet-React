import React, { useContext } from "react"
import { PetContext } from './../context/PetContext';
import { AuthContext } from './../utils/auth/AuthContext';
import useApi from './../utils/api';
import { NavigationContext } from './../context/NavigationContext';
import Card from './../Components/Card';

export default function MyProfile(props) {
    const {auth} = useContext(AuthContext)
    const {petList, setPetList, setUpdatePetData, setSelectedPetId} = useContext(PetContext);    
    let navigate = useContext(NavigationContext);  
	const api = useApi();
	
	const getMyPets = () => {
		console.log("in getMyPets")
        api.get("/pets/myProfile/")
        .then((response) => {
		  console.log(response)
          setPetList(response.data)
        })
        .catch(err => console.log(err));
    }
	getMyPets()

    const deletePet = (petId) => {
        api.delete(`pets/delete/${petId}`)
            .then((response) => {
            console.log(`pet of id ${petId} has been deleted`)
            setPetList(oldPetList => oldPetList.filter(pet => pet.id != petId))
            })
            .catch((err) => console.log(err));
        navigate('/')
    }
    const updateForm = (item) =>  {
        setSelectedPetId(item.id)
        const {id, ...data} = item
        setUpdatePetData(data)
      };
    
    const pets = petList.map(item => {
        return <Card
            key = {item.id}
            {...item}
            onClickDelete={() => deletePet(item.id)}
            onClickUpdate={() => updateForm(item)}
            isAuthenticated={auth.isAuthenticated}
        />
      })
    
    const user = auth.user || JSON.parse(localStorage.getItem('user'))
    return(
    <div className="page-content">
        <h1 className="welcome-user">Welcome {user.username}</h1>
        <h2>These are your adoption posts :</h2>
        <section className="cards-list" >
            {pets}
        </section>
    </div>
    )

}