// imports for jwt processing
const jwtUtils = require('./modules/jwtUtils.js');
const jwt = require('jsonwebtoken');

// express for middleware
const express = require('express');
const app = express();

// being routes
app.get('/auth', async (req, res) => {  
  try {
    var authHeader = req.headers.authorization;
    var parts = authHeader.split(" ");
    
    if (parts.length != 2) {
      res.status(401).send("No authorization token was found.");
    }

    var scheme = parts[0];
    if(!/^Bearer$/i.test(scheme)) {
      res.status(401).send("Format is Authorization: Bearer [token].");
    }

    // use http request to get JWKS certs
    const keysObject = await jwtUtils.keysObject();

    // decode the inbound JWT
    var token = parts[1];
    var decodedJWT = jwtUtils.decodeJWT(token);
    
    // use the kid in the header of the JWT to match against the public certs returned
    var kid = decodedJWT.header.kid;
    var secretMatchingHeader = keysObject[kid];
    
    // use the matching secret found in the keysobject to verify the JWT was issued by Google
    jwt.verify(token, secretMatchingHeader, { algorithms: [ "RS256" ], complete: true }, function(err, decoded) {
      console.log("Token has been successfully verified.");
    });

    // call git auth and return git token to use with subsequent curl calls
    

    res.status(200).send("\nOK\n");

  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `The container started successfully and is listening for HTTP requests on ${PORT}`
  );
});
