// port 1046 by ~~(1024+Math.random()*1024)
import url from     'url'
import fs from      'fs'
import http from    'http'
import net from     'net'
let
    route={
        '/':{
            type:       'text/html;charset=utf-8',
            content:    fs.readFileSync('remoteInput/main/server/static/main'),
        },
        '/_doe.mjs':{
            type:       'application/javascript;charset=utf-8',
            content:    fs.readFileSync('remoteInput/main/server/static/doe.mjs'),
        },
    },
    s=''
http.createServer(async(rq,rs)=>{
    if(rq.method!='GET')
        return rs.end()
    let parse={}
    try{
        parse.url=new url.URL(rq.url,'http://a')
        parse.decodedPathname=parse.url.pathname.split('/').map(
            decodeURIComponent
        )
    }catch(e){
        rs.writeHead(400)
        return rs.end()
    }
    if(parse.decodedPathname[1]=='api'){
        let a
        try{
            a=JSON.parse(parse.decodedPathname[2])
        }catch(e){
            rs.writeHead(400)
            return rs.end()
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
    }else if(parse.url.pathname in route){
        let a=route[parse.url.pathname]
        rs.writeHead(200,{'content-type':a.type})
        rs.end(a.content)
    }else{
        rs.writeHead(404)
        rs.end()
    }
}).listen(1046)
net.createServer(con=>{
    con.on('connect',()=>{
    }).on('data',()=>{
    }).on('end',()=>{
    }).on('timeout',()=>{
    }).setTimeout(60e3)
}).listen(1047)
