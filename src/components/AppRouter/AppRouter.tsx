import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";
import EditProfile from "../EditProfile/EditProfile";
import SwipeCards from "../SwipeCards/SwipeCards";
import AuthPage from "../AuthPage/AuthPage";
import {TinderUser} from "../../types/TinderUser";
import {Navigate} from "react-router-dom";
import firebase from "firebase/compat";
import Chats from "../Chats/Chats";
import Chat from "../Chats/Chat/Chat";


interface IAppRouterProps {
    user: TinderUser,
    allUsers: TinderUser[]
    onSignIn: (user: TinderUser) => void
    onSignOut: () => void
    isLogged: boolean
    onSaveUser: (user: TinderUser) => void
}


const AppRouter: FC<IAppRouterProps> = ({user, allUsers, onSignIn, onSignOut, isLogged, onSaveUser}) => {
    return (
        isLogged ?
            <Routes>
                <Route path="/profile" element={<EditProfile onLogOut={onSignOut} onSaveUser={onSaveUser} user={user}/>}/>
                <Route path="/chats" element={<Chats allUsers={allUsers} user={user}/>}/>
                <Route path="/chats/:id" element={<Chat mod="full"  allUsers={allUsers} user={user}/>}/>
                <Route path="/" element={<SwipeCards currUser={user} users={allUsers}/>}/>
                <Route path="*" element={<Navigate to="/" replace />}/>
            </Routes>
            :
            <Routes>
                <Route path="/auth" element={<AuthPage onSignInSuper={onSignIn} onSignOutSuper={onSignOut}/>}/>
                <Route path="*" element={<Navigate to="/auth" replace />}/>
            </Routes>
    );
};

export default AppRouter;