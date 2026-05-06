import * as cheerio from "cheerio"
import type { NewsItem } from "@shared/types"

const latest = defineSource(async () => {
  const baseURL = "https://www.theatlantic.com"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $("article, [class*='card'], [class*='RiverItem']").each((_, el) => {
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

const politics = defineSource(async () => {
  const baseURL = "https://www.theatlantic.com/politics"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $("article, [class*='card'], [class*='RiverItem']").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p, [class*='dek'], [class*='summary']").first().text().trim()

    if (title && url) {
      const fullUrl = url.startsWith("http") ? url : `https://www.theatlantic.com${url}`
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

const technology = defineSource(async () => {
  const baseURL = "https://www.theatlantic.com/technology"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $("article, [class*='card'], [class*='RiverItem']").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p, [class*='dek'], [class*='summary']").first().text().trim()

    if (title && url) {
      const fullUrl = url.startsWith("http") ? url : `https://www.theatlantic.com${url}`
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
  "theatlantic": latest,
  "theatlantic-latest": latest,
  "theatlantic-politics": politics,
  "theatlantic-technology": technology,
})
