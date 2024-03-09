
import { createClient } from 'pexels';

const client = createClient(process.env.REACT_APP_PEXELSCLIENTKEY);
const query = 'minimal scenery';

const fetchWallpapers=async(query)=>{
   
    try{
        const data=await client.photos.search({ query, per_page: 75});
        return data;
    }
    catch (err){
    console.log(err);
    }
    
} 



export { fetchWallpapers, };