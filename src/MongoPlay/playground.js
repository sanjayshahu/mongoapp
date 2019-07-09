require("./../../src/db/mongoose");
var UserModel=require("./../models/user");;
// UserModel.findByIdAndUpdate("5d10bf1d388ca07f186baff5",{age:23}).then(
//     (user)=>{
//       console.log(user);
//       return UserModel.countDocuments({age:23})

//     }

// ).then((count=>{
// console.log(count);
// }
// )).catch((e)=>{
//     console.log(e);
// })

const asyncFunction=async(id,age)=>{
const intialCount=await UserModel.countDocuments({age});
const userFound=await UserModel.findByIdAndUpdate(id,{age});

const userDeleted=await UserModel.findOneAndDelete({age});
const finalCount=await UserModel.countDocuments({age});

return {
   
    intialCount,
     userFound,
    userDeleted,
    finalCount
};
}
asyncFunction("5d10bf1d388ca07f186baff5",23).then((objectRecived)=>{
    console.log(objectRecived);
}).catch((e)=>{
    console.log(e);
})