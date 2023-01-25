import React, { createContext, useContext } from "react";


export const PetContext = createContext();

const PetProvider = ({children}) => {
  const petInfo = {
    name: "",
    type: "",
    breed: "",
    age: "",
    sex: "",
    imageRef: ""
  }
  const [petList, setPetList] = React.useState(
    [{
        id: "",
      ...petInfo
    }]
  );
  const [addPetData, setaddPetData] = React.useState(
    {
      ...petInfo
    }
  )
  const [updatePetData, setUpdatePetData] = React.useState(
    {
      ...petInfo
    }
  )
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
    <PetContext.Provider value={{ petList, setPetList, addPetData, setaddPetData,
                                 searchData, setsearchData,
                                 filteredPetList,setFilteredPedList, 
                                 selectedPetId, setSelectedPetId, 
                                 selectedImageFile, setselectedImageFile,
                                 handleChangeImage, searchTrigger, setSearchTrigger,
                                 updatePetData, setUpdatePetData}}>
        {children}               
    </PetContext.Provider>
  );
};
export default PetProvider;
