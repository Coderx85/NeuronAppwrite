import config from "../config/config";
import { Client, Account, ID } from "appwrite";

const appwriteUrl = "https://cloud.appwrite.io/v1" || config.appwriteUrl;
const appwriteProjectId = "6673ba0a000e1da7ec83" || config.appwriteProjectId;
const appwriteDatabaseId = "6673bc7900124a00eeef" || config.appwriteDatabaseId;
const appwriteCollectionId = "6673bc8a000c98392d81" || config.appwriteCollectionId;

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(appwriteUrl)
      .setProject(appwriteProjectId);
    this.account = new Account(this.client);
  }

  async isLoggedIn() {
    try {
      const data = await this.getCurrentUser();
      console.log("Appwrite serive :: isLoggedIn :: data", data); 
      return Boolean(data);
    } catch (error) {
      console.log("Appwrite serive :: isLoggedIn :: error", error);
    }
    return false;
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        // console.log("Appwrite serive :: createAccount :: user", user);
        return user;
      }
    } catch (error) {
      console.log("Appwrite serive :: createAccount :: error", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const user = await this.account.createEmailPasswordSession(email, password);
      console.log("Appwrite serive :: login :: user", user);
      // throw new Error("Invalid email or password");     
    } catch (error) {
      console.log("Appwrite serive :: createAccount :: error", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout() {

    try {
      await this.account.deleteSessions();
      Router.push("/login");
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }

  async addPost(data) {
    try {
      return await this.database.createDocument(
        appwriteCollectionId, 
        data
      );
    } catch (error) {
      console.log("Appwrite serive :: addPost :: error", error);
      throw error;
    }
  }

  async editPost(data) {
    try {
      return await this.database.updateDocument(
        appwriteCollectionId,
        data.documentId,
        data
      );
    } catch (error) {
      console.log("Appwrite serive :: editPost :: error", error);
      throw error;
    }
  }

}

const authService = new AuthService();

export default authService