const currentSeller = (state, data) => {
  state.sellerData = data
  sessionStorage.setItem('authToken', data.token)
}

const currentUser = (state, data) => {
  state.userData = data
  sessionStorage.setItem('authToken', data.token)
}

const setLocation = (state, data) => {
  state.locationData = data
}

const togglePanel = (state, data) => {
  state.panelVisible = data
}

const toggleDestinations = (state, data) => {
  state.destinationsVisible = data
}

const connectWallet = (state, data) => {
  state.walletConnected = data.value
  state.walletName = data.name
}

const setupLucid = (state, data) => {
  state.lucidClient = data
}

const setADAprice = (state, data) => {
  state.ADAprice = data
}
export { setLocation, currentUser, connectWallet, togglePanel, toggleDestinations, currentSeller, setupLucid, setADAprice }
