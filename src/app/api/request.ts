"use server"

const headers = new Headers()
headers.append("Content-Type", "application/json")
headers.append("X-Auth-Token", process.env.API_KEY || "")

const apiAddress = process.env.API_ADDRESS || "https://api.demeters.io"

export interface ResData {
  msg: string | null
  code: number
  data: any
}

export const get = async (url: string) => {
  console.log(apiAddress + url)
  const res = await fetch(apiAddress + url, {
    method: "GET",
    headers: headers,
    cache: "no-cache",
  })
  const resJson = await res.json()
  return {
    code: res.status,
    msg: resJson.message,
    data: resJson?.data,
  }
}

export const post = async (url: string, params: any) => {
  const res = await fetch(apiAddress + url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(params),
  })

  const resJson = await res.json()
  return {
    code: res.status,
    msg: resJson.message,
    data: resJson?.data,
  }
}
