import React, { Component } from 'react'
import { GlobalContext } from '../../context/GlobalState'

import Arr from '../../assets/images/arr_down.png'

import styles from '../../css/CurrConv.module.css'

export default class CurencyConverter extends Component {
    static contextType = GlobalContext
    // define state with openConverter value (initially it is closed - false)
    constructor(props) {
        super(props);
        this.state = {
            openConverter: false
        }
    }
    // hadnle displaying converter - set state to oposite of what e have in state
    handleOpenConverter(){
       this.setState({
            openConverter: !this.state.openConverter
        })
    }

  render() {
    // get values from context
    const {loading, currencies, selectedCurrency, changeCurrency} = this.context

    return (
        <div className={styles.navCurrConv} onClick={() => this.handleOpenConverter()}>
            {/* if we are not loading and we have currencies from initial query display element */}
            {!loading && currencies ? (
                <span>{selectedCurrency.symbol}</span>
            ) : null}
            <img src={Arr} alt="curr_arr" className={this.state.openConverter ? styles.opened : null} draggable="false"/>
            {/* if we have opened converter display ul with currencies*/}
            {this.state.openConverter ? (
                <ul className={styles.currUl}>
                    {/* if we have currencies map through them and return li with symbols and labels */}
                    {currencies && currencies.filter(curr => curr.label !== selectedCurrency.label).map((curr,id) => (
                        <li key={`${curr.label}-${id}`}
                            //on click change currency in global state to clicked one
                            onClick={(e) => changeCurrency({
                                symbol: e.target.getAttribute('curr-symbol'),
                                label: e.target.getAttribute('curr-label')
                            })}
                            curr-label={curr.label}
                            curr-symbol={curr.symbol}
                        >
                            {curr.symbol} {curr.label}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    )
  }
}
