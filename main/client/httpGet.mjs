import http from            'http'
function httpGet(url,agent){
    return new Promise((rs,rj)=>{
        let rq=http.get(url,{agent},rs)
        rq.once('error',rj)
        rq.end()
    })
}
export default httpGet
