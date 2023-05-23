import React, {FC} from 'react';
import styles from "./Navbar.module.scss"
import logo from "./img/logo.svg"
import search from "./img/search.svg"
import settings from "./img/settings.svg"
import chats from './img/chats.svg'
import {TinderUser} from "../../types/TinderUser";
import {Link} from "react-router-dom";
import MyButton from "../UI/buttons/MyButton/MyButton";
import {FirestoreUsers} from "../../firebase/users";


interface INavbarProps {
    user: TinderUser
    isLogged: boolean
    onSignInSuper: (user: TinderUser) => void
    onSignOutSuper: () => void
}



const Navbar: FC<INavbarProps> = ({isLogged, user, onSignInSuper, onSignOutSuper}) => {

    const onClickSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const newUser = await FirestoreUsers.onSignIn(e)
        onSignInSuper(newUser)
    }

    return (
        <nav className={styles.nav}>
            <Link to={"/"}><img className={styles.logo} src={logo} alt=""/></Link>
            {isLogged
                ?
                <div className={styles.rightSide}>
                    <ul className={styles.rightSide__menu}>
                        <li className={styles.menu__item}><Link to="/search"><img src={search} alt=""/></Link></li>
                        <li className={styles.menu__item}><Link to="/chats"><img src={chats} alt=""/></Link></li>
                        <li className={styles.menu__item}><Link to="/settings"><img src={settings} alt=""/></Link></li>
                    </ul>
                    <Link to="/profile" className={styles.rightSide__profile}>
                        <div className={styles.profile__name}>{user.name}</div>
                        <div className={styles.profile__pic}><img src={user.mainImage.src} alt=""/></div>
                    </Link>
                </div>
                :
                <div className={styles.rightSide}>
                    <MyButton onClick={onClickSignIn}>Sign in</MyButton>
                </div>
            }


        </nav>
    );
};

export default Navbar;