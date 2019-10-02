import axios from 'axios'
import React from 'react'
import Dropdown from 'react-dropdown'
import './App.css'
import { SearchResults } from './components/SearchResults/SearchResults'
import { SearchResponse } from './components/SearchResults/SearchResults.interface'
import { config } from './config'
import { languages } from './listOfLanguages'

const App = () => {
  const [inputValue, setInputValue] = React.useState<string>('')

  const [
    searchResults,
    setSearchResults
  ] = React.useState<SearchResponse | null>(null)

  const [langToSearch, setLangToSearch] = React.useState('')

  const fetchData = async (input: string) => {
    try {
      const data: SearchResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?maxResults=${25}&part=snippet&q=${input}&key=${
          config.apiKey
        }&type=video&videoEmbeddable=true
        `
      )

      setSearchResults(data)
    } catch (error) {
      console.error(error)
    }
  }

  const defaultLangOpt = languages[0]

  return (
    <div>
      <Dropdown options={languages} value={defaultLangOpt} />
      <p>Hello, this is some random text!</p>
      <form
        onSubmit={async event => {
          event.preventDefault()

          await fetchData(inputValue)
        }}
      >
        <input
          value={inputValue}
          onChange={event => setInputValue(event.currentTarget.value)}
          placeholder="Enter query string"
        />
      </form>
      <SearchResults searchResults={searchResults} />
    </div>
  )
}

export default App
