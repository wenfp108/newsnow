import * as cheerio from "cheerio"
import type { NewsItem } from "@shared/types"

const latest = defineSource(async () => {
  const baseURL = "https://www.reuters.com"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $("article, [class*='story'], [class*='card']").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p, [class*='summary'], [class*='desc']").first().text().trim()

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

const world = defineSource(async () => {
  const baseURL = "https://www.reuters.com/world"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $("article, [class*='story'], [class*='card']").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p, [class*='summary'], [class*='desc']").first().text().trim()

    if (title && url) {
      const fullUrl = url.startsWith("http") ? url : `https://www.reuters.com${url}`
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

const business = defineSource(async () => {
  const baseURL = "https://www.reuters.com/business"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $("article, [class*='story'], [class*='card']").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p, [class*='summary'], [class*='desc']").first().text().trim()

    if (title && url) {
      const fullUrl = url.startsWith("http") ? url : `https://www.reuters.com${url}`
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
  const baseURL = "https://www.reuters.com/technology"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $("article, [class*='story'], [class*='card']").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p, [class*='summary'], [class*='desc']").first().text().trim()

    if (title && url) {
      const fullUrl = url.startsWith("http") ? url : `https://www.reuters.com${url}`
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
  "reuters": latest,
  "reuters-latest": latest,
  "reuters-world": world,
  "reuters-business": business,
  "reuters-technology": technology,
})
