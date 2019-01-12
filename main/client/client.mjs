import child_process from   'child_process'
import httpGet from         './httpGet'
import getData from         './getData'
setInterval(async()=>{
    try{
        console.log('a')
        let res=httpGet(`http://anliting.com:1046/api/${
            encodeURIComponent(JSON.stringify(['out']))
        }`)
        console.log('b')
        let s=(await getData(res)).toString()
        console.log(s)
        for(let i=0;i<s.length;i++)
            child_process.execFileSync(
                'client\sendByWmImeChar',[s[i].charCodeAt(0)]
            )
    }catch(e){
        console.log(e)
    }
},1e2)
