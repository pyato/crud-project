import React, { useState, useContext } from "react";
import "../App.css";
import { FiXCircle } from "react-icons/fi";
import { UserContext } from './UserContext';
import axios from 'axios';
import { Route, Switch, Link, useRouteMatch } from "react-router-dom"

function UserTable() {
    const userContext = useContext(UserContext);

    function EditForm() {
        return (
            <div className="bg-edit-form">
                <div className="edit-form">
                    <div className="edit-close">
                        <button onClick={() => {
                            if (userContext.editCheck === false)
                                userContext.setEditCheck(true);
                            else
                                userContext.setEditCheck(false);
                            userContext.setFirstName("");
                            userContext.setLastName("");
                            userContext.setGender("");
                            userContext.setEmail("");
                            userContext.setID();
                        }}><FiXCircle size="25px" color="gray"/></button>
                    </div>
                    {userContext.formUser()}
                </div>
            </div>
        )
    }

    let data = userContext.userData.map((user) => {
        return (<tr>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.gender}</td>
            <td>{user.email}</td>
            <td>
                <button onClick={() => {
                    userContext.setFirstName(user.firstName);
                    userContext.setLastName(user.lastName);
                    userContext.setGender(user.gender);
                    userContext.setEmail(user.email);

                    if (userContext.editCheck === false) {
                        userContext.setEditCheck(true)
                        userContext.setID(user.id);
                    }
                    else
                        userContext.setEditCheck(false)
                }}>Edit</button>
                <button onClick={() => {
                    user.id.toString();
                    axios.delete(`/user/${user.id}`)
                        .then((req, res) => {
                            userContext.setUser({ sucsess: "sucsess" });
                            userContext.setID();
                        })
                        .catch(err => {
                            console.error("Error: ", err)
                        })
                }}>Delete</button>
            </td>
        </tr>)
    })

    console.log(userContext.ID);

    return (
        <div style={{overflow: "auto"}}>
            <table>
                <tr>
                    <th>ID</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                {data}
            </table>
                {userContext.editCheck ? EditForm() : <div></div>} 
        </div>
    )
}

export default UserTable;