export default function connect(method,sql,param){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'electron'
    });
    
    connection.connect();
    if(method=='insert'){
        var addVip = 'insert into seckill(name,number) values(?,?)';
        var param = ['100元秒杀家教机',100];    
        connection.query(addVip, param, function(error, result){
            if(error)
            {
                console.log(error.message);
            }else{
                console.log('insert id: '+result.insertId);
            }
            });
    }
    if(method=='insert'){

    }
    if(method=='insert'){

    }
    if(method=='insert'){

    }
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });

    connection.end();
}
