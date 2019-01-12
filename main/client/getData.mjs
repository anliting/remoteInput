import concatStream from    'concat-stream'
async function getData(readStream){
    readStream=await readStream
    return new Promise((rs,rj)=>{
        readStream.once('error',rj)
        readStream.pipe(concatStream(rs))
    })
}
export default getData
