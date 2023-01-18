import React from "react";
import {Link} from "react-router-dom";
import notAvailable from "../images/notAvailable.jpg"

export default function Card(props) {

    const imgName = props.imageRef
    let imagePath = notAvailable
    if (imgName!="") {
      imagePath = require(`C:/Users/USER/NestJsProjects/helpet/uploads/${imgName}`)
    }
    return (
          <div className="card" >
            <div className="pet-photo">
              <img className="pet--image" src={imagePath} alt="Sorry we can't load the pet image."/>
            </div>
            <div className="pet-info">
              <p className="pet--name">{props.name}</p>
              <p className="pet--type">Type : {props.type}</p>
              <p className="pet--breed">Breed : {props.breed}</p>
              <p className="pet--sex">Sex : {props.sex}</p>
              <p className="pet--age">Age : {props.age} months</p>
              <button onClick={props.onClickDelete}>
                Delete
              </button>
              <Link to="/updateForm">
                {props.isAuthenticated &&
                    <button onClick={props.onClickUpdate}>
                      Update
                    </button>
                }
              </Link>
            </div>
          </div>
    )
}
