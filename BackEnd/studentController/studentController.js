const registerStudents = require('../studentsSchema/studentsSchema');
const jsonwebtoken = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const nodemailer = require('nodemailer'); // do npm install nodemailer



// var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "sanmukswamy238@gmail.com",
//       pass: "aaui jtay uojq vchn",
//     },
//   });

const register = async (req, res, next) => {
    const {name,
        email,
        password,
        mobileNumber,
        gender,
        branch} = req.body;
    try {
        const userExits = await registerStudents.findOne({ email: email });
        if (userExits) {
            res.status(401).json({
                message: 'Already registerd',
                isError: true,
            })
        } else {
            const salt = await bcryptjs.genSalt(10);
            const hash = await bcryptjs.hash(password, salt);
            await registerStudents.create({
                name,
                email,
                password:hash,
                mobileNumber,
                gender,
                branch
            })

            // let mailOptions = {
            //     from: "sanmukswamy238@gmail.com",
            //     to: email,
            //     subject: "Registeration",
            //     text: "Registration Successfulyy",
            //   };

            //   transporter.sendMail(mailOptions, function (error, info) {
            //     if (error) {
            //       console.log("mail sent error", error);
            //     } else {
            //       console.log("mail sent successfull");
            //     }
            //   });
            res.status(200).json({
                message: 'Registerd successfylly',
                isError: false,
            })
        }
    } catch (err) {
        next(err);
        res.status(200).json({
            message: err,
            isError: true,
        })
    }
}

const login = async (req, res, next) => {
    const {email,password} = req.body;
    const user = await registerStudents.findOne({email:email});
    try{
        if(user){
            const passwordMatch = await bcryptjs.compare(password,user.password);
            if(passwordMatch){
                res.status(200).json({
                    message:'Login successfylly',
                    isError:false,
                })
            } else{
                res.status(200).json({
                    message:'Password wrong',
                    isError:false,
                })
            }
        }else{
            res.status(401).json({
                message:'User Not Found',
                isError:true
            })
        }
    }catch(err){
        next(err);
        res.status(500).json({
            message:err,
            isError:true
        })
    }

}

const updateValue = async (req,res,next) =>{
    const findStudentId = req.params.id;
    const {name,email,password} = req.body;
    console.log(req.body);
    try{
        const studentsId = await registerStudents.find({_id:findStudentId});
        if(!studentsId){
            res.status(500).json({
                error: true,
                message: "Student not found",
              });
        } else {
            const salt = bcryptjs.genSaltSync(10);
            const hash = bcryptjs.hashSync(password, studentsId.password);
            const updateStudent = await registerStudents.findOneAndUpdate(
                {_id:findStudentId},{
                    name,
                    email,
                    password:hash,
                }
            );
            res.status(200).json({
                error: false,
                message: "Student updated sucessfully",
              });
        }
       
    }catch(err){

    }
}

const deleteData = async (req,res,next) =>{
    const deleteId = req.params.id;
    const {name, email, password} = req.body;
    console.log(req.body);
    try{
        const findDeleteId = await registerStudents.find({_id:deleteId});
        console.log(findDeleteId,'try');
        if(findDeleteId){
            await registerStudents.findOneAndDelete({_id:findDeleteId},{
                    name,
                    email,
                    password,
            })
            res.status(200).json({
                message:'Deleted Successfully',
                isError:false
            });
            console.log('if');
        } else {
            res.status(200).json({
                message:'Sorry Cannnot Delete the data',
                isError:true
            });
            console.log('else');
        }
    }catch(error){
        next(error);
        console.log(error);
    }
}

module.exports = {register,login,updateValue,deleteData};