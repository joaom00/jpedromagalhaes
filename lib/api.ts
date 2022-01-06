export async function api(endpoint: string, { body, ...customConfig }: RequestInit = {}) {
  const headers = {
    'Content-Type': 'application/json'
  }

  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  }

  if (body) {
    config.body = body
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${endpoint}`, config)

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message)
  }

  return response.json()
}
