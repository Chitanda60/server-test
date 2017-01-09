import http from 'http'
import url from 'url'
import util from 'util'
import fs from 'fs'
import querystring from 'querystring';

// 应用根路径
let localhost = 'http://10.1.133.143:3000'
let root = '/Users/wukeyu/WebstormProjects/server-test/web/app'

let tempMessage = {
    name: 'shemei',
    mess: 'hello'
}
let tempDate = {
    time: '2017.1.3'
}

http.createServer((req, res) => {
    if (req.url === '/message' || req.url === '/date' || req.url === '/authentication') {
        // 处理请求
        let text = ''
        switch (req.method)  {
            case 'POST':
                postAuthentication(req, res);
                break
            case 'DELETE':
                break
            case 'PUT':
                break
            case 'GET':
                getMessage(req, res)
                getDate(req, res)
                break
            case 'OPTIONS':
                resolvePreRequest(req, res)
                break
        }
    } else {
        let file = root + req.url
        // 读取文件
        fs.readFile(file, (err, data) => {
            if (err) {
                res.writeHeader(404, {
                    'Content-Type':'text/html;charset=utf-8'                    
                })
                res.write('<h1>404错误</h1>')
                res.end();
            } else {
                res.writeHeader(200, {
                    'Content-Type':'text/html;charset=utf-8'
                })
                res.write(data)
                res.end()
            }
        })
    }    
    // res.writeHead(200, {
    //     'Content-Type':'text/plain;charset=utf-8'
    // })
    // res.end(text);
}).listen(3000)
console.log('Server running')

// 处理预检请求
const resolvePreRequest = (req, res)=> {
    res.writeHead(200, {
        'Content-Type':'text/html;charset=utf-8',
        'Access-Control-Allow-Origin':localhost,
        'Access-Control-Allow-Headers':'X-Test-Info',
        'Access-Control-Allow-Methods':'GET, POST, PUT'
    })
    res.end(JSON.stringify(tempMessage));
}

// getMessage request
const getMessage = (req, res) => {
    res.writeHead(200, {
        'Content-Type':'text/html;charset=utf-8',
        'Access-Control-Allow-Origin':localhost,
    })
    res.end(JSON.stringify(tempMessage));
}

// getDate request
const getDate = (req, res) => {
    res.writeHead(200, {
        'Content-Type':'text/html;charset=utf-8',        
    })
    res.end(JSON.stringify(tempDate));
}

// postAuthentication request
const postAuthentication = (req, res) => {
    let body = '';
    res.writeHead(200, {
        'Content-Type':'text/html;charset=utf-8'
    })
    req.on('data', function(chunk){
        body += chunk;
    })
    req.on('end', function(){
        body = querystring.parse(body)
        res.end(JSON.stringify(body))
    })    
}