import React from 'react'
import logoFarmacia from '../img/pharmaplain1.png'

import styles from "./Header.module.css"


const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logoFarmacia} alt="logo farmácia" />
      <h1>PharmaPlain - Farmacologia Virtual</h1>
      <img src={logoFarmacia} alt="logo farmácia" />
    </header>
  )
}

export default Header