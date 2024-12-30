import axiosAPI from '@/api/axios'

const currentSeller = async ({ commit }) => {
  try {
    const response = await axiosAPI.get('/api/seller/current-seller')

    const sellerData = response.data.sellerData

    if (sellerData) {
      commit('currentSeller', sellerData)
    }

    return { ok: true, response: response.data }
  } catch (error) {
    throw { success: false, response: error.response.data }
  }
}

const currentUser = async ({ commit }) => {
  try {
    const response = await axiosAPI.get('/api/user/current-user')

    const userData = response.data.userData

    if (userData) {
      commit('currentUser', userData)
    }

    return { ok: true, response: response.data }
  } catch (error) {
    throw { success: false, response: error.response.data }
  }
}

const loginSeller = async ({ commit }, params) => {
  try {
    const response = await axiosAPI.post('/api/seller/login-seller', params)

    commit('currentSeller', response.data.data)

    return { ok: true, response: response.data }
  } catch (error) {
    throw { ok: false, response: error.response.data }
  }
}

const loginUser = async ({ commit }, params) => {
  try {
    const response = await axiosAPI.post('/api/user/login-user', params)

    commit('currentUser', response.data.data)

    return { ok: true, response: response.data }
  } catch (error) {
    return { ok: false, response: error.response.data }
  }
}

const logoutSeller = async ({ commit }, params) => {
  try {
    const response = await axiosAPI.get('/api/seller/logout', params)

    commit('currentSeller', null)

    sessionStorage.removeItem('authToken')

    return { ok: true, response: response.data }
  } catch (error) {
    throw { ok: false, response: error.response.data }
  }
}

const logoutUser = async ({ commit }, params) => {
  try {
    localStorage.removeItem('enabled-wallet')

    const response = await axiosAPI.get('/api/user/logout', params)

    commit('currentUser', null)

    sessionStorage.removeItem('authToken')

    return { ok: true, response: response.data }
  } catch (error) {
    throw { ok: false, response: error.response.data }
  }
}

const togglePanel = async ({ commit }, params) => {
  commit('togglePanel', params)
}

const toggleDestinations = async ({ commit }, params) => {
  commit('toggleDestinations', params)
}

const connectWallet = async ({ commit }, params) => {
  console.log(params)
  commit('connectWallet', params)
}

const startTx = async (_, params) => {
  try {
    const response = await axiosAPI.post('/api/gate/start-tx', params)

    console.log(response)

    //commit("createProduct", response.data.payload);

    return { ok: true, response: response.data }
  } catch (error) {
    throw { ok: false, response: error.response.data }
  }
}

const setupLucid = async ({ commit }, data) => {
  commit('setupLucid', data)
}

const setADAprice = async ({ commit }, data) => {
  commit('setADAprice', data)
}

export {
  logoutUser,
  currentUser,
  connectWallet,
  setupLucid,
  startTx,
  currentSeller,
  loginSeller,
  togglePanel,
  toggleDestinations,
  logoutSeller,
  loginUser,
  setADAprice,
}
