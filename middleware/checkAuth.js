const msalConfig = require("../config/msalconfig");
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

function getSigningKeyPromise(kid, client) {
  return new Promise((resolve, reject) => {
      try {
          client.getSigningKey(kid, (err, key) => {
              try {
                  if (err) {
                      reject(err);
                  }
                  const signingKey = key.publicKey || key.rsaPublicKey;
                  
                  resolve(signingKey);
              }
              catch (err) {
                  reject(err);
              }
          });
      }
      catch (err) {
          reject(err);
      }
  });
}

const validateToken = async (accessToken) => {
  let decodedAndVerified = null;
  // Validate the signature of the access token using the public keys retrieved from the authorization server
  const client = jwksClient({
    jwksUri: `${msalConfig.auth.authority}/discovery/v2.0/keys`
  });
  const kid = jwt.decode(accessToken, { complete: true }).header.kid;


  let signingKey = await getSigningKeyPromise(kid, client);
  console.log(signingKey);
  decodedAndVerified = jwt.verify(accessToken, signingKey);
  console.log(decodedAndVerified);
  if (!decodedAndVerified) {
    throw Error("verification returned null");
}

  // // Verify the access token claims
  const decodedToken = jwt.decode(accessToken);
  
  if (Date.now() >= decodedToken.exp * 1000) {
    throw new Error('Access token has expired');
  }

  // Token is valid
  return true;
};

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).send('Authorization header missing');
  }

  const accessToken = authHeader.substring(7);
  if (!accessToken) {
    return res.status(401).send('Access token missing');
  }
  console.log( accessToken);
  try {
    await validateToken(accessToken);
    
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send('Unauthorized');
  }
  // next();
};

module.exports = authMiddleware;