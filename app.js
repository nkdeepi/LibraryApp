const express = require("express");
const app = new express();


//connecting client and server

const bookRoute = require("./src/routes/bookRoute");
const authorRoute = require("./src/routes/authourRoute");
const { userdata } = require('./config/connections')

// const {bookdata,authordata}=require('./config/connections')

//setting middleware
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true })); //to be used in the case of post method

app.use(express.static("./public")); //indicating express that static files are contained in public folder,use before app.set



app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use("/books", bookRoute);
app.use("/author", authorRoute);



app.get("/", (req, res) => {
  // res.sendFile(__dirname+'/src/views/index.html')
  res.render("index");
});

//setting routes for register and login
app.get('/register',(req,res)=>{
  res.render("register")
})
app.get("/login",(req,res)=>{
  res.render('login')
})
app.post('/registeruser',async(req,res)=>{
  const userdetails = {
    emailAddress:req.body.emailAddress,
    userName:req.body.userName,
    password:req.body.password
    
  }
  console.log("reqbody",req.body)
  const newuserdetails = userdata(userdetails)
 await newuserdetails.save();
  res.redirect('/books')
  // console.log("dataposting")
  
})


app.post('/loginuser',(req,res)=>{

  res.redirect('/books')

})
app.listen(8000, () => {
  console.log("http://localhost:8000");
});










// const Books = [
//   {
//     bookname: "Tom and jerry",
//     Author: "Joseph",
//     Genre: "Comics",
//     image: "tom.jpg",
//   },
//   {
//     bookname: "Abc",
//     Author: " Jhon",
//     Genre: "Crime",
//     image: "chuchutv.jpg",
//   },
//   {
//     bookname: "XYZ",
//     Author: " Luther",
//     Genre: "Fanacy",
//     image: "kathu.jpg",
//   },
//   {
//     bookname: "PQR",
//     Author: "RAM",
//     Genre: "Thriller",
//     image: "cocomelon.jpg",
//   },
// ];
// const author = [
//   {
//     authorname: "Balaguruswamy",
//     authorage: "50",
//     publishedbooks: 7,
//     qualification: "MPhil",
//     image: "balaguruswamy.jpg",
//     details:
//       "Balaguruswamy is a teacher, consultant, author and former member of UPSC. He has also written: Programming in ANSI C, Programming With Java : A Primer, Computing Fundamentals And C Programming and Reliability Engineering among other titles. ",
//   },

//   {
//     authorname: "Chethan Bagath",
//     authorage: "60",
//     publishedbooks: 10,
//     qualification: "PHD",
//     image: "chethan.jpg",
//     details:
//       "Bhagat graduated in mechanical engineering at IIT Delhi a PGP at IIM Ahmedabad. He started his career as an investment banker but left it after a few years to pursue writing. He has written ten novels and three non-fiction books. His first novel, Five Point Someone, was published in 2004",
//   },
//   {
//     authorname: "Amritha Pritham",
//     authorage: "50",
//     publishedbooks: 7,
//     qualification: "PHD in Literature",
//     image: "amritha.jpg",
//     details:
//       "She was the first female recipient of the Sahitya Akademi Award in 1956 for Sunehadey (poetic diminutive of the Punjabi word  (Sunehe), Messages), Amrita Pritam received the Bhartiya Jnanpith Award, India's highest literary award, in 1982 for Kagaj te Canvas (Paper and Canvas).",
//   },
// ];