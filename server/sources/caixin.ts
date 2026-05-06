import * as cheerio from "cheerio"
import type { NewsItem } from "@shared/types"

const latest = defineSource(async () => {
  const baseURL = "https://www.caixin.com"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $(".news_item, .list_item, article, [class*='news'], [class*='item']").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p, .desc, .summary").first().text().trim()

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

const economy = defineSource(async () => {
  const baseURL = "https://economy.caixin.com"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $(".news_item, .list_item, article, [class*='news'], [class*='item']").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p, .desc, .summary").first().text().trim()

    if (title && url) {
      const fullUrl = url.startsWith("http") ? url : url.startsWith("/") ? `https://www.caixin.com${url}` : `${baseURL}/${url}`
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

const finance = defineSource(async () => {
  const baseURL = "https://finance.caixin.com"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $(".news_item, .list_item, article, [class*='news'], [class*='item']").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p, .desc, .summary").first().text().trim()

    if (title && url) {
      const fullUrl = url.startsWith("http") ? url : url.startsWith("/") ? `https://www.caixin.com${url}` : `${baseURL}/${url}`
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

const companies = defineSource(async () => {
  const baseURL = "https://companies.caixin.com"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $(".news_item, .list_item, article, [class*='news'], [class*='item']").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p, .desc, .summary").first().text().trim()

    if (title && url) {
      const fullUrl = url.startsWith("http") ? url : url.startsWith("/") ? `https://www.caixin.com${url}` : `${baseURL}/${url}`
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

const international = defineSource(async () => {
  const baseURL = "https://international.caixin.com"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $(".news_item, .list_item, article, [class*='news'], [class*='item']").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p, .desc, .summary").first().text().trim()

    if (title && url) {
      const fullUrl = url.startsWith("http") ? url : url.startsWith("/") ? `https://www.caixin.com${url}` : `${baseURL}/${url}`
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

const tech = defineSource(async () => {
  const baseURL = "https://www.caixin.com/tech"
  const html: any = await myFetch(baseURL)
  const $ = cheerio.load(html)
  const news: NewsItem[] = []

  $(".news_item, .list_item, article, [class*='news'], [class*='item']").each((_, el) => {
    const a = $(el).find("a").first()
    const title = a.text().trim()
    const url = a.attr("href")
    const desc = $(el).find("p, .desc, .summary").first().text().trim()

    if (title && url) {
      const fullUrl = url.startsWith("http") ? url : url.startsWith("/") ? `https://www.caixin.com${url}` : `${baseURL}/${url}`
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
  "caixin": latest,
  "caixin-latest": latest,
  "caixin-economy": economy,
  "caixin-finance": finance,
  "caixin-companies": companies,
  "caixin-international": international,
  "caixin-tech": tech,
})
