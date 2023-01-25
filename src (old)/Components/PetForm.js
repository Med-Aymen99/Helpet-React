import React from "react"
import {VscChromeClose} from 'react-icons/vsc'

export default function PetForm(props) {

    return (
        <form onSubmit={props.onSubmit} className="pet-form animate form" >
            <div className="closeIcon" onClick={props.handleExit}>
                <VscChromeClose />
            </div>
            <label htmlFor="name">name</label>
            <input
                required
                type="text"
                placeholder="name"
                onChange={props.handleChange}
                name="name"
                value={props.addPetData.name}
            />
            <br />
            <label htmlFor="type">type</label>
            <input
                required
                type="text"
                placeholder="type"
                onChange={props.handleChange}
                name="type"
                value={props.addPetData.type}
            />
            <br />
            <label htmlFor="breed">breed</label>
            <input
                type="text"
                placeholder="breed"
                onChange={props.handleChange}
                name="breed"
                value={props.addPetData.breed}
            />
            <br />
            <label htmlFor="age">age (in months)</label>
            <input
                required
                type="number"
                placeholder="months"
                onChange={props.handleChange}
                name="age"
                value={props.addPetData.age}
            />
            <br />

            <fieldset>
                <legend>What is their sex?</legend>
                <input
                    required
                    type="radio"
                    id="male"
                    name="sex"
                    value="male"
                    checked={props.addPetData.sex === "male"}
                    onChange={props.handleChange}
                />
                <label htmlFor="male"> male</label>
                <br />
                <input
                    required
                    type="radio"
                    id="female"
                    name="sex"
                    value="female"
                    checked={props.addPetData.sex === "female"}
                    onChange={props.handleChange}
                />
                <label htmlFor="female"> female</label>
            </fieldset>
            <br />
            <label htmlFor="imageFile">upload image</label>
            <input
                type="file"
                onChange={props.handleChangeFile}
                name="imageFile"
                accept=".jpg"
            />
            <br />
            <button >
            {props.update ? "Update pet" : "Add pet"}
            </button>
        </form>
    )
}
