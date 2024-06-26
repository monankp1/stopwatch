import React from 'react'
import styles from './Button.module.css'

const Button = ({ name, onClick }) => {
    return (
        <button onClick={onClick}>{name}</button>
    )
}

export default Button