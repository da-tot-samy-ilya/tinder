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
import {TinderChat} from "../../types/TinderChat";


interface IAppRouterProps {
    user: TinderUser,
    allUsers: TinderUser[]
    onSignIn: (user: TinderUser) => void
    onSignOut: () => void
    isLogged: boolean
    onSaveUser: (user: TinderUser) => void
    chats: TinderChat[]
    addChat: (chat: TinderChat) => void
}


const AppRouter: FC<IAppRouterProps> = ({addChat, user, allUsers, onSignIn, onSignOut, isLogged, onSaveUser, chats}) => {
    return (
        isLogged ?
            <Routes>
                <Route path="/profile" element={<EditProfile onLogOut={onSignOut} onSaveUser={onSaveUser} user={user}/>}/>
                <Route path="/chats" element={<Chats chats={chats} user={user} allUsers={allUsers}/>}/>
                <Route path="/chats/:id" element={<Chat allChats={chats} currUser={user}/>}/>
                <Route path="/" element={<SwipeCards addChat={addChat} chats={chats} currUser={user} users={allUsers}/>}/>
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