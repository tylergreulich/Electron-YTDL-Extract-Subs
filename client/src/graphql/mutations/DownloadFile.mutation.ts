import gql from 'graphql-tag'

export const DOWNLOAD_FILE_MUTATION = gql`
  mutation DownloadFile(
    $videoId: String!
    $videoTitle: String!
    $channelTitle: String!
    $fileFormat: String!
  ) {
    downloadFile(
      videoId: $videoId
      videoTitle: $videoTitle
      channelTitle: $channelTitle
      fileFormat: $fileFormat
    )
  }
`
