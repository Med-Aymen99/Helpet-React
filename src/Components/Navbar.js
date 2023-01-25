import React, { useContext } from "react"
import helpetLogo from "../images/helpet.png"
import {Link} from "react-router-dom";
import { AuthContext } from "../utils/auth/AuthContext";
import { NavigationContext } from "../context/NavigationContext";
import useApi from './../utils/api';
import { PetContext } from './../context/PetContext';

export default function Navbar(props) {
	
	const {auth, handleLogout} = useContext(AuthContext);
	const {setPetList} = useContext(PetContext);
    let navigate = useContext(NavigationContext);  
	const api = useApi();
  
	const goHome = () => {
		navigate('/')
		window.location.reload();
	}

	const getMyPets = () => {
		console.log("in getMyPets")
        api.get("/pets/myProfile/")
        .then((response) => {
          setPetList(response.data)
        })
        .catch(err => console.log(err));
    }

	return (
		<nav className="nav--bar">
	
				<img
					className="nav--logo"
					src= {helpetLogo}
					alt= "helpet-logo"
					onClick={() => goHome()}
				/>

			
			<div className="buttons">
				<div>
					{auth.isAuthenticated &&
						<button className="nav--button">
							<Link to="/CreatePost" className="Link-class">
								Give up for adoption
							</Link>
						</button>
					}
						<button className="nav--button">
							<Link to="/about" className="Link-class">
									About Us
							</Link>
						</button>
				</div>
				<div>
					{!auth.isAuthenticated &&
						<>
							<button className="nav--button">
								<Link to="/Login" className="Link-class">
										Login
								</Link>
							</button>
							<button className="nav--button">
								<Link to="/SignUp" className="Link-class">
										Sign up
								</Link>
							</button>
						</>
					}
					{auth.isAuthenticated &&
						<>
							<button className="nav--button" >
								<Link to="/MyProfile" className="Link-class" onClick={() => getMyPets}>
									MyProfile
								</Link>
							</button>
							<button className="nav--button"
									onClick={ () => {handleLogout(); goHome()} }>
								Logout
							</button>
						</>
					}
				</div>
		    </div>
		</nav>

	)
}
