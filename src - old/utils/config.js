const config = {
    apiBaseUrl: 'http://localhost:3001',
    apiTimeout: 5000,
    apiHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    //
    storage: {
      tokenKey: 'auth_token',
      userKey: 'user',
    },
}

export default config;