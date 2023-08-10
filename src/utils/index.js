import axios from 'axios';
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from "node:path";

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


export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const __srcname = resolve(__dirname, '../')
export const __rootname = resolve(__dirname, '../../')
