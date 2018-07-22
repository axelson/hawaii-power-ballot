import React from 'react'
import PropTypes from 'prop-types'

import Autosuggest from 'react-autosuggest'

// eslint-disable-next-line import/named
import { getSuggestions } from 'server/services/arc_gis'

import styles from './find-your-ballot.scss'

export default class FindYourBallot extends React.Component {

  state = {
    suggestions: [],
    debouncing: false,
  }

  _getSuggestions = (address) => {
    const { debouncing } = this.state

    // Reset the debounce timer if it is already in the process
    if (debouncing) {
      clearTimeout(debouncing)
      this.setState({debouncing: false})
    }

    if (!!address) {
      const currentTimeout = setTimeout(() => {
        getSuggestions(address).then((result) => {
          this.setState({
            suggestions: result,
            debouncing: false,
          })
        })
      }, 200)

      this.setState({debouncing: currentTimeout})
    }
  }

  _getSuggestionValue = suggestion => {
    return suggestion.text
  }

  // Use your imagination to render suggestions.
  _renderSuggestion = suggestion => (
    <div className={styles['suggestion']}>
      {suggestion.text}
    </div>
  )

  _onSuggestionsFetchRequested = ({ value }) => {
    this._getSuggestions(value)
  }

  _onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  render () {
    const { fetching, onChange, onKeyPress, value, onSubmitHandler, onSuggestionSelected } = this.props
    const { suggestions } = this.state

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type your address (street address, city, state, zip) here to get YOUR Power Ballot',
      value: value,
      onChange: onChange,
      onKeyPress: onKeyPress,
    }

    return (
      <div className={styles['container']}>
        <div className='row'>
          <div className={styles['feature']}>
            Find <i>Your</i>&nbsp; “Power Ballot”
          </div>
          <div className={styles['input-container']}>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this._onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this._onSuggestionsClearRequested}
              onSuggestionSelected={onSuggestionSelected}
              getSuggestionValue={this._getSuggestionValue}
              renderSuggestion={this._renderSuggestion}
              inputProps={inputProps}
            />
            <div className={styles['go-button']} onClick={onSubmitHandler}>
              GO
            </div>
          </div>
          {fetching ? 'searching...': null}
          <div className={styles['instructions']}>
            * This is the address you listed when you registered to vote, most likely your home address. If you're unsure of which address is associated with your voter registration and want to check your voter file OR you still need to register to vote visit <a href="https://olvr.hawaii.gov/">https://olvr.hawaii.gov/</a>
          </div>
        </div>
      </div>
    )
  }
}

FindYourBallot.propTypes = {
  fetching: PropTypes.bool,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  value: PropTypes.string,
  onSubmitHandler: PropTypes.func,
  onSuggestionSelected: PropTypes.func,
}
