export interface ISearchResultProps {
  searchResults: SearchResponse | null
}
export interface DownloadFileVariables {
  videoId: string
  videoTitle: string
  channelTitle: string
  fileFormat: string
}

export interface SearchItem {
  etag: string
  id: {
    kind: string
    videoId: string
  }
  snippet: {
    channelId: string
    channelTitle: string
    description: string
    liveBroadcastContent: string
    publishedAt: string
    thumbnails: {
      default: {
        url: string
      }
      high: {
        url: string
      }
      medium: {
        url: string
      }
    }
    title: string
  }
}

export interface SearchResponse {
  data: {
    items: SearchItem[]
  }
}
