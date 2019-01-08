let
    child_process=  require('child_process'),
    http=           require('http')
setInterval(()=>{
    http.get(`http://anliting.com:1046/api/${JSON.stringify({
        method:'out'
    })}`,res=>{
        let a=[]
        res.on('data',a.push.bind(a))
        res.on('end',()=>{
            let s=Buffer.concat(a).toString()
            for(let i=0;i<s.length;i++)
                child_process.execFileSync(
                    'sendByWmImeChar',[s[i].charCodeAt(0)]
                )
        })
    })
},1e2)
