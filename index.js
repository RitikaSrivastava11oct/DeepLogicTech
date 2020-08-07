
const http=require('http');
const request = require('request');
const port=3000;
const hostname='localhost';

let storyArray=[];
request('https://time.com', function (error,response,body) {

    let str = (body.split("<section class=\"homepage-module latest\" data-module_name=\"Latest Stories\">")[1]).split("<h1 class=\"module-title decoration-arrow\">Latest Stories</h1>")[1].split("<ol class=\"swipe-h\">")[1].split("</ol>")[0];
    let str1=str.split("<li>");

    for(let i=1;i<str1.length;i++){
        let str2=str1[i];
        let str3=(str2.split("<article class=\"slide\">")[1]).split("<div class=\"content\">")[1].split("<p class=\"no-eyebrow\"></p>")[1]
        let link="https://time.com"+(str3.split("<h2 class=\"title\"><a href=")[1]).split("/>")[0];
        let title=(str3.split("/>")[1]).split("</a></h2>")[0];
        storyArray.push({"title":title,"link":link});

    }          
});

const server=http.createServer((req,res)=>{

	if(req.method=='GET' && req.url=='/getTimeStories'){
		res.statusCode=200;
		res.setHeader("Content-Type","application/json");
        res.end(JSON.stringify(storyArray));
        
	}
});
server.listen(port,hostname,()=>{
	console.log(`server is running at port ${port}`);
});



