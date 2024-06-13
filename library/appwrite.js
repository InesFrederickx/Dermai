import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

import {
  ENDPOINT,
  PLATFORM,
  PROJECT_ID,
  DATABASE_ID,
  USER_COLLECTION_ID,
  SKIN_TYPE_COLLECTION_ID,
  STORAGE_ID,
} from "@env";

export const config = {
  endpoint: ENDPOINT,
  platform: PLATFORM,
  projectId: PROJECT_ID,
  databaseId: DATABASE_ID,
  userCollectionId: USER_COLLECTION_ID,
  skinTypeCollectionIs: SKIN_TYPE_COLLECTION_ID,
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

export const createUser = async (
  email,
  password,
  username,
  skinType,
  skinConcerns
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
      skinType,
      skinConcerns
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
        skinType,
        skinConcerns,
      }
    );
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    // Try to get the user's account information
    try {
      const accountInfo = await account.get();

      // If the user is authenticated, delete the current session
      if (accountInfo.$id) {
        await account.deleteSession("current");
      }
    } catch (error) {
      // If the user is not authenticated, ignore the error and proceed to create a new session
      console.log(
        "User is not authenticated. Proceeding to create a new session."
      );
    }

    // Create a new session
    const newSession = await account.createEmailPasswordSession(
      email,
      password
    );

    return newSession;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteAccount = async () => {
  try {
    let response = await account.delete();
    console.log(response);
  } catch (e) {
    console.error(e);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getUsername = async () => {
  try {
    const accountInfo = await account.get();
    return accountInfo.name;
  } catch (error) {
    console.error("Error getting username:", error);
  }
};
