import { buildMetaEvent } from "../../lib/meta"

export async function POST(req: Request) {
  const body = await req.json()

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const accessToken = process.env.NEXT_PUBLIC_META_ACCESS_TOKEN

  const event = buildMetaEvent(body)

  const res = await fetch(
    `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    }
  )

  const data = await res.json()

  return Response.json(data)
}