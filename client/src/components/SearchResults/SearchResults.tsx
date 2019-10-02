import React from 'react'
import YouTube from 'react-youtube'
import { ISearchResultProps } from './SearchResults.interface'
const electron = window.require('electron')
const fs = electron.remote.require('fs')

export const SearchResults: React.FC<ISearchResultProps> = ({
  searchResults
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const opts = {
    height: '390',
    width: '640',
    autoplay: 0
  }

  if (!searchResults) return null

  const { data } = searchResults

  const testFn = () => {
    return fs.writeFileSync(__dirname, 'random string.txt')
  }

  return (
    <section>
      {data &&
        data.items.map(({ snippet, id }) => {
          return (
            <React.Fragment key={id.videoId}>
              <YouTube videoId={id.videoId} opts={opts} />
              <button>Download MP3</button>
              <button>Download MP4</button>
              <button onClick={() => testFn()}>Test Button</button>
            </React.Fragment>
          )
        })}
    </section>
  )
}
