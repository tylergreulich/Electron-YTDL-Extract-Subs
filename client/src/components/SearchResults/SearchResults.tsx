import { useMutation } from '@apollo/react-hooks'
import React from 'react'
import YouTube from 'react-youtube'
import { DOWNLOAD_FILE_MUTATION } from '../../graphql/mutations/DownloadFile.mutation'
import {
  DownloadFileVariables,
  ISearchResultProps
} from './SearchResults.interface'

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

  const onDownloadFileHandler = async (payload: DownloadFileVariables) => {
    const [{}, { loading }] = useMutation<{}, DownloadFileVariables>(
      DOWNLOAD_FILE_MUTATION,
      {
        variables: payload
      }
    )

    return { loading }
  }

  return (
    <section>
      {data &&
        data.items.map(({ snippet, id }) => {
          const payload = {
            videoId: id.videoId,
            videoTitle: snippet.title,
            channelTitle: snippet.channelTitle
          }

          return (
            <React.Fragment key={id.videoId}>
              <YouTube videoId={id.videoId} opts={opts} />
              <button
                onClick={async () => {
                  setIsLoading(true)

                  const { loading } = await onDownloadFileHandler({
                    ...payload,
                    fileFormat: 'mp3'
                  })

                  if (!loading) {
                    setIsLoading(false)
                  }
                }}
              >
                Download MP3
              </button>
              <button
                onClick={async () => {
                  setIsLoading(true)

                  const { loading } = await onDownloadFileHandler({
                    ...payload,
                    fileFormat: 'mp4'
                  })

                  if (!loading) {
                    setIsLoading(false)
                  }
                }}
              >
                Download MP4
              </button>
            </React.Fragment>
          )
        })}
    </section>
  )
}
