import React from "react"
import Card from "./Components/Card"
import data from "./data.js"
import PetForm from "./Components/PetForm"
import About from "./Components/pages/About"
import Shop from "./Components/pages/Shop"
import {Route, Routes, useNavigate} from 'react-router-dom'
import Axios from "axios"
import Home from "./Components/pages/Home"
import removeEmptyAttributes from "./utils/functions"
import Login from "./Components/Login"
import SignUp from "./Components/SignUp"

export default function App() {
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
    const [signUpFormData, setSignUpFormData] = React.useState(
    {
            username: "",
            email: "",
            password: ""
    })
    const [loginFormData, setLogInFormData] = React.useState(
    {
            username: "",
            password: ""
    })
    const [selectedPetId,setSelectedPetId] = React.useState(-1);
    const [filteredPetList, setFilteredPedList] = React.useState(petList);
    const [selectedImageFile, setselectedImageFile] = React.useState();
    const [currentPage,setCurrentPage]= React.useState(1);
    const [totalPosts,setTotalPosts]= React.useState(0);
    const [numberOfPages, setNumberOfPages] = React.useState(0);

    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [token, setToken] = React.useState(null);

    const axiosLoggedIn = Axios.create({
      baseURL: 'your-base-url',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const postsPerPage=3;

    const navigate = useNavigate();

    React.useEffect(() => {
        Axios.get("http://localhost:3001/pets/postsCount/")
        .then((res) => {
          setTotalPosts(res.data)
        })
        .catch(err => console.log(err));

    },[])
    React.useEffect(() => {
      setNumberOfPages(Math.ceil(totalPosts/postsPerPage))
    })
    React.useEffect(() => {
      let pages={
        page:currentPage,
        limit:postsPerPage
      }
      Axios.get("http://localhost:3001/pets/petListPages/", {params: pages}).then((response) => {
        console.log("useEffect executed")
        setPetList(response.data.items)
      });
    },[currentPage])

    const generatePagesArray = () => {
      let pages = [];
      let i;
      for (i=1; i<=numberOfPages;i++) {
          pages.push(i)
      }
      return pages
    }
    const setCurrentPage = (page) => {
      setCurrentPage(page);
    }

    function handleLoginDataChange (event) {
      const {name, value} = event.target
      setLogInFormData(prevLogInFormData => {
          return {
              ...prevLogInFormData,
              [name]: value
          }
      })
    }

    function handleSignUpDataChange (event) {
      const {name, value} = event.target
      setSignUpFormData(prevSignUpFormData => {
          return {
              ...prevSignUpFormData,
              [name]: value
          }
      })
    }

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    const handleChangeFile = (event) => {
      const imageFile = event.target.files[0];
      setselectedImageFile(imageFile);
    }

    const signup = (event) => {
      //const hashedPassword = bcrypt.hashSync(password, 10);
      Axios.post("http://localhost:3001/user/register", signUpFormData)
        .then(response => alert("Registration is Complete"))
        .catch(error => alert(error));
      () => navigate('/')
    }

    const login = (event) => {
      Axios.post("http://localhost:3001/user/login", loginFormData)
      .then(response => {
        alert(`Logged in successfully !!`)
        const token= response.data.acces_token;
        console.log("token = " + token);
        setToken(token);
        setIsAuthenticated(true);
      })
      .catch(error => {
        console.error(error);
      });
      () => navigate('/')
    }

    const updateForm = (item) =>  {
      setSelectedPetId(item.id)
      const {id, ...data} = item
      setFormData(data)
    };

    const pets = petList.map(item => {
        return <Card
            key = {item.id}
            {...item}
            onClickDelete={() => deletePet(item.id)}
            onClickUpdate={() => updateForm(item)}
            isAuthenticated={isAuthenticated}
        />
    })

    const deletePet = (petId) => {
      axiosLoggedIn.delete(`http://localhost:3001/pets/delete/${petId}`)
        .then((response) => {
          console.log(`pet of id ${petId} has been deleted`)
          setPetList(oldPetList => oldPetList.filter(pet => pet.id != petId))
        })
        .catch((err) => console.log(err));
      () => navigate('/')
    }

    const addPet = (event) => {
        const data = new FormData();
        data.append("name", formData.name);
        data.append("type", formData.type);
        data.append("breed", formData.breed);
        data.append("age", formData.age);
        data.append("sex", formData.sex);
        data.append("imageFile", selectedImageFile);

        axiosLoggedIn.post("http://localhost:3001/pets/create",data)
          .then((response) => {console.log("response")
            setCurrentPage(numberOfPages)
            // setPetList ([
            //   ...petList,
            //   formData
            // ])
          })
          .catch((err) => alert(err));

        () => navigate('/')

    };

    const filterPet = (event) => {
      event.preventDefault();
      const newFormData = removeEmptyAttributes(formData) ;
      Axios.get("http://localhost:3001/pets/filter", {params: newFormData}).then((response) => {
        setPetList(response.data)
      });
    }

    const updatePet = (event) => {
      axiosLoggedIn.put(`http://localhost:3001/pets/update/${selectedPetId}`, formData)
           .then((response) => {
               const selectedPetIndex = petList.findIndex(pet => pet.id == selectedPetId)
               const item = {
                   id : selectedPetId,
                   ...formData
               }
               setPetList(oldPetList => {
                 oldPetList.splice(selectedPetIndex,1,item);
                 return oldPetList;
               })
             console.log(response)
           })
           .catch((err) => alert(err));
      () => navigate('/')
      event.preventDefault()
    }

    function handleExit() {
        () => navigate('/')
    }

    return (
        <div>
          <Routes>
              <Route path="/CreatePost" element={<PetForm onSubmit={addPet} update={false} handleExit={handleExit} handleChange={handleChange} handleChangeFile={handleChangeFile} formData={formData}/>} />
              <Route path="/updateForm" element={<PetForm onSubmit={updatePet} update={true} handleExit={handleExit} handleChange={handleChange} handleChangeFile={handleChangeFile} formData={formData}/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/Login" element={<Login handleChange={handleLoginDataChange} onSubmit={login} handleExit={handleExit}/>} />
              <Route path="/SignUp" element={<SignUp handleChange={handleSignUpDataChange} onSubmit={signup} handleExit={handleExit}/>} />
          </Routes>
          <Home pets={pets} onSearchSubmit={filterPet} handleChange={handleChange} formData={formData}
                pages={generatePagesArray()} setCurrentPage={setCurrentPage} currentPage={currentPage}
                isAuthenticated={isAuthenticated}
                />
        </div>
    )
}
