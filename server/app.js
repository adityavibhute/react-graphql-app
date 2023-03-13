const express = require('express');
const app = express();
const db = 'mongodb+srv://aditya:aditya333@cluster0.ek0mi1y.mongodb.net/employees?retryWrites=true&w=majority';
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');

app.use(cors());

mongoose.connect(db);
mongoose.connection.once('open', () => {
    console.log('connected to database!!!');
});

mongoose.set('strictQuery', true);

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(4000, () => {
    console.log('Connected to port no. 4000');
});