import React, { useContext } from "react"
import helpetLogo from "../images/helpet.png"
import {Link} from "react-router-dom";
import { AuthContext } from "../utils/auth/AuthContext";

export default function Navbar(props) {
	
	const {auth, handleLogout} = useContext(AuthContext);

	return (
		<nav className="nav--bar">
			<Link to="/" className="home-link">
				<img
					className="nav--logo"
					src= {helpetLogo}
					alt= "helpet-logo"
				/>
			</Link>
			
			<div className="buttons">
				<div>
					{auth.isAuthenticated &&
						<Link to="/CreatePost">
							<button className="nav--button">
								Give up for adoption
							</button>
						</Link>
					}
					<Link to="/about">
						<button className="nav--button">
							About Us
						</button>
					</Link>
					<Link to="/shop">
						<button className="nav--button">
							Shop Now
						</button>
					</Link>
				</div>
				<div>
					{!auth.isAuthenticated &&
						<>
							<Link to="/Login">
								<button className="nav--button">
									Login
								</button>
							</Link>
							<Link to="/SignUp">
								<button className="nav--button">
									Sign up
								</button>
							</Link>
						</>
					}
					{auth.isAuthenticated &&
						<>
							<Link to="/MyProfile">
								<button className="nav--button"
										
								>
									MyProfile
								</button>
							</Link>
							<button className="nav--button"
									onClick={handleLogout}>
								Logout
							</button>
						</>
					}
				</div>
		    </div>
		</nav>

	)
}
