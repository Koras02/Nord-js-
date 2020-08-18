var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body, control){ //1.이곳에 생성 //2.control이라는 변수를 제공
  return `
 <!doctype html>
 <html>
 <head>
   <title>WEB2- ${title}</title>
   <meta charset="utf-8">
 </head>
 <body>
   <h1><a href="/">WEB1</a></h1>
   ${list}
   ${control}
   ${body}
 </body>
 </html>
 `;
} // 3.retun `하고 내용붙여넣기` 위에    <h2>${title}</h2>   <p>${description}</p> 이부분은 미래의 이런형식이아닐수있기에 cut하고
function templateList(filelist){
  var list = '<ul>';
  var i = 0; //i 값은 0
  while(i < filelist.length){ //i 값이 filelist 보다 작을동안 밑에 코드가 실행되도록한것
  list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list+'</ul>';
  return list; //list 값은 return 으로주줌  그리고 이코드가 실행되려면 file list가 필요한다 filelist가없음 그래서 templatelist(filelist)라는 매개변수로 어떤값을 입력해야되
  //그럼우리가 어디를 교체할수있을까
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
     if(queryData.id === undefined){
       fs.readdir('./data', function(error, filelist){  //데이터 디렉토리에서 ./data,function{}
        var title = 'Welcome';
        var description = 'HELLO NODE';
        var list = templateList(filelist); //var list 부분 지우고 이렇게 쓰면 filelist 값을 공급함에 따라 목표달성 filelist는 데이터 디렉토리에 파일의 list고 그래서 template에 입력값으로
        //넣어주면되고 templatelist안에 filelist값을 받아서 list 정보를 만든후에 그결과를 return 하고있음.다시홈으로 가면 똑같이 동작하는걸볼수있음
        var template = templateHTML(title, list,
          `<h2>${title}</h2>${description}`, //2.이부분을 cut 하고  4.이곳에다가 우리가만든 함수이름 templateHTML()하고
        //template 안에는 ${title} ${list} ${title}  ${description} 이럼값을이 있기떄문에 우린 templateHTML(tile)여기에 입력값으로 title을줌
          `<a href="/create">create</a>`
         );
         response.writeHead(200); //그럼 readdir 밑에 var title 값이 templateHTML(title)로 들어와서 그것을 맨위 5번째칸 함수안에담을때는 title로 받고 그럼 이제
         response.end(template); //return 안에있는 title 2개가 채워지는데 list 가있는데 list는 var template 아까 추가한 부분에 괄호 (title,list)를 추가하면 var listrk
         //list가 되면서 templateHTML(title.list) 가됨 그다음에 여기다 descriptin을 넣어도 되는데 우리가 짤코드는 다른형태가 편함 + 위에 cut한부분에`<h2>${title}</h2>${description} 를
         // 추가로 추가시킴 그리고 이내용 그대로 copy 해서 else 에다도 붙여넣기
      });
     } else {
       fs.readdir('./data', function(error, filelist){  //데이터 디렉토리에서 ./data,function{}
      //readdir 부분아래 var list 에서 while } 부분에까지 중복인데 그부분 cut 해서 맨위에다 function templatelist() {이곳에 중복된부분 붙여넣기하고}
      //i 값은 0
     //i 값이 filelist 보다 작을동안 밑에 코드가 실행되도록한것
     //last.여기도 cut 그리고 여기다 넣어도 되는데 그냥 vartitle 밑에다가 넣어
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
          var title = queryData.id;
          var list = templateList(filelist); //이곳에 추가
          var template = templateHTML(title, list,
             `<h2>${title}</h2>${description}`,
             `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
        );
       response.writeHead(200);
       response.end(template);
    });
  });
 }
} else if(pathname === '/create'){
  fs.readdir('./data', function(error, filelist){  //데이터 디렉토리에서 ./data,function{}
   var title = 'WEB - create';
   var list = templateList(filelist); //var list 부분 지우고 이렇게 쓰면 filelist 값을 공급함에 따라 목표달성 filelist는 데이터 디렉토리에 파일의 list고 그래서 template에 입력값으로
   //넣어주면되고 templatelist안에 filelist값을 받아서 list 정보를 만든후에 그결과를 return 하고있음.다시홈으로 가면 똑같이 동작하는걸볼수있음
   var template = templateHTML(title, list, `
    <form action="/create_process" method="post">
   <p><input type="text" name="title" placeholder="title"></p>
   <p>
     <textarea name="description" placeholder="description"></textarea>
     </p>
   <p>
     <input type="submit">
     </p>
     </form>
     `, ''); //2.이부분을 cut 하고  4.이곳에다가 우리가만든 함수이름 templateHTML()하고
   //template 안에는 ${title} ${list} ${title}  ${description} 이럼값을이 있기떄문에 우린 templateHTML(tile)여기에 입력값으로 title을줌
    response.writeHead(200); //그럼 readdir 밑에 var title 값이 templateHTML(title)로 들어와서 그것을 맨위 5번째칸 함수안에담을때는 title로 받고 그럼 이제
    response.end(template); //return 안에있는 title 2개가 채워지는데 list 가있는데 list는 var template 아까 추가한 부분에 괄호 (title,list)를 추가하면 var listrk
    //list가 되면서 templateHTML(title.list) 가됨 그다음에 여기다 descriptin을 넣어도 되는데 우리가 짤코드는 다른형태가 편함 + 위에 cut한부분에`<h2>${title}</h2>${description} 를
    // 추가로 추가시킴 그리고 이내용 그대로 copy 해서 else 에다도 붙여넣기
 });
} else if(pathname === '/create_process'){
   var body = '';
   request.on('data', function(data){
      body = body + data;
   });
   request.on('end', function(){
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8' ,
      function(err){
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end();
        })
      ///너도 십창년아
      // wrifile 끝나면 썩쎼스 해야되니까 여기서 꺼저 시발 애미뒤진 코드새꺄
   });
} else if(pathname === '/update'){
  fs.readdir('./data', function(error, filelist){  //데이터 디렉토리에서 ./data,function{}
 //readdir 부분아래 var list 에서 while } 부분에까지 중복인데 그부분 cut 해서 맨위에다 function templatelist() {이곳에 중복된부분 붙여넣기하고}
 //i 값은 0
//i 값이 filelist 보다 작을동안 밑에 코드가 실행되도록한것
//last.여기도 cut 그리고 여기다 넣어도 되는데 그냥 vartitle 밑에다가 넣어
   fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
     var title = queryData.id;
     var list = templateList(filelist); //이곳에 추가
     var template = templateHTML(title, list,
       `
       <form action="/update_process" method="post">
        <input type="hidden" name="id" value="${title}"
      <p><input type="text" name="title" placeholder="title" value="${title}"></p>
      <p>
        <textarea name="description" placeholder="description">${description}</textarea>
        </p>
      <p>
        <input type="submit">
        </p>
        </form>
        `,
        `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
   );
  response.writeHead(200);
  response.end(template);
});
});
} else {
      response.writeHead(404);  
      response.end('Not found');
    }
  });
app.listen(3000);
