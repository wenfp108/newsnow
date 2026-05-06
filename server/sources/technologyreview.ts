import * as cheerio from "cheerio"
import type { NewsItem } from "@shared/types"

const latest = defineSource(async () => {
  const baseURL = "https://www.technologyreview.com"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $("article, [class*='card'], [class*='item']").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p, [class*='dek'], [class*='summary']").first().text().trim()

    if (title && url) {
      const fullUrl = url.startsWith("http") ? url : `${baseURL}${url}`
      news.push({
        url: fullUrl,
        title,
        id: fullUrl,
        extra: {
          hover: desc?.substring(0, 200),
        },
      })
    }
  })

  return news.slice(0, 30)
})

const ai = defineSource(async () => {
  const baseURL = "https://www.technologyreview.com/topic/artificial-intelligence"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $("article, [class*='card'], [class*='item']").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p, [class*='dek'], [class*='summary']").first().text().trim()

    if (title && url) {
      const fullUrl = url.startsWith("http") ? url : `https://www.technologyreview.com${url}`
      news.push({
        url: fullUrl,
        title,
        id: fullUrl,
        extra: {
          hover: desc?.substring(0, 200),
        },
      })
    }
  })

  return news.slice(0, 30)
})

export default defineSource({
  "technologyreview": latest,
  "technologyreview-latest": latest,
  "technologyreview-ai": ai,
})
