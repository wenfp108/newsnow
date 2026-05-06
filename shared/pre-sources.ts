import process from "node:process"
import { Interval } from "./consts"
import { typeSafeObjectFromEntries } from "./type.util"
import type { OriginSource, Source, SourceID } from "./types"

const Time = {
  Test: 1,
  Realtime: 2 * 60 * 1000,
  Fast: 5 * 60 * 1000,
  Default: Interval, // 10min
  Common: 30 * 60 * 1000,
  Slow: 60 * 60 * 1000,
}

export const originSources = {
  // 国际新闻
  "economist": {
    name: "经济学人",
    column: "world",
    color: "red",
    interval: Time.Slow,
    home: "https://www.economist.com",
    sub: {
      "latest": {
        title: "最新文章",
      },
      "finance": {
        title: "财经",
      },
    },
  },
  "nytimes": {
    name: "纽约时报",
    column: "world",
    color: "gray",
    interval: Time.Common,
    home: "https://www.nytimes.com",
    sub: {
      "latest": {
        title: "最新文章",
      },
      "world": {
        title: "国际",
      },
      "business": {
        title: "商业",
      },
      "technology": {
        title: "科技",
      },
    },
  },
  "ft": {
    name: "金融时报",
    column: "finance",
    color: "pink",
    interval: Time.Common,
    home: "https://www.ft.com",
  },
  "wsj": {
    name: "华尔街日报",
    column: "finance",
    color: "blue",
    interval: Time.Common,
    home: "https://www.wsj.com",
    sub: {
      "latest": {
        title: "最新文章",
      },
      "world": {
        title: "国际",
      },
      "business": {
        title: "商业",
      },
      "markets": {
        title: "市场",
      },
    },
  },
  "caixin": {
    name: "财新网",
    column: "finance",
    color: "red",
    interval: Time.Common,
    home: "https://www.caixin.com",
    sub: {
      "latest": {
        title: "最新文章",
      },
      "finance": {
        title: "财经",
      },
    },
  },
  "newyorker": {
    name: "纽约客",
    column: "world",
    color: "red",
    interval: Time.Common,
    home: "https://www.newyorker.com",
    sub: {
      "latest": {
        title: "最新文章",
      },
      "news": {
        title: "新闻",
      },
      "culture": {
        title: "文化",
      },
    },
  },
  "washingtonpost": {
    name: "华盛顿邮报",
    column: "world",
    color: "blue",
    interval: Time.Common,
    home: "https://www.washingtonpost.com",
    sub: {
      "latest": {
        title: "最新文章",
      },
      "world": {
        title: "国际",
      },
      "business": {
        title: "商业",
      },
      "technology": {
        title: "科技",
      },
    },
  },

  // 科技
  "github": {
    name: "Github",
    color: "gray",
    home: "https://github.com/",
    column: "tech",
    sub: {
      "trending-today": {
        title: "Today",
        type: "hottest",
      },
    },
  },
  "hackernews": {
    name: "Hacker News",
    color: "orange",
    column: "tech",
    type: "hottest",
    home: "https://news.ycombinator.com/",
  },

  // 财经
  "wallstreetcn": {
    name: "华尔街见闻",
    color: "blue",
    column: "finance",
    home: "https://wallstreetcn.com/",
    sub: {
      quick: {
        type: "realtime",
        interval: Time.Fast,
        title: "实时快讯",
      },
      news: {
        title: "最新资讯",
        interval: Time.Common,
      },
      hot: {
        title: "最热文章",
        type: "hottest",
        interval: Time.Common,
      },
    },
  },
  "jin10": {
    name: "金十数据",
    column: "finance",
    color: "blue",
    type: "realtime",
    home: "https://www.jin10.com",
  },
  "xueqiu": {
    name: "雪球",
    color: "blue",
    home: "https://xueqiu.com",
    column: "finance",
    sub: {
      hotstock: {
        title: "热门股票",
        interval: Time.Realtime,
        type: "hottest",
      },
    },
  },
  "cls": {
    name: "财联社",
    color: "red",
    column: "finance",
    home: "https://www.cls.cn",
    sub: {
      telegraph: {
        title: "电报",
        interval: Time.Fast,
        type: "realtime",
      },
      depth: {
        title: "深度",
      },
      hot: {
        title: "热门",
        type: "hottest",
      },
    },
  },
  "gelonghui": {
    name: "格隆汇",
    color: "blue",
    title: "事件",
    column: "finance",
    type: "realtime",
    interval: Time.Realtime,
    home: "https://www.gelonghui.com",
  },
  "fastbull": {
    name: "法布财经",
    color: "emerald",
    home: "https://www.fastbull.cn",
    column: "finance",
    sub: {
      express: {
        title: "快讯",
        type: "realtime",
        interval: Time.Realtime,
      },
      news: {
        title: "头条",
        interval: Time.Common,
      },
    },
  },
} as const satisfies Record<string, OriginSource>

export function genSources() {
  const _: [SourceID, Source][] = []

  Object.entries(originSources).forEach(([id, source]: [any, OriginSource]) => {
    const parent = {
      name: source.name,
      type: source.type,
      disable: source.disable,
      desc: source.desc,
      column: source.column,
      home: source.home,
      color: source.color ?? "primary",
      interval: source.interval ?? Time.Default,
    }
    if (source.sub && Object.keys(source.sub).length) {
      Object.entries(source.sub).forEach(([subId, subSource], i) => {
        if (i === 0) {
          _.push([id, {
            redirect: `${id}-${subId}`,
            ...parent,
            ...subSource,
          }] as [any, Source])
        }
        _.push([`${id}-${subId}`, { ...parent, ...subSource }] as [any, Source])
      })
    } else {
      _.push([id, {
        title: source.title,
        ...parent,
      }])
    }
  })

  return typeSafeObjectFromEntries(_.filter(([_, v]) => {
    if (v.disable === "cf" && process.env.CF_PAGES) {
      return false
    } else if (v.disable === true) {
      return false
    } else {
      return true
    }
  }))
}
