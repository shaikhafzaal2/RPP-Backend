const msal = require('@azure/msal-node');

const msalConfig = {
  auth: {
    clientId: "d1d0db53-bf5b-4565-a191-5ddd0914ee32",
    authority: "https://login.microsoftonline.com/e038180b-0021-401f-83a9-a2d45acee0dc",
    
  },
  cache: {
    cacheLocation: 'memory',
    storeAuthStateInCookie: false
  }
};

// const pca = new msal.PublicClientApplication(config);
// module.exports = pca;
module.exports = msalConfig