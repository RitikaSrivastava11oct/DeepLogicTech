const http=require('http');
const request = require('request');
const port=3000;
const hostname='localhost';

let storyArray=[];

request('https://time.com', function (error,response,body) {

let index1=body.indexOf('<h1 class="module-title decoration-arrow">Latest Stories</h1>');
let index2=body.indexOf('</ol>',index1);
let str=body.slice(index1,index2);

    for(let i=1;i<=5;i++){
        let index3=str.indexOf('href=');
        let index4=str.indexOf('/>',index3);
        
        let link="https://time.com"+str.slice(index3+5,index4);
        let index5=str.indexOf('</a></h2>',index4);
        let title=str.slice(index4+2,index5);
        str=str.slice(index5);
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



