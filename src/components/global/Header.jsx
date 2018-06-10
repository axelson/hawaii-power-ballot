import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AdminHeader from './AdminHeader'
import PublicHeader from './PublicHeader'

export default class Header extends React.Component {
  render () {
    const { } = this.props

    return <Switch>
      <Route path="/admin" component={AdminHeader} />
      <Route component={PublicHeader} />
    </Switch>
  }
}
