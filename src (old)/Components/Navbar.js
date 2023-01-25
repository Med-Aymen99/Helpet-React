import React from "react"
import helpetLogo from "../images/helpet.png"
import {Link} from "react-router-dom";

export default function Navbar(props) {
	return (
		<nav className="nav--bar">
			<img
				className="nav--logo"
				src= {helpetLogo}
				alt= "helpet-logo"/>
			<div className="buttons">
				<div>
					{props.isAuthenticated &&
						<Link to="/CreatePost" >
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
				</div>
		    </div>
		</nav>

	)
}
