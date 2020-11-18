var authClient = new OktaAuth({
  issuer: 'https://dev-640429.okta.com/oauth2/default',  
  url: 'https://dev-640429.okta.com',
  clientId: '0oa4k96n8kgtaga1f357',
  redirectUri: 'http://localhost:8080'
});

if (authClient.token.isLoginRedirect()) {
  // Parse token from redirect url
  authClient.token.parseFromUrl()
    .then(data => {
      console.log(data);
      const { idToken } = data.tokens;
      const { accessToken} = data.tokens;
      // Store parsed token in Token Manager
      authClient.tokenManager.add('accessToken', accessToken);
      authClient.tokenManager.add('idToken', idToken);
      
    });
} else {
  // Attempt to retrieve ID Token from Token Manager
  authClient.tokenManager.get('accessToken')
    .then(accessToken => {

      if (accessToken) {
        console.log(`access_token ${accessToken.accessToken}!`);
      } else {
        // You're not logged in, you need a sessionToken
        authClient.token.getWithRedirect({
          responseType: ['token','id_token']
        });
      }
    })
}