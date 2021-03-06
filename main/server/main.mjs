import url from     'url'
import fs from      'fs'
import http from    'http'
import https from   'https'
import net from     'net'
import path from    'path'
import core from    '@anliting/core'
let
    mainDir=path.dirname((new url.URL(import.meta.url)).pathname),
    tcpListen=(''+fs.readFileSync('tcpListen')).split('\n')[0].split(' '),
    httpListen=(''+fs.readFileSync('httpListen')).split('\n')[0].split(' '),
    route={
        '/':{
            type:       'text/html;charset=utf-8',
            content:    fs.readFileSync(`${mainDir}/static/main`),
        },
        '/_doe.mjs':{
            type:       'application/javascript;charset=utf-8',
            content:    fs.readFileSync(`${mainDir}/static/doe.mjs`),
        },
    },
    s='',
    mainConnection,
    tls
function pushToMainConnection(){
    if(!(s&&mainConnection))
        return
    mainConnection.write(s)
    s=''
}
;(async()=>{
    if(await core.existFile('tls'))
        tls={
            key:fs.readFileSync('tls/key'),
            crt:fs.readFileSync('tls/crt')
        }
    let
        tcpServer=net.createServer(con=>{
            mainConnection=con
            pushToMainConnection()
            con.on('data',()=>{
            }).on('end',()=>{
                if(mainConnection==con)
                    mainConnection=0
            }).on('timeout',()=>{
                con.destroy()
                if(mainConnection==con)
                    mainConnection=0
            }).setTimeout(60e3)
        }),httpServer=tls?https.createServer({
            cert:tls.crt,
            key:tls.key,
        }):http.createServer()
    httpServer.on('request',async(rq,rs)=>{
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
                pushToMainConnection()
                rs.writeHead(200)
                rs.end()
                return
            }
            rs.writeHead(400)
            return rs.end()
        }else if(parse.url.pathname in route){
            let a=route[parse.url.pathname]
            rs.writeHead(200,{'content-type':a.type})
            rs.end(a.content)
        }else{
            rs.writeHead(404)
            rs.end()
        }
    })
    tcpServer.listen(...tcpListen)
    httpServer.listen(...httpListen)
})()
