let
    child_process=require('child_process'),
    http=require('http')
child_process.execFileSync('sendByWmChar',['喵'.charCodeAt(0)])