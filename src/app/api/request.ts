"use server"

import axios from "axios"

const headers = new Headers()
headers.append("Content-Type", "application/json")
headers.append("X-Auth-Token", process.env.API_KEY || "")

const apiAddress = process.env.API_ADDRESS || "https://api-test.demeters.io"

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
  console.log(apiAddress + url)
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

    if (discordResponse.status === 200) {
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
