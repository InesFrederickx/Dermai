const { GoogleAuth } = require("google-auth-library");
const path = require("path");

// Path to your service account key JSON file
const keyFile = path.join(__dirname, "./dermai-433712-6ecec4f34246.json");

// Scopes for the Dialogflow API
const scopes = ["https://www.googleapis.com/auth/cloud-platform"];

async function getAccessToken() {
  const auth = new GoogleAuth({
    keyFile: keyFile,
    scopes: scopes,
  });

  const authClient = await auth.getClient();
  const accessToken = await authClient.getAccessToken();

  console.log("OAuth2 Token:", accessToken.token);
  return accessToken.token;
}

getAccessToken().catch(console.error);
