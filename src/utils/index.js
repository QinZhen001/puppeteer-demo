import axios from 'axios';



export const apiGetData = async (url) => {
  const res = await axios({
    method: "get",
    url: url,
    headers: {
      "Content-Type": "application/json",
    }
  })
  return res.data
}
