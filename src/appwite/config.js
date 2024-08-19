import conf from "../config/config";
import { Client,ID,Databases,Storage,Query} from "appwrite"; 
export class Service{
    client = new Client();
    Database;
    storage;

    constructor(){
        this.client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('66b4594000019f8e79d8');
        this.Database =new Databases(this.client);;
        this.storage = new Storage(this.client);
    }
    // const client = new Client()
    //         .setEndpoint('https://cloud.appwrite.io/v1')
    //         .setProject('66b4594000019f8e79d8');

    //         const storage = new Storage(client);
    //         const file =  storage.createFile(
    //         '66b45bae001f1a99e88d',
    //         ID.unique(),
    //         data.image[0]
    //     );

    async createPost({title,slug,content,Image,status,user_Id}){
        try {
            console.log({title,slug,content,Image,status,user_Id})
            return await this.Database.createDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,content,Image,status,user_Id
                }
            )
        } catch (error) {
            console.log("this is the Error : "+error);
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.Database.updateDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,{
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error;
        }
    }
    async deletePost(slug){
        try {
            await this.Database.deleteDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            throw error;
            return false;
        }
    }
    async getPost(slug){
        try {
            return await this.Database.getDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            throw error;
            return false;
        }
    }
    async getPosts(querires =[Query.equal("status","active")]){
        try {
            return await this.Database.listDocuments(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                querires,
            )
        } catch (error) {
            console.log("their is an error: "+error);
            
        }
    }

    //file upload service ;
    async uploadFile(file){
        try {
            console.log(file);
            return await this.storage.createFile(
                        '66b45bae001f1a99e88d',
                        ID.unique(),
                        file
                    );
        } catch (error) {
            console.log("this is the Error:"+error)
        }
    }
    // async uploadFile(file) {
    //     try {
    //         console.log('Uploading file:', file);
            
    //         // Make sure the file parameter is in the correct format
    //         if (!file) {
    //             throw new Error('No file provided for upload');
    //         }
    
    //         // Use a unique ID for the file
    //         const fileId = ID.unique();
            
    //         // Upload the file to the specified bucket
    //         const response = await this.bucket.createFile(
    //             '66b45bae001f1a99e88d', // Replace with your bucket ID
    //             fileId,
    //             file
    //         );
            
    //         console.log('File uploaded successfully:', response);
    //         return response;
    //     } catch (error) {
    //         console.error('Error uploading file:', error);
    //         throw error; // Optionally rethrow the error for further handling
    //     }
    // }
    


    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            throw error;
        }

    }

    async getFilePrivies(Image){
        try {
            return await this.storage.getFilePreview(
                conf.appwriteBucketId,
                Image,
            )
        } catch (error) {
            console.log("here is the error "+error)
        }
    }
}
const service = new Service();
export default service