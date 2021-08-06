
import React, {useContext, useState} from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import {UserContext} from "../../App";
import {useHistory, useLocation} from "react-router-dom";

firebase.initializeApp(firebaseConfig)
const provider = new firebase.auth.GoogleAuthProvider();
const providerFb = new firebase.auth.FacebookAuthProvider();

function Login() {
    const [user, setUser] = useState({
        issignIn: 'false',
        name: '',
        email: '',
        password: ''
    })
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [loggedInUser , setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false)
    const handlesignIn = () => {
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const {displayName, email} = res.user;
                const signIn = {
                    issignIn: true,
                    name: displayName,
                    email: email

                }
                setUser(signIn)
                history.replace(from);
            })
    }
    const handleFbSignIn = () =>{
        firebase
            .auth()
            .signInWithPopup(providerFb)
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })
    }
    const handlesignOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const usersignout = {
                    issignIn: false,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: ''
                }
                setUser(usersignout)
            }).catch((error) => {

        })
    }
    const getValue = (event) => {
        let isFromValid = true;
        if (event.target.name === 'email') {
            isFromValid = /\S+@\S+\.\S+/.test(event.target.value);

        }
        if (event.target.name === 'password') {
            const lengthValid = event.target.value.length > 6;
            const numberValid = /\d{1}/.test(event.target.value)
            isFromValid = lengthValid && numberValid;
        }
        if (isFromValid) {
            const copyState = {...user};
            copyState[event.target.name] = event.target.value;
            setUser(copyState);
        }

    }
    const getSubmit = (e) => {

        if ( newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const handleError = {...user};
                    handleError.error = '';
                    handleError.success = true;
                    setUser(handleError);
                })
                .catch((error) => {
                    const handleError = {...user};
                    handleError.error = error.message;
                    handleError.success = false;
                    setUser(handleError);
                })
        }
        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const handleError = {...user};
                    handleError.error = '';
                    handleError.success = true;
                    setLoggedInUser(handleError);
                    history.replace(from);
                    setUser(handleError);
                })
                .catch((error) => {
                    const handleError = {...user};
                    handleError.error = error.message;
                    handleError.success = false;
                    setUser(handleError);
                });
        }
        e.preventDefault()
    }

    return (
        <div style={{textAlign:'center'}}>
            {
                user.issignIn === true ? <button onClick={handlesignOut}>sign-out</button> :
                    <button onClick={handlesignIn}>sign-In</button>

            }
            <button onClick={handleFbSignIn}>Facebook</button>
            {
                <div>
                    <h3>Welcome To : {user.name} </h3>

                </div>
            }
            {
                <div>
                    <h1>Own Authentication</h1>
                    <input onChange={()=>setNewUser(!newUser)} type="checkbox" name="newUser" id="" />
                    <lebel htmlFor="newUser">Register</lebel>
                    <form onSubmit={getSubmit}>
                        { newUser && <input type="text" name="newUser" onBlur={getValue} id="" placeholder="Enter your name"
                                            required/>}
                        <br/>
                        <input type="email" name="email" onBlur={getValue} id="" placeholder="Enter your email"
                               required/>
                        <br/>
                        <input type="password" name="password" onBlur={getValue} id="" placeholder="Enter your password"
                               required/>
                        <br/>
                        <input type="submit" value="submit"/>
                    </form>

                    <p style={{color: 'red'}}>{user.error}</p>
                    {user.success && <p style={{color: 'green'}}>{newUser ? 'created' : 'logIn' } Successfully</p>}
                </div>
            }

        </div>
    );

};
export default Login;
