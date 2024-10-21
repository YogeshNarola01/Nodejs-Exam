const UserModel = require('../models/UserModel');

const loginPage = (req, res) => {
    if(res.locals.users){
        res.redirect('/dashboard');
    }
    return res.render('index')
}
const registerPage = (req, res) => {
    return res.render('register')
}
const registerUser = async (req, res) => {
    try {
        const { name, email, password, cpassword } = req.body;
        // console.log(req.body);
          // Check if the user already exists
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    console.log('User already exists');
    return false;
//  return res.status(400).json({ error: 'User already exists' });
  }
        await UserModel.create({
            name: name,
            email: email,
            password: password,
            cpassword: cpassword
        })
        console.log("User Regisiter...");
        
        return res.redirect('/')
        
    } catch (err) {
        console.log(err);
        return false;
    }
}
const loginUser = (req,res) =>{
    return res.redirect('/dashboard')
}
const dashboardPage = (req,res) =>{
    
    return res.render('dashboard')
}
module.exports = {
    loginPage, registerPage, registerUser,loginUser,dashboardPage
}