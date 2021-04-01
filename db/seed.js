const db = require('./index')

db.run(`INSERT INTO Flavours (Name) VALUES ('Strawberry'),('Räckor'), ('Oxfilé'),  ('Vegansk banana'), ('Kaviar'), ('Orange juice'), ('Chocolate'), ('Moldy cheeeeese')`, function (err) {
    err && console.log(err)

})
