import crypto from "crypto"

export function hash(value: string) {
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex")
}

export function buildMetaEvent({
  eventName,
  email,
  eventId,
  ip,
  userAgent
}: {
  eventName: string
  email?: string
  eventId: string
  ip?: string
  userAgent?: string
}) {
  return {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        user_data: {
          em: email ? [hash(email)] : undefined,
          client_ip_address: ip,
          client_user_agent: userAgent
        }
      }
    ]
  }
}