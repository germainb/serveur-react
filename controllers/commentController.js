const Comment = require('../models/Comment');
var nodemailer = require('nodemailer');

// Add a comment to a thread
const addComment = async (req, res) => {
    try {
        const threadId = req.params.threadId;
        const userId = req.params.userId;
        const { commentaire } = req.body;
        
        const comment = await Comment.create({
            thread: threadId,
            author: userId,
            content: commentaire
        });
        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ message: 'Server error:'+err });
    }
};

// Get all comments for a thread
const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({thread: req.params.threadId}).populate('author');
        res.json(comments);
        
    } catch (err) {
        res.status(500).json({ message: 'Server error'+err + "Request:" + req + "Response:" + res});
    }
};

// Add a comment to a thread
const sendEmail = async (req, res) => {
    try {
        const { commentaire, email, nom } = req.body;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD
            }
          });
          
          var mailOptions = {
            from: process.env.EMAIL,
            to:  email,
            subject: 'Nouveau commentaire sur Face de bouc',
            text: nom + " a ajouté un commentaire à votre message:<br>" + commentaire + "<br>Vous pouvez répondre à cette adresse:<br>https://client-react-ivory.vercel.app/"
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
       
    } catch (err) {
        res.status(500).json({ message: 'Server error:'+err });
    }
};
module.exports = { addComment, getComments, sendEmail };
