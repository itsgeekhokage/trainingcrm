import mongoose from "mongoose"

const agentSchema = new mongoose.Schema({
    user_name : { type : String, required : true},
    mobile_number: { type: String, required: true, unique: true, match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'] },
    password : { type : String, required : true },
    project_code: { type : String, required: true, match: [/^[a-zA-Z0-9-]+$/, 'Project Code can only contain alphanumeric characters and hyphens'] },
    training_type_offline : { type : Boolean, required : true, default : false},
    training_type_online : { type : Boolean, required : true, default : false},
    training_type_ac_pc : { type : Boolean, required : true, default : false},
    training_type_quality : { type : Boolean, required : true, default : false},
    
}, { timestamps: true });


const agentModel = mongoose.model("agents", agentSchema);

export default agentModel;
