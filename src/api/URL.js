
const hostname = `LIN59017635`


// export const authURL = `http://${hostname}.corp.capgemini.com:8089/home`
// export const flightManagementURL = `http://${hostname}.corp.capgemini.com:8089/search`
// export const bookingManagementURL = `http://${hostname}.corp.capgemini.com:8089/booking`
// export const userDetailsURL = `http://${hostname}.corp.capgemini.com:8089/home`



// http://${hostname}:8090/search

// http://http://${hostname}:8089/home/getAllUser


export const authURL = `${process.env.REACT_APP_URL}/home`
export const flightManagementURL = `${process.env.REACT_APP_URL}/search`
export const bookingManagementURL = `${process.env.REACT_APP_URL}/booking`
export const userDetailsURL = `${process.env.REACT_APP_URL}/home`

