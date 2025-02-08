import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    project_code : { type : String, required : true, project_code : true },
    project_status : { type : String, required : true, default : "active" },
    project_members : { type : Array, required : true, default : [] },
    project_links : { type : Array, required : true, default : [] },
}, { timestamps: true });

const projectsModel = mongoose.model("projects", projectSchema);

export default projectsModel;