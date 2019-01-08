// port 1046 by ~~(1024+Math.random()*1024)
let
    {URL}=          require('url'),
    fs=             require('fs'),
    http=           require('http'),
    route={
        '/':{
            type:       'text/html;charset=utf-8',
            content:    fs.readFileSync('static/main'),
        },
    }
let s=''
http.createServer(async(rq,rs)=>{
    if(rq.method!='GET')
        rs.end()
    let
        url=new URL(rq.url,'http://a.a/'),
        decodedPathname=decodeURIComponent(url.pathname),
        splittedPathname=decodedPathname.split('/')
    if(splittedPathname[1]=='api'){
        let a=JSON.parse(splittedPathname[2])
        if(a.method=='in'){
            s+=a.value
            rs.writeHead(200)
            rs.end()
        }else if(a.method=='out'){
            rs.writeHead(200)
            rs.end(s)
            s=''
        }
    }else if(decodedPathname in route){
        let a=route[decodedPathname]
        rs.writeHead(200,{'content-type':a.type})
        rs.end(a.content)
    }else{
        rs.writeHead(400)
        rs.end()
    }
}).listen(1046)
