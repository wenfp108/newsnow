import * as cheerio from "cheerio"
import type { NewsItem } from "@shared/types"

const latest = defineSource(async () => {
  const baseURL = "https://www.economist.com"
  const html: any = await myFetch(`${baseURL}/latest`)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $("article, [data-testid='card']").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p").first().text().trim()

    if (title && url && url.startsWith("/")) {
      news.push({
        url: `${baseURL}${url}`,
        title,
        id: url,
        extra: {
          hover: desc?.substring(0, 200),
        },
      })
    }
  })

  return news.slice(0, 30)
})

const finance = defineSource(async () => {
  const baseURL = "https://www.economist.com"
  const html: any = await myFetch(`${baseURL}/finance-and-economics`)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $("article, [data-testid='card']").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p").first().text().trim()

    if (title && url && url.startsWith("/")) {
      news.push({
        url: `${baseURL}${url}`,
        title,
        id: url,
        extra: {
          hover: desc?.substring(0, 200),
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
