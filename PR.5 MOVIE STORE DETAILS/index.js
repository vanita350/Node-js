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
const Movie = require('./models/Addmovie');


app.get("/", async(req, res) => {
    let moviedatails = await Movie.find({});
    // console.log(moviedatails);
    res.render('Addmovie',{
        moviedatails
    });
})


app.post("/addmovie",Movie.uploadedImage, async (req, res) => {
    console.log(req.body);
     var image = '';
     if(req.file){
        image = Movie.imgpath +"/" + req.file.filename;
     }
     req.body.image = image;
    //  res.redirect('/');

    let titleV = req.body.title;
    let priceV = req.body.price;
    let obj = { "title": titleV, "price": priceV };
    let addmovie = await Movie.create(req.body);

    if (addmovie) {
        console.log("record inserted");
        return res.redirect('/');
    } else {
        console.log("somthing wrong");
    }
})

app.get("/deleteStu", async (req,res)=>{
    // console.log(req.params.movieid);
    let movieid= req.query.id;

    let oldData = await Movie.findById(movieid);
    if(oldData && oldData.image){
        let fullpath = path.join(__dirname, '..', oldData.image);
        if(fs.existsSync(fullpath)){
            await fs.unlinkSync(fullpath);
        }
    }
   
    let deleteData = await Movie.findByIdAndDelete(movieid);
    if(deleteData) {
        // return res.redirect('back');
        return res.redirect('/');
    } else{
        console.log("Something wrong");
        // return res.redirect('back');
        return res.redirect('/');
    }
})

app.get("/getMovieDetails/:movieId", async(req,res) =>{
    console.log(req.params.movieId);
    let singleObj = await Movie.findById (req.params.movieId);
    
    return res.render('Editmovie',{
        singleObj
    });
})

app.post("/editmovie/:movieId",Movie.uploadedImage, async (req,res) => {
    console.log(req.params.movieId);
    console.log(req.body);
    console.log(req.file);

  if(req.file){
    let image = '';
    req.body.image = Movie.imgpath+"/"+req.file.filename;
     let oldData = await Movie.findById(req.params.movieId);
     if(oldData && oldData.image){
         let fullpath = path.join(__dirname, '..', oldData.image);
         if(fs.existsSync(fullpath)){
             await fs.unlinkSync(fullpath);
         }
     }

  } else{
    let oldData = await Movie.findById(req.params.movieId);
    req.body.image = oldData.image;
  }

    let editrecord = await Movie.findByIdAndUpdate (req.params.movieId, req.body);
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