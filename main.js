var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
     if(queryData.id === undefined){

      fs.readdir('./data', function(error, filelist){  //데이터 디렉토리에서 ./data,function{}
        var title = 'Welcome';
        var description = 'HELLO NODE';
        var list = '<ul>';
        var i = 0; //i 값은 0
        while(i < filelist.length){ //i 값이 filelist 보다 작을동안 밑에 코드가 실행되도록한것
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          i = i + 1;
        }

        list = list+'</ul>';

        var template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `;
     response.writeHead(200);
     response.end(template);
      })

  } else {
   fs.readdir('./data', function(error, filelist){  //데이터 디렉토리에서 ./data,function{}
     var title = 'Welcome';
     var description = 'HELLO NODE';
     var list = '<ul>';
     var i = 0; //i 값은 0
     while(i < filelist.length){ //i 값이 filelist 보다 작을동안 밑에 코드가 실행되도록한것
     list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
       i = i + 1;
     }
     list = list+'</ul>';
     fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
       var title = queryData.id;
       var template = `
     <!doctype html>
     <html>
         <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
  </head>
     <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      <h2>${title}</h2>
      <p>${description}</p>
    </body>
    </html>
    `;
  response.writeHead(200);
  response.end(template);
});
});
}
 } else {
   response.writeHead(404);
   response.end('Not found');
 }

});
app.listen(3000);
