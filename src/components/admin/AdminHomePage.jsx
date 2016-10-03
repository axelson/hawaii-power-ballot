import React, { PropTypes } from 'react'

import { getStatewideBallot } from 'src/services/api'

import Loading from 'src/components/ballot/Loading'
import AdminHome from './AdminHome'

import styles from './admin-home-page.scss'

export default class AdminHomePage extends React.Component {
  state = {
    ballot: {},
    hasData: false,
  }
  fetching = false

  _hasData () {
    return this.state.hasData
  }

  componentDidMount() {
    getStatewideBallot().then((data) => {
      this.setState({
        ballot: data.ballot,
        hasData: true,
      })
      this.fetching = false

      console.log('Done fetching data')
    })
  }

  _renderLoading () {
    return <div className={styles['loading-container']}>
      <Loading />
    </div>
  }

  render () {
    const { } = this.props
    const { ballot } = this.state
    if (!this._hasData()) return this._renderLoading()

    return (
      <div>
        <AdminHome candidates={ballot.contests[0].candidates} />
      </div>
    )
  }
}

AdminHomePage.propTypes = {
}
