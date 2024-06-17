import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";

import {
  ENDPOINT,
  PLATFORM,
  PROJECT_ID,
  DATABASE_ID,
  USER_COLLECTION_ID,
  PHOTO_COLLECTION_ID,
  SKIN_TYPE_COLLECTION_ID,
  STORAGE_ID,
} from "@env";

export const config = {
  endpoint: ENDPOINT,
  platform: PLATFORM,
  projectId: PROJECT_ID,
  databaseId: DATABASE_ID,
  userCollectionId: USER_COLLECTION_ID,
  photoCollectionId: PHOTO_COLLECTION_ID,
  skinTypeCollectionId: SKIN_TYPE_COLLECTION_ID,
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
const storage = new Storage(client);

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

export const addIngredientToFavourites = async (userId, ingredient) => {
  try {
    const currentUser = await databases.getDocument(
      config.databaseId,
      config.userCollectionId,
      userId
    );

    // Check if the ingredient is already in the favorites array to avoid duplicates
    if (currentUser.favourites.includes(ingredient)) {
      // Remove the ingredient from the favorites array
      updatedFavourites = currentUser.favourites.filter(
        (item) => item !== ingredient
      );
      console.log("Ingredient removed from favorites.");
    } else {
      // Add the ingredient to the favorites array
      updatedFavourites = [...currentUser.favourites, ingredient];
      console.log("Ingredient added to favorites.");
    }

    // Update the user document with the new or modified favorites array
    const updatedUser = await databases.updateDocument(
      config.databaseId,
      config.userCollectionId,
      userId,
      { favourites: updatedFavourites }
    );

    return updatedUser;
  } catch (error) {
    console.error("Failed to add ingredient to favorites:", error);
    throw new Error(error);
  }
};

export const isIngredientFavourite = async (userId, ingredient) => {
  try {
    const currentUser = await databases.getDocument(
      config.databaseId,
      config.userCollectionId,
      userId
    );
    return currentUser.favourites.includes(ingredient);
  } catch (error) {
    console.error("Failed to check if ingredient is favourite:", error);
    throw new Error(error);
  }
};

export const removeIngredientFromFavourites = async (userId, ingredient) => {
  try {
    const currentUser = await databases.getDocument(
      config.databaseId,
      config.userCollectionId,
      userId
    );

    if (!currentUser.favourites.includes(ingredient)) {
      console.log("Ingredient not in favorites.");
      return currentUser;
    }

    const updatedFavourites = currentUser.favourites.filter(
      (item) => item !== ingredient
    );

    // Update the user document with the new favorites array
    const updatedUser = await databases.updateDocument(
      config.databaseId,
      config.userCollectionId,
      userId,
      { favourites: updatedFavourites }
    );

    console.log("Ingredient removed from favorites.");
    return updatedUser;
  } catch (error) {
    console.error("Failed to remove ingredient from favourites:", error);
    throw new Error(error);
  }
};

export const getFilePreview = async (fileId, type) => {
  let fileUrl;
  try {
    if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        1000,
        1000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadFile = async (file, type) => {
  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );
    console.log("Uploaded file response:", uploadedFile);

    if (!uploadedFile.$id) {
      throw new Error(
        "Uploaded file is undefined or does not have an $id property"
      );
    }

    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const createImage = async (form) => {
  try {
    const imageUrl = await Promise.all([uploadFile(form.image, "image")]);

    const newPost = await databases.createDocument(
      databaseId,
      photoCollectionId,
      ID.unique(),
      {
        image: imageUrl,
        description: form.description,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
};
