var simplecrypt = require("simplecrypt");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var sc = simplecrypt();

const userSchema = new Schema({
    username:{
        type: String
        //min:[4, 'Too short, min is 4 characters'],
        //max:[32, 'Too short, min is 32 characters']
    },
    email:{
        type: String
        //min:[4, 'Too short, min is 4 characters'],
        //max:[32, 'Too short, min is 32 characters'],
        //unique: true,
        //required: [true, 'Email is required'],
        //lowercase: true,
        //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password:{
        type: String
        //min:[4, 'Too short, min is 4 characters'],
        //max:[32, 'Too short, min is 32 characters'],
        //required: [true,'Password is required']
    },
    rentals:[{type: Schema.Types.ObjectId, ref: 'Rental'}]
});


userSchema.methods.isPasswordCorrect = function(password){
    const user = this;
    //decrypted = sc.decrypt(String(user.password))
if (password == this.password){
        return true;
    }
        return false;
}


userSchema.pre('save', function(next){
    const user = this;
    var encrypted = sc.encrypt(user.password);
    user.password = sc.decrypt(encrypted);


    
    next();
    console.log(encrypted)
})

module.exports = mongoose.model('Users', userSchema);