import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    user_name : { type : String, required : true},
    password : { type : String, required : true },
}, { timestamps: true });

const adminModel = mongoose.model("admin", adminSchema);

export default adminModel;
