import axiosAPI from '@/api/axios'
import { HOST } from '@/api'


const getArrivalDate = async ({ commit }, params) => {
  try {
    const response = await axiosAPI.post('/api/matrix/arrival-date', params)

    commit('setArrivalDate', response.data.payload)

    return { ok: true, response: response.data }
  } catch (error) {
    return { ok: false, response: error.response.data }
  }
}



const setProductData = async ({ commit }, params) => {
  commit('setProductData', params)
}

export {
  setProductData
}
