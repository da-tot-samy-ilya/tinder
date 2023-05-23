import React, {useEffect, useState} from 'react';
import Navbar from "./components/Navbar/Navbar";
import {TinderUser} from "./types/TinderUser";
import AppRouter from "./components/AppRouter/AppRouter";
import {collection, getDocs} from "firebase/firestore"
import {FirestoreUsers} from "./firebase/users";
const App: React.FC = () => {
    const [user, setUser] = useState(TinderUser.defaultUser)
    const [isLogged, setIsLogged] = useState(false)
    const [users, setUsers] = useState<TinderUser[]>([])
    const onSignIn = (newUser: TinderUser) => {
        setUser(newUser)
        setIsLogged(true)
    }
    const onSignOut = () => {
        setIsLogged(false)
    }
    const editUser = (newUser: TinderUser) => {
        setUser(newUser)
    }
    const loadUsers = async () => {
        const data = await FirestoreUsers.getAllUsers()
        const arr = data.docs.map(el => ({...el.data(), id: el.id})).map(el => FirestoreUsers.firestoreToUsers(el))
        console.log(arr)
        setUsers(arr)

        setUser(arr.find(el => el.id === user.id) || user)

    }

    useEffect( () => {
        loadUsers()
    }, [isLogged])


  return (
    <div className="App">

            <Navbar user={user} isLogged={isLogged} onSignOutSuper={onSignOut} onSignInSuper={onSignIn}/>
            <div className="fit_container">
                <AppRouter onSaveUser={editUser} allUsers={users} user={user} onSignIn={onSignIn} onSignOut={onSignOut} isLogged={isLogged} />
            </div>
    </div>
  );
}

export default App;
