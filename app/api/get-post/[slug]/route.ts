// /pages/api/get-post/[slug].ts

import { NextRequest, NextResponse } from "next/server"
import { Client } from "@notionhq/client"
import { NotionAPI } from "notion-client"
import {
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
import { BLOG_DATABASE_ID } from "@/lib/notion"

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const notionClient = new NotionAPI()

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try { 
    const slug = await params.slug
  console.log("slug is herereeeee:", slug)
  // Step 1: Query Notion database for the page with matching slug
  const dbRes = await notion.databases.query({
    database_id: BLOG_DATABASE_ID!,
    filter: {
      property: "Slug",
      rich_text: {
        contains: slug,
      },
    },
  })
  console.log(dbRes)
  if (!dbRes.results.length)
    return NextResponse.json({ error: "Not found" }, { status: 404 })

  // Type assert result safely
  const page = dbRes.results[0] as PageObjectResponse
  console.log("PAGEID::::::",page.id)
  const pageId = page.id

  console.log("pageID part 2:", pageId)

  // Step 2: Get full Notion content for the page
  const recordMap = await notionClient.getPage(pageId)

  // Step 3: Construct blog metadata from typed properties
  const props = page.properties
  const blogData = {
    title: props.Title?.type === "title" ? props.Title.title[0]?.plain_text ?? "Untitled" : "Untitled",
    date: props.Date?.type === "date" ? props.Date.date?.start ?? "" : "",
    category: props.Category?.type === "select" ? props.Category.select?.name ?? "" : "",
    tags: props.Tags?.type === "multi_select" ? props.Tags.multi_select.map((t) => t.name) : [],
    excerpt: props.Excerpt?.type === "rich_text" ? props.Excerpt.rich_text[0]?.plain_text ?? "" : "",
  }

  return NextResponse.json({ blogData, recordMap })
} catch (error) {
  console.error("Error fetching post:", error)
  return NextResponse.json({ error: "Internal server error" }, { status: 500 })
}
}
