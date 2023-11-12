import axios from "axios"
const apiClient = axios.create({
    baseURL: "https://orange-rice-35416.botics.co", // Base API URL
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
})
export const makeRequest = async (
    url,
    method = "get",
    data = null,
    customHeaders = {}
) => {
    try {
        const config = {
            url,
            method,
            data,
            headers: {
                ...customHeaders
            }
            // params: {
            //   [queryParamName]: queryParamValue
            // }
        }
        const response = await axios(config)
        return response.data
    } catch (error) {
        console.error("Request Error:", error)
        throw error
    }
}