import express from "express";
import bodyParser, { urlencoded } from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const url = ["https://www.healthcare.gov/api/glossary.json" , "https://orghunter.3scale.net/#plans" , "https://www.file.io/developers"];

app.use(bodyParser.urlencoded({extended: true}));


const checkWebsiteStatus = async (url) => {
   try {
       const response = await axios.get(url);
       return {
           url: url,
           status: response.status,
           message: 'Available'
       };
   } catch (error) {
       return {
           url: url,
           status: error.response ? error.response.status : 'N/A',
           message: 'Unavailable'
       };
   }
};


app.get('/check-websites', async (req, res) => {
   const results = await Promise.all(websites.map(url => checkWebsiteStatus(url)));
   res.json(results);
});

app.listen(port,()=>{
   console.log(`listening on port ${port}`);
})
  

