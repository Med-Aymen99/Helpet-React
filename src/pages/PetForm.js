import React, { useContext } from "react"
import { NavigationContext } from "../context/NavigationContext";
import { PetContext } from "../context/PetContext"
import useApi from '../utils/api';
import { PaginationContext } from '../context/PaginationContext';
import { handleChangeFunc } from "../utils/generalFunctions";

export default function PetForm(props) {
    const {petList, setPetList, addPetData, setaddPetData, selectedPetId,
             selectedImageFile, handleChangeImage,
            updatePetData, setUpdatePetData} = useContext(PetContext);
    
    const navigate = useContext(NavigationContext);
    const {setCurrentPage, numberOfPages} = useContext(PaginationContext)

    const api = useApi();
    
    const formData = props.update ? updatePetData : addPetData ;
    console.log("updateFormData: " ,updatePetData)
    console.log("addFormData: " , addPetData)
    const setFormData = props.update ? setUpdatePetData : setaddPetData ;

    const handleChange = handleChangeFunc(setFormData);

    const addPet = (event) => {
        const data = new FormData();
        data.append("name", addPetData.name);
        data.append("type", addPetData.type);
        data.append("breed", addPetData.breed);
        data.append("age", addPetData.age);
        data.append("sex", addPetData.sex);
        data.append("imageFile", selectedImageFile);

        api.post("pets/create",data)
        .then((response) => {console.log("response")
            setCurrentPage(numberOfPages)
            // setPetList ([
            //   ...petList,
            //   addPetData
            // ])
        })
        .catch((err) => alert(err));

        //const navigate = useContext(NavigationContext);
        navigate('/')
    };
    const updatePet = (event) => {
        api.put(`/pets/update/${selectedPetId}`, updatePetData)
        .then((response) => {
            const selectedPetIndex = petList.findIndex(pet => pet.id == selectedPetId)
            const item = {
                id : selectedPetId,
                ...updatePetData
            }
            setPetList(oldPetList => {
                oldPetList.splice(selectedPetIndex,1,item);
                return oldPetList;
            })
            console.log(response)
        })
        .catch((err) => alert(err));
    
        //const navigate = useContext(NavigationContext);
        navigate('/')
        event.preventDefault()
      }

    return (
        <div className="PetForm">
            <div className="form-container">
                <form onSubmit={props.update ? updatePet : addPet} className="pet-form animate form" >
                <h1>{props.update ? "Update Your Post" : "Give up for adoption"}</h1>
                    <div className="fields">
                        <div>
                            <div className="form-field">
                                <label htmlFor="name">name</label>
                                <input
                                    type="text"
                                    placeholder="name"
                                    onChange={handleChange}
                                    name="name"
                                    value={formData.name}
                                />
                                <br />
                            </div>
                            <div className="form-field">
                                <label htmlFor="type">type</label>
                                <input
                                    type="text"
                                    placeholder="type"
                                    onChange={handleChange}
                                    name="type"
                                    value={formData.type}
                                />
                                <br />
                            </div>
                            <div className="form-field">
                                <fieldset>
                                    <legend>What is their sex?</legend>
                                    <input
                                        type="radio"
                                        id="male"
                                        name="sex"
                                        value="male"
                                        checked={formData.sex === "male"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="male"> male</label>
                                    <br />
                                    <input
                                        type="radio"
                                        id="female"
                                        name="sex"
                                        value="female"
                                        checked={formData.sex === "female"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="female"> female</label>
                                </fieldset>
                                <br />
                            </div>
                        </div>
                        <div>
                            <div className="form-field">
                                <label htmlFor="age">age (in months)</label>
                                <input
                                    type="number"
                                    placeholder="months"
                                    onChange={handleChange}
                                    name="age"
                                    value={formData.age}
                                />
                                <br />
                            </div>
                            <div className="form-field">
                                <label htmlFor="breed">breed</label>
                                <input
                                    type="text"
                                    placeholder="breed"
                                    onChange={handleChange}
                                    name="breed"
                                    value={formData.breed}
                                />
                                <br />
                            </div>
                            <div className="form-field">
                                <label htmlFor="image">upload image</label>
                                <input
                                    type="file"
                                    onChange={handleChangeImage}
                                    name="image"
                                    // accept=".jpg"
                                />
                                <br />
                            </div>
                        </div>
                    </div>
                    <button >
                    {props.update ? "Update pet" : "Add pet"}
                    </button>
                </form>
            </div>
        </div>
        
    )
}
