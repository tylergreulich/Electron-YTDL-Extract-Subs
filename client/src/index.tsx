import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import App from './App'
import './index.css'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <HashRouter>
      <Route path="/" component={App} />
    </HashRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
