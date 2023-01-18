import React from "react"
import helpetLogo from "../images/helpet.png"
import {Link} from "react-router-dom";

export default function Navbar() {
	return (
		<nav className="nav--bar">
			<img
				className="nav--logo"
				src= {helpetLogo}
				alt= "helpet-logo"/>
			<div>
		    	<Link to="/form">
					<button className="nav--button">
						Give up for adoption
					</button>
				</Link>
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
		</nav>

	)
}
