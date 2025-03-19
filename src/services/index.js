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
export const getUserInfo = (userId) => {
  return fetch(`${apiURL}api/user/info/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
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
export const getClicksCountForSocial = (userId) => {
  return fetch(`${apiURL}api/link/getNoOfClicksForSocial/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

// get the clicks count for shop
export const getClicksCountForShop = (userId) => {
  return fetch(`${apiURL}api/link/getNoOfClicksForShop/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

// get the cta count
export const getCtaCount = (userId) => {
  return fetch(`${apiURL}api/user/cta/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

//      api for go to the links and create clicks
export const createClick = (linkId) => {
  return fetch(`${apiURL}api/link/${linkId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

// get Monthly Clicks
export const getMonthlyClicks = (userId) => {
  return fetch(`${apiURL}api/link/getMonthlyClicks/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
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
export const getAllSocialLinks = (userId) => {
  return fetch(`${apiURL}api/link/getAllLinksForSocial/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}; 

//        api for get all the social links
export const getAllShopLinks = (userId) => {
  return fetch(`${apiURL}api/link/getAllLinksForShop/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}; 

//        api for link delete
export const deleteLink = (token, id) => {
  return fetch(`${apiURL}api/link/deleteLink/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`
    }
  })
};

//        api for getting the link details
export const getLinkById = (id) => {
  return fetch(`${apiURL}api/link/getLink/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

//        api for updating the link info
export const updateLink = (token, id, linkData) => {
  return fetch(`${apiURL}api/link/updateLink/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`
    },
    body: JSON.stringify(linkData)
  });
};

//        api for creating the appearance of preview 
export const saveAppearance = (userId, token, customization) => {
  return fetch(`${apiURL}api/appearance/create/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`  
    },
    body: JSON.stringify(customization)
  });
};

//      api for updating the appearance of preview
export const updateAppearance = (userId, token, customization) => {
  return fetch(`${apiURL}api/appearance/update/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`
    },
    body: JSON.stringify(customization)
  });
};

//      api for fetching the appearance details
export const getAppearance = (userId) => {
  return fetch(`${apiURL}api/appearance/get/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
};