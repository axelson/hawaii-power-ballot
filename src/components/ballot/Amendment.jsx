import React, { PropTypes } from 'react'

import {
  HONOLULU_CHARTER_AMMENDMENTS_PDF,
  amendmentFullTextLink,
  amendmentDescriptionLink,
  getAmendmentGroupTitle,
} from 'src/services/amendment_utils.js'

import styles from './amendment.scss'

export default class Amendment extends React.Component {
  _renderAmendmentGroupName () {
    const { amendmentGroup } = this.props
    return getAmendmentGroupTitle(amendmentGroup.name)
  }

  _renderSingleAmendmentName (contestName) {
    const n = contestName.indexOf(':')
    const nameWithoutPrefix = contestName.substring(n !== -1 ? n+1 : 0)
    return nameWithoutPrefix.trim().replace(/^Relating to/,'')
  }

  _renderAdditionalAmmendmentInfo () {
    const { amendmentGroup } = this.props
    switch (amendmentGroup.name) {
    case 'HONOLULU CHARTER AMEND':
      return (
        <span>
          &nbsp;You may also view the official <a href={HONOLULU_CHARTER_AMMENDMENTS_PDF} target="_blank">2016 Honolulu Charter Amendments Brochure</a>
        </span>
      )
    default:
      return null
    }
  }

  _renderAmendment = (amendment, i) => {
    const { amendmentGroup } = this.props
    const amendmentNumber = i + 1

    // TODO: Surface this somehow
    // const fullTextLink = amendmentFullTextLink(amendmentGroup.name, amendmentNumber)
    const descriptionLink = amendmentDescriptionLink(amendmentGroup.name, amendmentNumber)

    return (
      <div key={amendment.Contest_ID} className={styles['amendment-name']}>
        <a href={descriptionLink}
          className={styles['amendment-link']}
          target="_blank"
        >
          <div className={styles['relating-to']}>Relating to</div>
          {this._renderSingleAmendmentName(amendment.Contest_Name)}
        </a>
      </div>
    )
  }

  render () {
    const { amendmentGroup } = this.props
    const { contests } = amendmentGroup

    return (
      <div>
        <div className={styles['header']}>
          <div className={styles['proposed-text']}>Proposed Amendments to the</div>
          <div>{this._renderAmendmentGroupName()}</div>
        </div>
        <div className={styles['amendment-group-description']}>
          The following lists the related topics for the proposed {this._renderAmendmentGroupName()} amendments. You can vote YES or NO on each proposed amendment.
          {this._renderAdditionalAmmendmentInfo()}
        </div>
        <div className={styles['amendment-list']}>
          {contests.map(this._renderAmendment)}
        </div>
      </div>
    )
  }
}

Amendment.propTypes = {
  amendmentGroup: PropTypes.object,
}
