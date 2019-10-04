import axios from 'axios';
import React from 'react';
import './App.css';
import { SearchResults } from './components/SearchResults/SearchResults';
import { SearchResponse } from './components/SearchResults/SearchResults.interface';
import { config } from './config';

const App = () => {
  const [inputValue, setInputValue] = React.useState<string>('')

  const [
    searchResults,
    setSearchResults
  ] = React.useState<SearchResponse | null>(null)

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

  return (
    <div>
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
