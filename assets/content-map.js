// assets/content-map.js
// 站点内容分区、关键词标签及搜索过滤函数

const siteConfig = {
  baseUrl: "https://ssl-main-oubo.com",
  defaultLang: "zh-CN",
  siteName: "欧博体育"
};

const contentSections = [
  {
    id: "home",
    title: "首页",
    keywords: ["欧博体育", "首页", "体育新闻", "赛事动态"],
    path: "/home"
  },
  {
    id: "news",
    title: "新闻中心",
    keywords: ["欧博体育", "新闻", "体育赛事", "报道"],
    path: "/news"
  },
  {
    id: "live",
    title: "直播",
    keywords: ["欧博体育", "直播", "体育直播", "实时赛事"],
    path: "/live"
  },
  {
    id: "highlights",
    title: "精彩集锦",
    keywords: ["欧博体育", "集锦", "赛事精华", "回放"],
    path: "/highlights"
  },
  {
    id: "community",
    title: "社区",
    keywords: ["欧博体育", "社区", "讨论", "互动"],
    path: "/community"
  }
];

const tagList = [
  { tag: "足球", section: "news" },
  { tag: "篮球", section: "live" },
  { tag: "网球", section: "news" },
  { tag: "电竞", section: "community" },
  { tag: "英超", section: "news" },
  { tag: "NBA", section: "live" },
  { tag: "中超", section: "highlights" },
  { tag: "欧冠", section: "highlights" },
  { tag: "奥运", section: "news" },
  { tag: "欧博体育", section: "home" }
];

function getSectionById(id) {
  return contentSections.find(function(section) {
    return section.id === id;
  }) || null;
}

function searchSections(query) {
  if (!query || query.trim() === "") {
    return [];
  }
  const q = query.toLowerCase().trim();
  const results = [];
  for (let i = 0; i < contentSections.length; i++) {
    const section = contentSections[i];
    const titleMatch = section.title.toLowerCase().includes(q);
    const keywordMatch = section.keywords.some(function(kw) {
      return kw.toLowerCase().includes(q);
    });
    if (titleMatch || keywordMatch) {
      results.push(section);
    }
  }
  return results;
}

function filterSectionsByTag(tag) {
  if (!tag || tag.trim() === "") {
    return [];
  }
  const t = tag.trim().toLowerCase();
  const results = [];
  for (let i = 0; i < tagList.length; i++) {
    if (tagList[i].tag.toLowerCase() === t) {
      const section = getSectionById(tagList[i].section);
      if (section) {
        results.push(section);
      }
    }
  }
  return results;
}

function buildSectionUrl(section) {
  if (!section) {
    return "";
  }
  return siteConfig.baseUrl + "/section" + section.path;
}

function getSectionByKeyword(keyword) {
  if (!keyword || keyword.trim() === "") {
    return null;
  }
  const kw = keyword.toLowerCase().trim();
  for (let i = 0; i < contentSections.length; i++) {
    const sec = contentSections[i];
    if (sec.keywords.some(function(k) { return k.toLowerCase() === kw; })) {
      return sec;
    }
  }
  return null;
}

function getAllTags() {
  return tagList.map(function(item) {
    return item.tag;
  }).filter(function(value, index, self) {
    return self.indexOf(value) === index;
  });
}

// 示例用法（可移除）
console.log("站点内容地图初始化完成");
console.log("搜索 '体育' 结果:", searchSections("体育").length);