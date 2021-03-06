export const HONOLULU_CHARTER_AMENDMENTS_PDF = 'http://honoluluchartercommission.org/images/2016_Charter_Amendments_Brochure.pdf'

export function getAmendmentGroupTitle(amendmentGroupName) {
  switch (amendmentGroupName) {

  case "CON AMEND":
    return "State Constitution"
  case "HAWAII CHARTER AMEND":
    return "Hawaii County Charter"
  case "HONOLULU CHARTER AMEND":
    return "Honolulu County Charter"
  case "MAUI CHARTER AMEND":
    return "Maui County Charter"
  case "KAUAI CHARTER AMEND":
    return "Kauai County Charter"
  default:
    return amendmentGroupName
  }
}

export function amendmentFullTextLink(amendmentGroupName) {
  switch (amendmentGroupName) {
  default:
    return 'https://elections.hawaii.gov/voters/constitutional-and-charter-amendment-questions/'
  }
}

export function amendmentDescriptionLink(amendmentGroupName) {
  switch (amendmentGroupName) {
  default:
    return 'https://elections.hawaii.gov/voters/constitutional-and-charter-amendment-questions/'
  }

}
