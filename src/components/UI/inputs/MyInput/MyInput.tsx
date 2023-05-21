import React, {ChangeEvent, FC, SyntheticEvent, useState} from 'react';
import styles from "./MyInput.module.scss"

interface MyInputProps {
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}


const MyInput: FC<MyInputProps> = ({value, onChange}) => {
    const [currValue, setCurrValue] = useState(value)

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrValue(e.target.value)
        onChange(e)
    }

    return (
        <input type="text" value={value} onChange={handleInput} className={styles.input}/>
    );
};

export default MyInput;