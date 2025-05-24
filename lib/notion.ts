import { Client } from "@notionhq/client"
import { NotionAPI } from "notion-client"

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

export const getPageFromSlug = async (slug: string) => {
    const api = new NotionAPI()
    const recordMap = await api.getPage(slug) // or pass the page ID if needed
    return recordMap
}

export const BLOG_DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID
