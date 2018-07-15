// Takes a polling id like: "25-03"
export function officialBallotPdfLink(pollingId) {
  const id = pollingId.replace('-', '')

  // return `https://olvr.hawaii.gov/VIP/ViewMyBallot.aspx?dp=${id}`
  return `https://olvr.hawaii.gov/2018PrimaryFacsimileBallots/English/FAX001_${id}_1.pdf`
}
