var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'productsDB'
});
connection.connect(function (err) {
    if (err) throw err;
    // console.log(`wooohooo im connected`);
    showAllgoods();
   
});
function showAllgoods() {
    // console.log("first function ran");
    connection.query(`Select * from products `, function(error, results){
        if(error) throw error;
        console.log("The table below shows the products, stock quantity, item IDs, and price of what we are selling:");
        console.table(results);
        idPrompt(results);
    })
   
};

function idPrompt(databaseData) {
    // console.log(databaseData);
    // console.log("idPrompt ran!")
    inquirer.prompt([
        {
            type: "text",
            name: "productID",
            message: "What is the id of the product you would like to purchase?"
        },
        {
            type: "text",
            name: "amount",
            message: "What is the amount of the product you would like to purchase?"
        }
    ]).then(function (answer) {
        var id = parseInt (answer.productID);
        var amount = parseInt (answer.amount);
        for (var i=0; i < databaseData.length; i++) {
            if (databaseData[i].item_id === id) {
            if (amount <= databaseData[i].stock_quantity) 
            {
                console.log("You have enough stock");
                databaseData[i].stock_quantity -= amount;
                console.log("Stock left: " + databaseData[i].stock_quantity);
            connection.query(`Update products set stock_quantity = ${databaseData[i].stock_quantity} WHERE item_id = ${id}`);
            console.log(`You paid: ${databaseData[i].price*amount} for ${amount} ${databaseData[i].product_name}s`)
            }
            else {
                console.log("There is not enough stock");
                idPrompt(databaseData);
            }
        }
       
        }
        connection.query(`Select * from products WHERE item_id=${answer.productID} `,
            function (err, results) {
                if (err) throw err;
                
                // console.log(results);
            })
        connection.end();
    }
    )
};

// function adder (num1, num2) {
//     return num1+num2
// };
// console.log(adder(5, 8))