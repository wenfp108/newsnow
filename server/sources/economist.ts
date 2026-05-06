import * as cheerio from "cheerio"
import type { NewsItem } from "@shared/types"

export default defineSource(async () => {
  const baseURL = "https://www.economist.com"
  const html: any = await myFetch(`${baseURL}/rss`)
  const $ = cheerio.load(html, { xmlMode: true })
  const news: NewsItem[] = []

  $("item").each((_, el) => {
    const title = $(el).find("title").text()
    const url = $(el).find("link").text()
    const desc = $(el).find("description").text()
    const pubDate = $(el).find("pubDate").text()

    if (title && url) {
      news.push({
        url,
        title,
        id: url,
        extra: {
          info: pubDate ? new Date(pubDate).toLocaleDateString() : "",
          hover: desc?.substring(0, 200),
        },
      })
    }
  })

  return news
})
