import * as cheerio from "cheerio"
import type { NewsItem } from "@shared/types"

const latest = defineSource(async () => {
  const url = "https://news.google.com/rss/search?q=site:economist.com"
  const html: any = await myFetch(url)
  const $ = cheerio.load(html, { xmlMode: true })
  const news: NewsItem[] = []

  $("item").each((_, el) => {
    const title = $(el).find("title").text()
    const link = $(el).find("link").text()
    const pubDate = $(el).find("pubDate").text()

    if (title && link) {
      news.push({
        url: link,
        title: title.replace(" - The Economist", ""),
        id: link,
        extra: {
          info: pubDate ? new Date(pubDate).toLocaleDateString() : "",
        },
      })
    }
  })

  return news.slice(0, 30)
})

const finance = defineSource(async () => {
  const url = "https://news.google.com/rss/search?q=site:economist.com+finance"
  const html: any = await myFetch(url)
  const $ = cheerio.load(html, { xmlMode: true })
  const news: NewsItem[] = []

  $("item").each((_, el) => {
    const title = $(el).find("title").text()
    const link = $(el).find("link").text()
    const pubDate = $(el).find("pubDate").text()

    if (title && link) {
      news.push({
        url: link,
        title: title.replace(" - The Economist", ""),
        id: link,
        extra: {
          info: pubDate ? new Date(pubDate).toLocaleDateString() : "",
        },
      })
    }
  })

  return news.slice(0, 30)
})

export default defineSource({
  "economist": latest,
  "economist-latest": latest,
  "economist-finance": finance,
})
