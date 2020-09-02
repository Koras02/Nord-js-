var members = ['egoing', 'k8805', 'hoya'];
console.log(members[1]); // K8805 0부터시작하니까 1번째
var i = 0
while(i < members.length) {
  console.log('array loop', members[i]);
  i = i + 1;
}

var roles = {
  'programmer':'egoing',
  'designer': 'K8805',
  'manager' : 'hoya'
}
console.log(roles.manager); //k8805
console.log(roles['designer']); //k8805

for(var n in roles) {
    console.log('object => ', n, 'value => ', roles[n]);
}