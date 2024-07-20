import conf from "../conf/conf";

import { Client, Account, Databases, Storage, Query, ID } from "appwrite"

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId, userName}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title, 
                    content,
                    featuredImage, 
                    status,
                    userId,
                    userName,
                }
            )
        }
        catch(error) {
            console.log("Appwrite service :: createPost :: error", error)
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title, 
                    content,
                    featuredImage, 
                    status,
                }
            )
        }
        catch(error) {
            console.log("Appwrite service :: updatePost :: error", error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

            return true
        }
        catch(error) {
            console.log("Appwrite service :: deletePost :: error", error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }
        catch(error) {
            console.log("Appwrite service :: getPost :: error", error)
            return false
        }
    }
    
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        }
        catch(error) {
            console.log("Appwrite service :: getPosts :: error", error)
        }
    }

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }
        catch(error) {
            console.log("Appwrite :: uploadFile :: error", error)
            return false
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )

            return true
        }
        catch(error) {
            console.log("Appwrite :: deleteFile :: error", error)
            return false
        }
    }

    async getMyPosts(userID, queries = [Query.equal("status", "active"), Query.equal("userId", userID)]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        }
        catch(error) {
            console.log("Appwrite service :: getPosts :: error", error)
        }
    }



    async addLike(slug, userID){
        try {
            const postData = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            postData.likes.map( (user) => {
                if(user === userID){
                    return
                }
            })
            const updLikes = postData.likes
            updLikes.push(userID)
            await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId, 
                slug,
                {
                    likes: updLikes
                }
            )
        }
        catch(error) {
            console.log("Appwrite service :: addLike :: error", error)
        }
    }

    async removeLike(slug, userID){
        try {
            const postData = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            const updLikes = postData.likes.filter( (user) => user!=userID)
            await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId, 
                slug,
                {
                    likes: updLikes
                }
            )
        }
        catch(error) {
            console.log("Appwrite service :: removeLike :: error", error)
        }
    }

    async isLiked(slug, userId){
        try {
            const postData = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            const liked = postData.likes.filter( (userid) => userid == userId)
            if(liked.length != 0){
                return true
            }
            return false
        }
        catch(error) {
            console.log("Appwrite service :: isLiked :: error", error)
        }
    }

    async getNumLikes(slug){
        try{
            const postData = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            const numLikes = postData.likes.length
            return numLikes
        }
        catch(error) {
            console.log("Appwrite service :: getNumLikes :: error", error)
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId, 
            fileId
        )
    }
}

const service = new Service()

export default service