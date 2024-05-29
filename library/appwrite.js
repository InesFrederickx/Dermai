import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Storage,
} from "react-native-appwrite";

import {
  ENDPOINT,
  PLATFORM,
  PROJECT_ID,
  DATABASE_ID,
  USER_COLLECTION_ID,
  IMAGE_COLLECTION_ID,
  STORAGE_ID,
} from "@env";

export const config = {
  endpoint: ENDPOINT,
  platform: PLATFORM,
  projectId: PROJECT_ID,
  databaseId: DATABASE_ID,
  userCollectionId: USER_COLLECTION_ID,
  storageId: STORAGE_ID,
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

const deleteAccount = async () => {
  try {
    let response = await account.delete();
    console.log(response);
  } catch (e) {
    console.error(e);
  }
};

export const fetchUsername = async (userId) => {
  try {
    const userDocument = await databases.getDocument(
      config.userCollectionId,
      userId
    );
    return userDocument.username; // Replace 'username' with the actual key for the username in your database
  } catch (error) {
    console.error(error);
  }
};
