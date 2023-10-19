import app from "./app.js";
import { connectDb } from "./config/database.js";
import cloudinary from 'cloudinary';


connectDb();

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    api_key:process.env.CLOUDIANRY_API_KEY
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on port ${process.env.PORT}`)
})