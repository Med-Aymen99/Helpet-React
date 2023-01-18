import React from "react"
import {VscChromeClose} from 'react-icons/vsc'

export default function SignUp(props) {
    return (
        <div>
            <form className="user-form form animate" onSubmit={props.onSubmit}>
                <div className="closeIcon" onClick={props.handleExit} >
                    <VscChromeClose />
                </div>
                <label htmlFor="username">username :</label>
                <input
                    required
                    type="text"
                    placeholder="insert your username"
                    onChange={props.handleChange}
                    name="username"
                />
                <br />
                <label htmlFor="email">email :</label>
                <input
                    required
                    type="text"
                    placeholder="insert your email"
                    onChange={props.handleChange}
                    name="email"
                />
                <br />
                <label htmlFor="password">password :</label>
                <input
                    required
                    type="password"
                    placeholder="insert your password"
                    onChange={props.handleChange}
                    name="password"
                />
                <br />
                <button>Sign Up</button>
            </form>
        </div>
    )
}
