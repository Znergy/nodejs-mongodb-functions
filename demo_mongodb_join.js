var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection('orders').aggregate([
    { $lookup:
       {
         from: 'products',
         localField: 'products_id',
         foreignField: 'id',
         as: 'orderdetails'
       }
     }
    ], function(err, res) {
    if (err) throw err;
    console.log(res);
    db.close();
  });
});
