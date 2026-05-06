import * as cheerio from "cheerio"
import type { NewsItem } from "@shared/types"

const latest = defineSource(async () => {
  const baseURL = "https://asia.nikkei.com"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $("article, [class*='card'], [class*='story']").each((_, el) => {
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

const business = defineSource(async () => {
  const baseURL = "https://asia.nikkei.com/Business"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $("article, [class*='card'], [class*='story']").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p, [class*='summary'], [class*='desc']").first().text().trim()

    if (title && url) {
      const fullUrl = url.startsWith("http") ? url : `https://asia.nikkei.com${url}`
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
  const baseURL = "https://asia.nikkei.com/Politics"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $("article, [class*='card'], [class*='story']").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p, [class*='summary'], [class*='desc']").first().text().trim()

    if (title && url) {
      const fullUrl = url.startsWith("http") ? url : `https://asia.nikkei.com${url}`
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
  "nikkeiasia": latest,
  "nikkeiasia-latest": latest,
  "nikkeiasia-business": business,
  "nikkeiasia-politics": politics,
})
