import React from 'react'
import PropTypes from 'prop-types'

import {
  // amendmentFullTextLink,
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

  _renderAdditionalAmendmentSection () {
    const { amendmentGroup } = this.props

    if (amendmentGroup.additionalLinks && amendmentGroup.additionalLinks.length > 0) {
      const { additionalLinks } = amendmentGroup

      return (
        <div className={styles['amendment-additional-info-section']}>
          Additional Information:
          <ul className={styles['additional-information-links']}>
            {additionalLinks.map((additionalLink, i) =>
              (
                <li key={i}><a href={additionalLink.url}>{additionalLink.name}</a></li>
              )
            )}
          </ul>
        </div>
      )
    }
    else {
      return null
    }
  }

  _renderHonoluluAmendment = () => {
    return (
      <div>
      Shall the Revised Charter of the City and County of Honolulu 1973 (2017 Edition) relating to the board of the Honolulu Authority for Rapid Transportation (the “Board”) be amended:
        <ol>
          <li>To increase the number of Board members from ten to a maximum of fifteen;</li>
          <li>To provide that the President of the Hawaii State Senate and the Speaker of the Hawaii State House of Representatives may each appoint up to two non-voting members, for terms to be determined by the appointing authority;</li>
          <li>To provide that the City Council may appoint one additional voting member;</li>
          <li>To specify that six members shall constitute a quorum; and</li>
          <li>To specify that the affirmative vote of a majority of all voting members of the Board shall be necessary to take any action, and such action shall be made at a meeting open to the public?</li>
        </ol>
      </div>
    )
  }

  _renderDescription = (amendment) => {
    const { contest_id, description } = amendment

    if ("Hon1" === contest_id) {
      return this._renderHonoluluAmendment()
    }
    else {
      return (
        <div>{description}</div>
      )
    }
  }

  _renderAmendment = (amendment, i) => {
    const { amendmentGroup } = this.props
    const amendmentNumber = i + 1

    // TODO: Surface this somehow
    // const fullTextLink = amendmentFullTextLink(amendmentGroup.name, amendmentNumber)
    const descriptionLink = amendmentDescriptionLink(amendmentGroup.name, amendmentNumber)
    const { additionalLinks } = amendment

    return (
      <div key={amendment.contest_id} className={styles['amendment-name']}>
        <a href={descriptionLink}
          className={styles['amendment-link']}
          target="_blank"
        >
          <div className={styles['relating-to']}>Relating to</div>
          {this._renderSingleAmendmentName(amendment.Contest_Name)}
        </a>
        <div className={styles['amendment-description']}>{this._renderDescription(amendment)}</div>
        <div className={styles['amendment-description']}>{this._renderAmendmentLinks(additionalLinks)}</div>
      </div>
    )
  }

  _renderAmendmentLinks = (additionalLinks) => {
    if (additionalLinks && additionalLinks.length > 0) {
      return (
        <div>
          {additionalLinks.map((additionalLink, i) =>
            (
              <div key={i}><a href={additionalLink.url}>{additionalLink.name}</a></div>
            )
          )}
        </div>
      )
    }
    else {
      return null
    }
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
        </div>
        {this._renderAdditionalAmendmentSection()}
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
