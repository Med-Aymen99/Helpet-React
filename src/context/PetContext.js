import React, { createContext, useContext } from "react";


export const PetContext = createContext();

const PetProvider = ({children}) => {

  const [petList, setPetList] = React.useState(
    [
      {
        id:"",
        name: "",
        type: "",
        breed: "",
        age: "",
        sex: "",
        imageRef: ""
      }
   ]
  );
  const [formData, setFormData] = React.useState(
  {
          name: "",
          type: "",
          breed: "",
          age: "",
          sex: "",
          imageRef: ""
  })
  const [searchData, setsearchData] = React.useState(
  {
          type: "",
          age: "",
          sex: "",
  })
  const [filteredPetList, setFilteredPedList] = React.useState(petList);
  const [selectedPetId,setSelectedPetId] = React.useState(-1);
  const [selectedImageFile, setselectedImageFile] = React.useState();
  const [searchTrigger, setSearchTrigger] = React.useState(false)
  
  const handleChangeImage = (event) => {
    const imageFile = event.target.files[0];
    setselectedImageFile(imageFile);
  }
 
  return (
    <PetContext.Provider value={{ petList, setPetList, formData, setFormData,
                                 searchData, setsearchData,
                                 filteredPetList,setFilteredPedList, 
                                 selectedPetId, setSelectedPetId, 
                                 selectedImageFile, setselectedImageFile,
                                 handleChangeImage, searchTrigger, setSearchTrigger}}>
        {children}               
    </PetContext.Provider>
  );
};
export default PetProvider;
