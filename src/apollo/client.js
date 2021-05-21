import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

const chartsUri
  = process.env.REACT_APP_CHAIN === 'ava' ? "https://zero-graph.0.exchange/subgraphs/name/zeroexchange/zerograph"
    // = process.env.REACT_APP_CHAIN === 'ava' ? "https://api.thegraph.com/subgraphs/name/winter256/zeroavagraph"
    : process.env.REACT_APP_CHAIN === 'bsc' ? "https://api.thegraph.com/subgraphs/name/winter256/zerobscgraph3"
      : null;

const blocksUri
  = process.env.REACT_APP_CHAIN === 'ava' ? "https://zero-graph.0.exchange/subgraphs/name/zeroexchange/avalanche-blocks"
    : process.env.REACT_APP_CHAIN === 'bsc' ? "https://api.thegraph.com/subgraphs/name/pancakeswap/blocks"
      : null;

export const client = new ApolloClient({
  link: new HttpLink({
    // uri: "https://zero-graph.0.exchange/subgraphs/name/zeroexchange/zerograph"
    uri: chartsUri,
    // uri: "https://api.thegraph.com/subgraphs/name/winter256/zeroavagraph",
    // uri: 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange',
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})

export const healthClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/index-node/graphql',
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})

export const blockClient = new ApolloClient({
  link: new HttpLink({
    uri: blocksUri,
  }),
  cache: new InMemoryCache(),
})
