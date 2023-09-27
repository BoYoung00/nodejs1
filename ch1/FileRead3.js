// 필요한 모듈
var http = require('http'); // HTTP 모듈
var fs = require('fs');     // 파일 시스템 모듈
var url = require('url');   // URL 처리 모듈

// HTTP 서버를 생성합니다.
var app = http.createServer(function(request, response) {
    var _url = request.url; // 요청된 URL을 가져옴
    var queryData = url.parse(_url, true).query; // URL에서 쿼리 파라미터를 추출
    var pathname = url.parse(_url, true).pathname; // URL에서 경로를 추출

    if(pathname === '/') { // 만약 경로가 루트인 경우
        if(queryData.id === undefined) { // 쿼리 파라미터 id가 없는 경우
            // 기본 페이지를 응답
            fs.readFile(`data/${queryData.id}`, 'utf8', (err, data) => {
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var template = `
                <!doctype html>
                <html>
                <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
                </head>
                <body>
                <h1><a href="index.html">WEB</a></h1>
                <ol>
                    <li><a href="/?id=HTML">HTML</a></li>
                    <li><a href="/?id=CSS">CSS</a></li>
                    <li><a href="/?id=JavaScript">JavaScript</a></li>
                </ol>
                <h2>${title}</h2>
                <p>${description}</p>
                </body>
                </html>
                `;
                response.writeHead(200); // HTTP 상태 코드 200 (OK)를 설정합니다.
                response.end(template); // 응답을 보냅니다.
            });
        } else { // 쿼리 파라미터 id가 있는 경우
            // 해당 id에 대한 페이지를 응답합니다.
            fs.readFile(`data/${queryData.id}`, 'utf8', (err, description) => {
                var title = queryData.id
                var template = `
                <!doctype html>
                <html>
                <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
                </head>
                <body>
                <h1><a href="index.html">WEB</a></h1>
                <ol>
                    <li><a href="/?id=HTML">HTML</a></li>
                    <li><a href="/?id=CSS">CSS</a></li>
                    <li><a href="/?id=JavaScript">JavaScript</a></li>
                </ol>
                <h2>${title}</h2>
                <p>${description}</p>
                </body>
                </html>
                `;
                response.writeHead(200); // HTTP 상태 코드 200 (OK)를 설정
                response.end(template); // 응답 보냄
            });
        }
    } else { // 경로가 루트가 아닌 경우 (404 에러 처리)
        response.writeHead(404); // HTTP 상태 코드 404 (Not Found)를 설정
        response.end('Not found'); // "Not found" 메시지를 응답
    }
});

// 서버를 3000 포트에서 리스닝
app.listen(3000);
