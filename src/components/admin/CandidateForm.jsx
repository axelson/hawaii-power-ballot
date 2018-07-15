import React from 'react'
import PropTypes from 'prop-types'

import CandidateFormField from './CandidateFormField'

import styles from './candidate-form.scss'

const ignoredFields = [
  'id',
  'Candidate_ID',
  'created_at',
  'updated_at',
  'incumbent_text',
  'Office',
  'Party',
  'District',
  'name_party',
  'party_text',
  'photo_width',
  'office_district',
  'OE_SORT_ID',
  'FTMORG_ID',
]

export default class CandidateForm extends React.Component {

  _renderField(candidate, fieldName, index) {
    const { updateCandidateField } = this.props

    return (
      <CandidateFormField
        fieldName={fieldName}
        value={candidate[fieldName]}
        updateCandidateField={updateCandidateField}
        key={index} />
    )
  }

  render () {
    const { candidate, saveCandidate } = this.props

    return (
      <div>
        <div className={styles['candidate-form']}>
          { Object.keys(candidate).map((fieldName, index) => {
            if (!ignoredFields.includes(fieldName)) {
              return this._renderField(candidate, fieldName, index)
            }
          }) }
        </div>

        <div className={styles['save-button']} onClick={saveCandidate}>
          SAVE
        </div>

      </div>
    )
  }
}

CandidateForm.propTypes = {
  candidate: PropTypes.object,
  updateCandidateField: PropTypes.func.isRequired,
  saveCandidate: PropTypes.func.isRequired,
}
