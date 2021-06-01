import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { chainConfig } from '../constants'

export const client = new ApolloClient({
  link: new HttpLink({
    // uri: "https://zero-graph.0.exchange/subgraphs/name/zeroexchange/zerograph"
    uri: chainConfig?.chartsUri,
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
    uri: chainConfig?.blocksUri,
  }),
  cache: new InMemoryCache(),
})
