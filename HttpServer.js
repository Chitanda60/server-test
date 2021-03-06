import http from 'http'
import url from 'url'
import util from 'util'
import fs from 'fs'
import querystring from 'querystring';

// 应用根路径
let localhost = 'http://10.1.135.18:1801'
let root = '/Users/wukeyu/WebstormProjects/server-test/web/template'

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
                if (req.url === '/message') {
                    getMessage(req, res)
                } else if (req.url === '/date') {
                    getDate(req, res)
                }
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
}).listen(1801, function(){
    console.log('Server running in 1801')
})

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
        'Access-Control-Allow-Origin': '*',
    })
    res.end(JSON.stringify(tempMessage));
}

// getDate request
const getDate = (req, res) => {
    res.writeHead(200, {
        'Content-Type':'text/html;charset=utf-8',
        // 允许访问的origin
        'Access-Control-Allow-Origin': '*',
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