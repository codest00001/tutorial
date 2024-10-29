let test;
console.log(typeof (test)); //undefined

test = typeof(test) != 'undefined'? test : 'initial';
console.log(test); //initial //test가 undefined가 아닌게 false니까 initial출력

