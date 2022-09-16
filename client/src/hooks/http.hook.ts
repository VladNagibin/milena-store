import { useState } from "react"


export const useHttp = () => {
    const [loading, setLoading] = useState(false)

    const request = <IData>(url: string, method: string = 'GET', body: Object | null = null, headers: any = {}, abortSignal?: AbortSignal | undefined): Promise<IData> => {
        return new Promise(async (res, rej) => {
            setLoading(true)
            try {
                let sBody: string | null = null
                if (body) {
                    sBody = JSON.stringify(body)
                    headers['Content-type'] = 'application/json'
                }
                const responce = await fetch(url, { method, body: sBody, headers, signal: abortSignal })
                const data: IData = await responce.json()
                setLoading(false)
                res(data)


            } catch (e) {
                setLoading(false)
                throw e
            }
        })
    }

    return { loading, request }

}