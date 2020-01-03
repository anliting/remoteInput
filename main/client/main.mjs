import child_process from   'child_process'
import net from             'net'
let connection
function tryConnect(){
    connection=net.connect({
        host:'anliting.com',
        port:1100
    }).on('data',a=>{
        a=''+a
        for(let i=0;i<a.length;i++)
            child_process.execFileSync(
                'sendByWmImeChar',[a[i].charCodeAt(0)]
            )
    }).on('end',()=>{
        setTimeout(tryConnect,1e3)
    }).on('timeout',()=>{
        connection.end()
        setTimeout(tryConnect,1e3)
    }).on('error',e=>{
        if(
            e.code=='ECONNREFUSED'||
            e.code=='ETIMEDOUT'||
            e.code=='ECONNRESET'||
            e.code=='EADDRINUSE'
        ){
            setTimeout(tryConnect,1e3)
            return
        }
        console.error('connection/error',e)
        process.exit()
    }).setTimeout(1e3)
}
tryConnect()
