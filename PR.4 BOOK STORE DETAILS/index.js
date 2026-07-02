const express = require('express');
const port = 3000;
const app = express();
const db = require('./config/mongoose');
const path = require('path');
const fs = require('fs');
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
const Book = require('./models/Addbook');


app.get("/", async(req, res) => {
    let bookdatails = await Book.find({});
    // console.log(bookdatails);
    res.render('Addbook',{
        bookdatails
    });
})


app.post("/addbook",Book.uploadedImage, async (req, res) => {
    console.log(req.body);
     var image = '';
     if(req.file){
        image = Book.imgpath +"/" + req.file.filename;
     }
     req.body.image = image;
    //  res.redirect('/');

    let titleV = req.body.title;
    let priceV = req.body.price;
    let obj = { "title": titleV, "price": priceV };
    let addbook = await Book.create(req.body);

    if (addbook) {
        console.log("record inserted");
        return res.redirect('/');
    } else {
        console.log("somthing wrong");
    }
})

app.get("/deleteStu", async (req,res)=>{
    // console.log(req.params.bookid);
    let bookid= req.query.id;

    let oldData = await Book.findById(bookid);
    if(oldData && oldData.image){
        let fullpath = path.join(__dirname, '..', oldData.image);
        if(fs.existsSync(fullpath)){
            await fs.unlinkSync(fullpath);
        }
    }
   
    let deleteData = await Book.findByIdAndDelete(bookid);
    if(deleteData) {
        // return res.redirect('back');
        return res.redirect('/');
    } else{
        console.log("Something wrong");
        // return res.redirect('back');
        return res.redirect('/');
    }
})

app.get("/getBookDetails/:bookId", async(req,res) =>{
    console.log(req.params.bookId);
    let singleObj = await Book.findById (req.params.bookId);
    
    return res.render('Editbook',{
        singleObj
    });
})

app.post("/editbook/:bookId",Book.uploadedImage, async (req,res) => {
    console.log(req.params.bookId);
    console.log(req.body);
    console.log(req.file);

  if(req.file){
    let image = '';
    req.body.image = Book.imgpath+"/"+req.file.filename;
     let oldData = await Book.findById(req.params.bookId);
     if(oldData && oldData.image){
         let fullpath = path.join(__dirname, '..', oldData.image);
         if(fs.existsSync(fullpath)){
             await fs.unlinkSync(fullpath);
         }
     }

  } else{
    let oldData = await Book.findById(req.params.bookId);
    req.body.image = oldData.image;
  }

    let editrecord = await Book.findByIdAndUpdate (req.params.bookId, req.body);
    if(editrecord){
        return res.redirect('/')
    } else{
        return res.redirect("/");
    }
})

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`server is running port ${port}`);
})