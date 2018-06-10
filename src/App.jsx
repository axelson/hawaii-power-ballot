import React, { Component } from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

import AdminHeader from 'src/components/global/AdminHeader'
import Header from 'src/components/global/Header'
import Footer from 'src/components/global/Footer'

import BallotPage from 'src/components/BallotPage'
import Home from 'src/components/home/Home'
import StatewideBallotPage from 'src/components/StatewideBallotPage'
import AdminCandidatePage from 'src/components/AdminCandidatePage'
import AdminHomePage from 'src/components/admin/AdminHomePage'

export default class App extends Component {
  state = {
    matchedAddress: '',
    matchedCoordinates: {},
  }

  _updateMatchedAddress = (matchedAddress) => this.setState({matchedAddress})
  _updateMatchedCoordinates = (matchedCoordinates) => this.setState({matchedCoordinates})

  _renderAdminHomePage = () => {
    return (
      <AdminHomePage />
    )
  }
  _renderHomePage = () => {
    return (
      <Home
        updateMatchedAddress={this._updateMatchedAddress}
        updateMatchedCoordinates={this._updateMatchedCoordinates}
      />
    )
  }

  _renderBallotPage = (props) => {
    const { matchedAddress, matchedCoordinates } = this.state
    return <BallotPage {...props} matchedAddress={matchedAddress} matchedCoordinates={matchedCoordinates} />
  }

  render() {
    // const adminNav = (
    //   <ul>
    //     <li><Link to="/">Home</Link></li>
    //     <li><Link to="/statewide">View Statewide Ballot</Link></li>
    //     <li><Link to="/ballot/13-04">View Example Ballot</Link></li>
    //     <li><a href="/admin/candidate/USSe">Edit Example Candidate</a></li>
    //   </ul>
    // )

    return <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact render={this._renderHomePage} />
          <Route path="/statewide" component={StatewideBallotPage} />
          <Route path="/ballot/:precinct" render={this._renderBallotPage} />
          <Route path="/admin" exact render={this._renderAdminHomePage} />
          <Route path="/admin/candidate" component={AdminCandidatePage} />
          <Route component={NoMatch} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  }
}

const NoMatch = () => (
  <div className='row'>
    <h2>Whoops</h2>
    <p>Sorry but we weren't able to find the page you were looking for</p>
    <Link to="/">Start Over</Link>
    <br />
    <br />
    <br />
    <br />
  </div>
)
