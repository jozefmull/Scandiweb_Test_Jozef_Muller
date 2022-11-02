import React, { Component } from 'react'
import { GlobalContext } from '../../context/GlobalState'
import { NavLink } from 'react-router-dom'

import Logo from '../../assets/images/logo.png'

import CurencyConverter from './CurencyConverter'
import MiniCart from '../Cart/MiniCart/MiniCart'
import MobileNav from './MobileNav'

import styles from '../../css/Nav.module.css'

export default class Nav extends Component {
    static contextType = GlobalContext

  render() {
    // get vals from context
    const {loading, categories, selectedCategory, changeCategory, error} = this.context
    
    return (
      <>
      <nav className={styles.navigation}>
        <div className={styles.navWrapper}>
          <div className={styles.linkWrapper}>
            {/* loading categories from initial query ? return null else map through categories and return nav links */}
            {loading ? null : 
              categories && categories.map((cat, i) => (
                <NavLink to={`/${cat.name}`} key={`${cat.name}-${i}`}
                  className={cat.name === selectedCategory.toLowerCase() ? styles.activeNavLink : null}
                  // on click change category in global state
                  onClick={(e) => changeCategory(e.target.innerHTML)}
                  draggable="false"
                >{cat.name}</NavLink>
              ))
            }
          </div>
          {/* centered logo */}
          <NavLink to='/' className={styles.logo} draggable="false"><img src={Logo} alt="logo" onClick={() => changeCategory('ALL')} draggable="false"/></NavLink>
          <div className={styles.right}>
            {/* if we have loading or error dont display this else display currency converter and minicart */}
            {loading || error ? null : (
              <>
                <CurencyConverter/>
                <MiniCart/>
              </>
            )}
          </div>
        </div>
      </nav>
      {/* mobile nav */}
      <MobileNav loading={loading} categories={categories} selectedCategory={selectedCategory} changeCategory={changeCategory}/>
      </>
    )
  }
}
