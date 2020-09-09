const mongoose = require('mongoose');
const { connection } = require('../common');

connection
    .then(async () => {
        const blogPostSchema = new mongoose.Schema({ name: String });
        const productsSchema = new mongoose.Schema({ title: String });
        const commentsSchema = new mongoose.Schema({
            message: String,
            source: {
                type: mongoose.SchemaTypes.ObjectId,
                refPath: '_m', // то откуда данные нам нужно брать
            },
            _m: {
                type: String,
                required: true,
                enum: ['BlogPosts', 'Products'],
            },
        });
        const product = mongoose.model('Products', blogPostSchema);
        const blogPost = mongoose.model('BlogPosts', productsSchema);
        const comment = mongoose.model('Comments', commentsSchema);

        const book = await product.create({
            name: 'ES6 for Beginners',
        });

        const post = await blogPost.create({
            title: 'Top 10 Backend Questions',
        });

        const commentOnBook = await comment.create({
            message: 'Great read',
            source: book._id,
            _m: 'Products',
        });

        const commentOnPost = await comment.create({
            message: 'Very informative',
            source: post._id,
            _m: 'BlogPosts',
        });

        const comments = await comment
            .find()
            .populate('source', '-_id -__v')
            .select('-_id -__v');

        console.log(comments);
    })
    .catch(error => {
        console.error('Error:', error);
    });


    // [
    //     {
    //       message: 'Great read',
    //       source: { name: 'ES6 for Beginners' },
    //       _m: 'Products'
    //     },
    //     {
    //       message: 'Very informative',
    //       source: { title: 'Top 10 Backend Questions' },
    //       _m: 'BlogPosts'
    //     }
    //   ]