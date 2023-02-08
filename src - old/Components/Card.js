import React from "react";
import {Link} from "react-router-dom";
import notAvailable from "../images/notAvailable.jpg"

export default function Card(props) {

    return (
          <div className="card" >
            <div className="pet-photo">
              <img className="pet--image" src={props.petImageFile ? `data:image/jpg;base64,${props.petImageFile }`: notAvailable} alt="Sorry we can't load the pet image."/>
            </div>
            <div className="pet-info">
              <p className="pet--name">{props.name}</p>
              <p className="pet--type">Type : {props.type}</p>
              <p className="pet--breed">Breed : {props.breed}</p>
              <p className="pet--sex">Sex : {props.sex}</p>
              <p className="pet--age">Age : {props.age} months</p>
              
              {props.isAuthenticated &&
                <button onClick={props.onClickDelete}>
                  Delete
                </button>
              }
              <Link to="/updateForm" className="Link-class">
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
