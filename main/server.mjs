// port 1046 by ~~(1024+Math.random()*1024)
import url from 'url'
import fs from 'fs'
import http from 'http'
let
    {URL}=url,
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
    let url,splittedPathname,decodedPathname
console.log('a')
    try{
        url=new URL(rq.url,'http://a')
        splittedPathname=url.pathname.split('/')
        decodedPathname=splittedPathname.map(decodeURIComponent)
    }catch(e){
        rs.writeHead(400)
        rs.end()
        return
    }
console.log('b')
    if(decodedPathname[1]=='api'){
        let a
        try{
            a=JSON.parse(decodedPathname[2])
        }catch(e){
            rs.writeHead(400)
            rs.end()
            return
        }
        if(a[0]=='in'){
            s+=a[1]
            rs.writeHead(200)
            rs.end()
        }else if(a[0]=='out'){
            rs.writeHead(200)
            rs.end(s)
            s=''
        }
    }else if(url.pathname in route){
        let a=route[url.pathname]
        rs.writeHead(200,{'content-type':a.type})
        rs.end(a.content)
    }else{
        rs.writeHead(400)
        rs.end()
    }
}).listen(1046)
