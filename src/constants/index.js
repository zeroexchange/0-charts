export const FACTORY_ADDRESS
  = process.env.REACT_APP_CHAIN === 'ava' ? "0x2Ef422F30cdb7c5F1f7267AB5CF567A88974b308"
    : process.env.REACT_APP_CHAIN === 'bsc' ? "0x52abdb3536a3a966056e096f2572b2755df26eac"
      : null;


export const WAVAX_ADDRESS = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'

export const BUNDLE_ID = '1'

export const timeframeOptions = {
  WEEK: '1 week',
  MONTH: '1 month',
  // THREE_MONTHS: '3 months',
  // YEAR: '1 year',
  ALL_TIME: 'All time',
}

// token list urls to fetch tokens from - use for warnings on tokens and pairs
export const SUPPORTED_LIST_URLS__NO_ENS = [
  'https://raw.githubusercontent.com/pangolindex/tokenlists/main/aeb.tokenlist.json',
  'https://raw.githubusercontent.com/pangolindex/tokenlists/main/top15.tokenlist.json'
]

// hide from overview list
export const OVERVIEW_TOKEN_BLACKLIST = [
  '0xa47a05ed74f80fa31621612887d26df40bcf0ca9', // DAS
  '0x97b99b4009041e948337ebca7e6ae52f9f6e633c', // CON
]

// pair blacklist
export const PAIR_BLACKLIST = []

/**
 * For tokens that cause erros on fee calculations
 */
export const FEE_WARNING_TOKENS = ['0xd46ba6d942050d489dbd938a2c909a5d5039a161']
