const apiURL = import.meta.env.VITE_API_URL;

//              register
export const register = (data) => {
  return fetch(`${apiURL}api/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

//              signin
export const login = (data) => {
  return fetch(`${apiURL}api/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

//              name and category api
export const nameCategory = (userId, token, userName, category) => {
  return fetch(`${apiURL}api/user/namecategory/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify({ userName, category }),
  });
};

//              get the user information
export const getUserInfo = (userId, token) => {
  return fetch(`${apiURL}api/user/info/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  });
};

//              update the user information
export const updateUser = (updateFormData, userId, token) => {
  return fetch(`${apiURL}api/user/update/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify(updateFormData),
  });
};

//              update the cta through userid
export const incrementCtaCount = (userId, token) => {
  return fetch(`${apiURL}api/user/increment/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  });
};

//              update the user information - image, bio and bgColor
export const updateUserInfo = (userId, token, updateUserInformation) => {
  return fetch(`${apiURL}api/user/updateUserInfo/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify(updateUserInformation),
  });
};

// get the clicks count for social
export const getClicksCountForSocial = (userId, token) => {
  return fetch(`${apiURL}api/link/getNoOfClicksForSocial/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  });
};

// get the clicks count for shop
export const getClicksCountForShop = (userId, token) => {
  return fetch(`${apiURL}api/link/getNoOfClicksForShop/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  });
};

// get the cta count
export const getCtaCount = (userId, token) => {
  return fetch(`${apiURL}api/user/cta/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  });
};

// createClick
export const createClick = (linkId) => {
  return fetch(`${apiURL}api/link/${linkId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// get Monthly Clicks
export const getMonthlyClicks = (userId) => {
  return fetch(`${apiURL}api/link/getMonthlyClicks/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// get user Device Clicks
export const getUserDeviceClicks = (userId) => {
  return fetch(`${apiURL}api/link/getUserDeviceClicks/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// get app type clicks
export const getAppTypeClicks = (userId) => {
  return fetch(`${apiURL}api/link/getAppTypeClicks/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// get top links
export const getTopLinks = (userId) => {
  return fetch(`${apiURL}api/link/getTopLinks/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

//      api for create link
export const createLink = (userId, token, linkDataToSend) => {
  return fetch(`${apiURL}api/link/createlink/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify(linkDataToSend)
  });
};

//        api for get all the social links
export const getAllSocialLinks = (userId, token) => {
  return fetch(`${apiURL}api/link/getAllLinksForSocial/${userId}`, {
  // return fetch(`${apiURL}api/link/getAllLinks/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    }
  })
}; 

//        api for get all the social links
export const getAllShopLinks = (userId, token) => {
  return fetch(`${apiURL}api/link/getAllLinksForShop/${userId}`, {
  // return fetch(`${apiURL}api/link/getAllLinks/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    }
  })
}; 