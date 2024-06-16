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

export async function createUser(
  email,
  password,
  username,
  skinType,
  skinConcerns
) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Failed to create account");

    const avatarUrl = avatars.getInitials(username);

    await clearSessions();

    await accountCreationSignIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
        skinType: skinType,
        skinConcerns: skinConcerns,
      }
    );
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(error.message);
  }
}

export const signIn = async (email, password) => {
  try {
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

//To solve problem with not being able to access user data after sign up --> appwrite problem
export async function accountCreationSignIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    if (
      error.message ===
      "AppwriteException: Creation of a session is prohibited when a session is active."
    ) {
      console.log("A session is already active.");
      return account.getSession("current");
    }
    console.error("Error while signing in:", error);
    throw new Error(error.message);
  }
}

export async function clearSessions() {
  try {
    const sessions = await account.listSessions();
    for (const session of sessions.sessions) {
      await account.deleteSession(session.$id);
    }
    console.log("All sessions are cleared.");
  } catch (error) {
    console.error("Error clearing sessions:", error);
  }
}

export const checkForExistingSession = async () => {
  try {
    const session = await account.getSession("current");
    if (session) {
      // Session exists, fetch user details
      const currentUser = await getCurrentUser();
      // Update app state here to reflect user is logged in
      console.log("User is logged in", currentUser);
      return currentUser;
    }
  } catch (error) {
    // Handle case where no session exists
    console.error("No active session:", error);
    // Possibly redirect to login screen or update state to reflect logged out status
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

export const updateUserEmail = async (email, password) => {
  try {
    const updatedAccount = await account.updateEmail(email, password);
    return updatedAccount;
  } catch (error) {
    console.error("Failed to update user email:", error);
    throw new Error(error);
  }
};

export const updateUserPassword = async (password, oldPassword) => {
  try {
    const updatedAccount = await account.updatePassword(password, oldPassword);
    return updatedAccount;
  } catch (error) {
    console.error("Failed to update user password:", error);
    throw new Error(error);
  }
};
