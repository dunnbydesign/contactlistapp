var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs("contactInfo", ["contactList"]);
var bodyParser = require("body-parser");

// app.get("/", function(request, response) {
//   response.send("Hello world from server.js");
// });

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get("/contactList", function(request, response) {
  console.log("I received a GET request");

  db.contactList.find(function(error, documents) {
    console.log(documents);
    response.json(documents);
  });

  // var person1 = {
  //   name: "Tim",
  //   email: "tim@email.com",
  //   number: "(111) 111-1111"
  // };
  //
  // var person2 = {
  //   name: "Emily",
  //   email: "emily@email2.com",
  //   number: "(222) 222-2222"
  // };
  //
  // var person3 = {
  //   name: "John",
  //   email: "john@email3.com",
  //   number: "(333) 333-3333"
  // };
  //
  // var contactList = [person1, person2, person3];
  // response.json(contactList);
});

app.post("/contactList", function(request, response) {
  console.log(request.body);

  db.contactList.insert(request.body, function(error, document) {
    response.json(document);
  });
});

app.delete("/contactList/:id", function(request, response) {
  var id = request.params.id;
  console.log(id);
  db.contactList.remove({_id: mongojs.ObjectId(id)}, function(error, document) {
    response.json(document);
  });
});

app.get("/contactList/:id", function(request, response) {
  var id = request.params.id;
  console.log(id);
  db.contactList.findOne({_id: mongojs.ObjectId(id)}, function(error, document) {
    response.json(document);
  });
});

app.put("/contactList/:id", function(request, response) {
  var id = request.params.id;
  console.log(request.body.name);
  db.contactList.findAndModify(
    {
      query: {_id: mongojs.ObjectId(id)},
      update: {$set: {name: request.body.name, email: request.body.email, number: request.body.number}},
      new: true
    },
    function(error, document) {
      response.json(document);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");
