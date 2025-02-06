import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    project_code: { type: String, required: true, match: [/^[a-zA-Z0-9-]+$/, 'Project Code can only contain alphanumeric characters and hyphens'] },
    header_code: { type: String, required: true, match: [/^[a-zA-Z0-9-]+$/, 'Project Code can only contain alphanumeric characters and hyphens'] },
    training_type: { type: String, required: true, enum: ["online", "offline", "ac_pc", "quality"] },
    agent_mobile : { type : String, required : true },
    scores : { type : Array , "default" : [] },
    result : { type : Boolean, "default" : false },
    total_time_taken : { type : Number, "default" : 0 },
    submission_time : { type : Date, "default" : Date.now },
}, { timestamps: true });

const testModel = mongoose.model("tests", testSchema);

export default testModel;