const express = require('express')
const mysql = require('mysql')

const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

// MySql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Julio_2297',
    database: 'user'
});
// Route
app.get('/', (req, res)=> {
    res.send('Bienvenido a mi api pa');
})


//ABM CRUD
app.get('/datos',(req,res)=>{
    const sql = 'SELECT * FROM datos';
    connection.query(sql,(error, results)=>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results);
        }else {
            res.send('No hay resultado');
        }
    });
    // res.send('Lista de usuarios:');
});

app.get('/datos/:id', (req, res)=>{
    const { id } = req.params;
    const sql = `SELECT * FROM datos WHERE ID = ${id}`;
    connection.query(sql,(error, result)=>{
        if (error) throw error;

        if (result.length > 0){
            res.json(result);
        } else {
            res.send('No hay resultado');
        }
    });
    // res.send('Se puede obtener un usuario por ID');
})

app.post('/add',(req, res)=>{
    const sql = 'INSERT INTO datos SET ?';

    const customerObj = {
        name: req.body.name,
        password: req.body.password,
        country: req.body.country,
        city: req.body.city
    }
    connection.query(sql, customerObj, error => {
        if (error) throw error;
        res.send('Usuario Creado!');
    });



    // res.send('Nuevo usuarios');
});

app.put('/update/:id', (req, res)=>{
    const { id } = req.params;
    const { name, password, country,city } = req.body;
    const sql = `UPDATE datos SET name = '${name}', password = '${password}', country = '${country}', city ='${city}' WHERE id =${id}`;
    connection.query(sql, error => {
        if (error) throw error;
        res.send('Usuario Actualizado!');
    });
    // res.send('Actualizar usuario');
});

app.delete('/delete/:id', (req, res)=>{
    const { id } = req.params;
    const sql = `DELETE FROM datos WHERE id= ${id}`;
    connection.query(sql, error => {
        if (error) throw error;
        res.send('Borrar usuario');
    });
});


// chequea la conexion
connection.connect(error => {
    if (error) throw error;
    console.log('Base de datos funcionando')
});
app.listen(PORT, () => console.log(`Ando joya el server pa en el puerto: ${PORT}`));