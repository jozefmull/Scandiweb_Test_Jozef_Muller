import React, { Component } from 'react'

import { NavLink } from 'react-router-dom'

import styles from '../../css/Nav.module.css'

export default class MobileNav extends Component {
    // define state with openmobile nav set to false (initially closed)
    constructor(props) {
        super(props);
        this.state = {
            openMobileNav: false
        }
    }
    // handle opening mobile nav - set state to oposite of what we have
    handleMobileNav = () => {
        this.setState({
            openMobileNav: !this.state.openMobileNav
        })
    }
    // handle click on link - change category and set mobile nav to closed
    handleClickOnLink = (e) => {
        this.context.changeCategory(e.target.innerHTML)
        this.state.handleMobileNav()
    }

  render() {
    // get values from props / context
    const {loading, categories, selectedCategory} = this.props
    const {openMobileNav} = this.state

    return (
        <>
            {/* mobile nav is opened ? display mobile nav */}
            {openMobileNav ? (
                <div className={styles.mobileNavigation}>
                {/* if we are loading (categories) return null else map through categories and return navlinks */}
                {loading ? null : 
                    categories && categories.map((cat, i) => (
                        <NavLink to={`/${cat.name}`} key={`${cat.name}-${i}`}
                        className={cat.name === selectedCategory.toLowerCase() ? styles.activeNavLink : null}
                        onClick={(e) => this.handleClickOnLink(e)}
                        draggable="false"
                        >{cat.name}</NavLink>
                    ))
                }
            </div>
            // mobile nav is closed? return null
            ) : null}
            {/* burger element - on click set mobile nav to open / close  */}
            <div className={styles.burger} onClick={() => this.handleMobileNav()}>
                {/* display different icons depending on state of mobile nav */}
                {openMobileNav ? '✖' : '☰'}
            </div>
      </>
    )
  }
}
