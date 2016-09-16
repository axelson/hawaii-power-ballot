exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('candidate_metadata', function(table) {
      table.text('Office')
      table.text('District')
      table.text('Party')
      table.text('FEC_CAND_ID')
      table.text('OE_SORT_ID')
      table.text('FTMORG_ID')
      table.text('name_party')
      table.text('office_district')
      table.text('incumbent_text')
      table.text('photo_url')
      table.text('photo_width')
      table.text('photo_source_text')
      table.text('party_text')
      table.text('occupation')
      table.text('cc_name')
      table.text('cc_chair')
      table.text('cc_treasurer')
      table.text('cc_report_url')
      table.text('cand_website_url')
      table.text('cand_email')
      table.text('cand_facebook_url')
      table.text('cand_twitter_url')
      table.text('cand_linked')
      table.text('csc_standard_url')
      table.text('csc_special_url')
      table.text('fec_url')
      table.text('gov_website_url')
      table.text('lwv_website_url')
      table.text('ftm_website_url')
      table.text('pvs_website_url')
      table.text('bp_website_url')
      table.text('wp_website_url')
      table.text('cb_website_url')
      table.text('volunteer')
      table.text('bio_cred_url')
      table.text('bio_cred_text')
      table.text('bio')
      table.text('CC_Reg_No')
      table.text('FEC_CC_ID')
      table.text('pbs_hawaii_url')
      table.text('expenditure_viz_url')
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('candidate_metadata', function(table) {
      table.dropColumn('Office')
      table.dropColumn('District')
      table.dropColumn('Party')
      table.dropColumn('FEC_CAND_ID')
      table.dropColumn('OE_SORT_ID')
      table.dropColumn('FTMORG_ID')
      table.dropColumn('name_party')
      table.dropColumn('office_district')
      table.dropColumn('incumbent_text')
      table.dropColumn('photo_url')
      table.dropColumn('photo_width')
      table.dropColumn('photo_source_text')
      table.dropColumn('party_text')
      table.dropColumn('occupation')
      table.dropColumn('cc_name')
      table.dropColumn('cc_chair')
      table.dropColumn('cc_treasurer')
      table.dropColumn('cc_report_url')
      table.dropColumn('cand_website_url')
      table.dropColumn('cand_email')
      table.dropColumn('cand_facebook_url')
      table.dropColumn('cand_twitter_url')
      table.dropColumn('cand_linked')
      table.dropColumn('csc_standard_url')
      table.dropColumn('csc_special_url')
      table.dropColumn('fec_url')
      table.dropColumn('gov_website_url')
      table.dropColumn('lwv_website_url')
      table.dropColumn('ftm_website_url')
      table.dropColumn('pvs_website_url')
      table.dropColumn('bp_website_url')
      table.dropColumn('wp_website_url')
      table.dropColumn('cb_website_url')
      table.dropColumn('volunteer')
      table.dropColumn('bio_cred_url')
      table.dropColumn('bio_cred_text')
      table.dropColumn('bio')
      table.dropColumn('CC_Reg_No')
      table.dropColumn('FEC_CC_ID')
      table.dropColumn('pbs_hawaii_url')
      table.dropColumn('expenditure_viz_url')
    }),
  ])
}
