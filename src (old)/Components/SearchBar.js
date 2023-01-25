import React from "react"
import {GoSearch} from 'react-icons/go'

export default function SearchBar(props) {
  return (
    <div className='search-container'>
      <form onSubmit={props.onSubmit} className="search-bar">
        <div className="criteria">
          <label htmlFor="type" >Pet type : </label>
          <select
            name="type"
            id="type"
            onChange={props.handleChange}
            value={props.addPetData.type}
          >
            <option selected value=""> Type </option>
            <option value="dog" /*defaultValue*/>dog</option>
            <option value="cat">cat</option>
            <option value="rabbit">rabbit</option>
            <option value="mouse">mouse</option>
            <option value="other">other</option>
          </select>
        </div>

        <div className="criteria">
          <label htmlFor="sex">Sex : </label>
          <select
            name="sex"
            id="sex"
            onChange={props.handleChange}
            value={props.addPetData.sex}
          >
            <option selected value=""> Sex </option>
            <option value="female" /*defaultValue*/>female</option>
            <option value="male">male</option>
          </select>
        </div>

        <div className="criteria">
          <label htmlFor="age">age (in months) :</label>
          <input
              name="age"
              type="number"
              placeholder="months"
              onChange={props.handleChange}
              value={props.addPetData.age}
          />
        </div>

        <div className="criteria">
          <button >
            <GoSearch />
            Search
          </button>
        </div>

      </form>
    </div>
  )
}
