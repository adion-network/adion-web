"use server"

import axios from "axios"
import { cookies } from "next/headers"

const getUserToken = () => {
  //todo: get user token
  return ""
}

const headers = new Headers()
headers.set("Content-Type", "application/json")

const apiAddress = process.env.API_ADDRESS || ""

export interface ResData {
  msg: string | null
  code: number
  data: any
}

export const get = async (url: string) => {
  headers.set("X-Auth-Token", getUserToken())
  console.log(`GET: ${apiAddress + url}`)
  console.log("Request Header: ", headers)
  const res = await fetch(apiAddress + url, {
    method: "GET",
    headers: headers,
    cache: "no-cache",
  })
  const resJson = await res.json()
  console.log("Response Header: ", res.headers)
  console.log(`Response Content:  ${JSON.stringify(resJson)}`)
  return {
    code: (res.status !== 200 && res.status) || resJson.code !== 0 ? 400 : 200,
    msg: resJson.message,
    data: resJson?.data,
    paging_info: {
      count: resJson?.total || 0,
    },
  }
}

export const post = async (url: string, params: any) => {
  headers.set("X-Auth-Token", getUserToken())
  console.log(`POST: ${apiAddress + url}`)
  console.log("Request Header: ", headers)
  console.log("Request Body: ", JSON.stringify(params))
  const res = await fetch(apiAddress + url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(params),
  })

  const resJson = await res.json()
  console.log("Response Header: ", res.headers)
  console.log(`Response Content:  ${JSON.stringify(resJson)}`)
  return {
    code: (res.status !== 200 && res.status) || resJson.code !== 0 ? 400 : 200,
    msg: resJson.message,
    data: resJson?.data,
  }
}

export const sendMessageToDiscord = async (message: string): Promise<ResData> => {
  try {
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL || ""
    if (discordWebhookUrl === "") {
      throw new Error("discord webhook not set")
    }

    const discordResponse = await axios.post(
      discordWebhookUrl,
      { content: message },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )

    if (discordResponse.status === 200 || discordResponse.status === 204) {
      return {
        code: 200,
        msg: "",
        data: {},
      }
    } else {
      throw new Error("Failed to send notification")
    }
  } catch (error: any) {
    return {
      code: 400,
      msg: error.message,
      data: {},
    }
  }
}
