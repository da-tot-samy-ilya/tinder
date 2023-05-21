import React, {ChangeEvent, FC, useState} from 'react';
import styles from "./InterestsStore.module.scss"
import MySelect from "../UI/selects/MySelect/MySelect";
import {InterestClass} from "../../types/InterestClass";
import MyButton from "../UI/buttons/MyButton/MyButton";
import Interest from "../UI/Interest/Interest";
import {InterestClasses} from "../../types/InterestClasses";

interface IInterestsStoreProps {
    interests: InterestClass[]
    onSubmit: (e: React.MouseEvent<HTMLButtonElement>, interestIP: number, type: "add" | "remove") => void
}


const InterestsStore: FC<IInterestsStoreProps> = ({onSubmit, interests}) => {
    const [interestsValue, setInterestsValue] = useState([...interests])

    const [selectedValueID, setSelectedValueID] = useState(-1)
    const [isSelected, setIsSelected] = useState(false)
    const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "none") setIsSelected(false)
        else {
            setIsSelected(true)
            setSelectedValueID(+e.target.value)
        }
    }


    const onAddInterest = (e: React.MouseEvent<HTMLButtonElement>) => {
        let newInterest = Object.values(InterestClasses).find(el => el.id === selectedValueID) || InterestClasses.Pizza
        setInterestsValue([...interestsValue, newInterest])



        setIsSelected(false)
        console.log("onAddInterest")
        onSubmit(e, newInterest.id, "add")
    }

    const onRemoveInterest = (e: React.MouseEvent<HTMLButtonElement>) => {
        setInterestsValue(interestsValue.filter(el => el.id !== +(e.target as HTMLElement).id))
        onSubmit(e, +(e.target as HTMLElement).id, "remove")

    }


    const selectInterests = Object.values(InterestClasses).filter(el =>
        interestsValue.map(el => el.toString()).indexOf(el.toString()) === -1
    )
    return (
        <div className={styles.store}>
            <div className={styles.interests}>
                {interestsValue.map(el => <Interest removable id={el.id} onRemove={onRemoveInterest} hasMarginTop="5px" hasMarginLeft="5px" color={el.color} key={el.id}>{el.name}</Interest>)}
            </div>
            <MySelect hasMarginLeft="10px" options={selectInterests} onChangeSuper={onSelect}/>
            <MyButton isDisabled={!isSelected} hasMarginLeft="10px" onClick={onAddInterest}>Add interest</MyButton>
        </div>
    );
};

export default InterestsStore;