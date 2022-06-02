import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

const UserContext = createContext();
const { Provider } = UserContext;

const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState([{}]);
    const [user, setUser] = useState({});
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [editCheck, setEditCheck] = useState(false);
    const [ID, setID] = useState();

    //Get list user
    useEffect(() => {
        axios.get('/user')
            .then(res => setUserData(res.data))
    }, [user])

    function formUser() {
        return (
            <>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="first name" />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="last name" />
                <div className="radio-form">
                    <label>gender</label>
                    <input
                        type="radio"
                        value="male"
                        checked={gender === "male"}
                        onChange={(e) => { setGender(e.target.value) }} />
                    <label>male</label>
                    <input
                        type="radio"
                        value="female"
                        checked={gender === "female"}
                        onChange={(e) => { setGender(e.target.value) }} />
                    <label>female</label>
                </div>

                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email" />
                {editCheck === true ?
                    <button onClick={submitEditUser}>Save</button> :
                    <button onClick={submitNewUser}>Add</button>
                }
            </>
        )
    }

    function submitNewUser() {
        let lastId, id

        if (userData.length > 0) {
            lastId = userData[userData.length - 1].id;
            id = parseInt(lastId) + 1;
        }
        else {
            id = 1
        }
        id.toString();
        let user = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            email: email
        };

        //Post new user
        axios.post('/user', user)
            .then((req, res) => {
                setFirstName("");
                setLastName("");
                setGender("");
                setEmail("");
                setUser(user);
            })
            .catch(err => {
                console.error("Error: ", err)
            })
    }

    function submitEditUser() {
        ID.toString();
        let user = {
            id: ID,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            email: email
        }
        axios.put(`/user/${ID}`, user)
            .then((req, res) => {
                console.log("sucsess");
                setEditCheck(false);
                setFirstName("");
                setLastName("");
                setGender("");
                setEmail("");
                setUser(user);
            })
            .catch(err => {
                console.error("Error: ", err)
            })
    }

    function submitDelete() {
        ID.toString();
        console.log(ID)
        setTimeout(() => {
            axios.delete(`/user/${ID}`)
                .then((req, res) => {
                    setID();
                })
                .catch(err => {
                    console.error("Error: ", err)
                })
        }, 1000)
    }

    return (
        <Provider
            value={{
                userData,
                setUserData,
                setUser,
                firstName,
                setFirstName,
                lastName,
                setLastName,
                gender,
                setGender,
                email,
                setEmail,
                editCheck,
                setEditCheck,
                ID,
                setID,
                formUser: () => formUser(),
                submitDelete: () => submitDelete()
            }}
        >
            {children}
        </Provider>
    )
}

export { UserContext, UserProvider };