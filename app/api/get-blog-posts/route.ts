import { NextResponse } from "next/server"
import { notion, BLOG_DATABASE_ID } from "@/lib/notion"

export async function GET() {
  const response = await notion.databases.query({
    database_id: BLOG_DATABASE_ID!,
    filter: { property: "Published", checkbox: { equals: true } },
    sorts: [{ property: "Date", direction: "descending" }],
  })

  const posts = response.results.map((page: any) => ({
    title: page.properties.Title.title[0]?.plain_text,
    excerpt: page.properties.Excerpt.rich_text[0]?.plain_text,
    date: page.properties.Date.date?.start,
    category: page.properties.Category.select?.name,
    slug: page.properties.Slug.rich_text[0]?.plain_text,
    link: "/blog/" + page.properties.Slug.rich_text[0]?.plain_text,
  }))

  return NextResponse.json(posts)
}
