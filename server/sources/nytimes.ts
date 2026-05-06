import * as cheerio from "cheerio"
import type { NewsItem } from "@shared/types"

const latest = defineSource(async () => {
  const baseURL = "https://www.nytimes.com"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $("article, [data-testid='story-item'], .story-wrapper").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p, .summary, [class*='summary']").first().text().trim()

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
  const baseURL = "https://www.nytimes.com/section/world"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $("article, [data-testid='story-item'], .story-wrapper").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p, .summary, [class*='summary']").first().text().trim()

    if (title && url) {
      const fullUrl = url.startsWith("http") ? url : `https://www.nytimes.com${url}`
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
  const baseURL = "https://www.nytimes.com/section/business"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $("article, [data-testid='story-item'], .story-wrapper").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p, .summary, [class*='summary']").first().text().trim()

    if (title && url) {
      const fullUrl = url.startsWith("http") ? url : `https://www.nytimes.com${url}`
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
  const baseURL = "https://www.nytimes.com/section/technology"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $("article, [data-testid='story-item'], .story-wrapper").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p, .summary, [class*='summary']").first().text().trim()

    if (title && url) {
      const fullUrl = url.startsWith("http") ? url : `https://www.nytimes.com${url}`
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
  "nytimes": latest,
  "nytimes-latest": latest,
  "nytimes-world": world,
  "nytimes-business": business,
  "nytimes-technology": technology,
})
