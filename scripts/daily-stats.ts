import { genSources } from "../shared/pre-sources"
import { getCacheTable } from "../server/database/cache"

interface DailyStats {
  date: string
  sources: Record<string, {
    count: number
    lastUpdated: string
  }>
  totalItems: number
}

export async function generateDailyStats(): Promise<DailyStats> {
  const today = new Date().toISOString().split('T')[0]
  const sources = genSources()
  const cache = await getCacheTable()

  const stats: DailyStats = {
    date: today,
    sources: {},
    totalItems: 0,
  }

  if (!cache) {
    console.log("⚠️ 缓存未启用，无法生成统计")
    return stats
  }

  const sourceIds = Object.keys(sources)
  const cacheInfos = await cache.getEntire(sourceIds)

  for (const info of cacheInfos) {
    const count = info.items?.length || 0
    stats.sources[info.id] = {
      count,
      lastUpdated: new Date(info.updated).toISOString(),
    }
    stats.totalItems += count
  }

  return stats
}

export function formatStats(stats: DailyStats): string {
  let output = `📊 每日数据统计 (${stats.date})\n`
  output += `=`.repeat(50) + `\n\n`

  const sortedSources = Object.entries(stats.sources)
    .sort((a, b) => b[1].count - a[1].count)

  for (const [sourceId, data] of sortedSources) {
    const bar = "█".repeat(Math.min(data.count, 50))
    output += `${sourceId.padEnd(20)} ${String(data.count).padStart(4)} 条 ${bar}\n`
  }

  output += `\n${"─".repeat(50)}\n`
  output += `总计: ${stats.totalItems} 条数据\n`

  return output
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  const stats = await generateDailyStats()
  console.log(formatStats(stats))
}
