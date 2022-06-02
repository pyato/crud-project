import * as mongooseDef from "mongoose"
let mongoose = mongooseDef.default;

const userSchema = new mongoose.Schema({
    id: String,
    firstName: String,
    lastName: String,
    gender: String,
    email: String
})

let User = mongoose.model('User', userSchema, 'User');

export default User;