import mongoose from 'mongoose';

const uri = 'mongodb+srv://project_one_user:test@cluster0.mongodb.net/first_app?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Connected to MongoDB Atlas');
});
