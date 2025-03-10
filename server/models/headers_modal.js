import mongoose from "mongoose";

const headersSchema = new mongoose.Schema({
    header_code : { type : String, required : true, unique : true },
    header_name : { type : String, required : true },
    training_type: { type: String, required: true, enum: ["online", "offline", "ac_pc", "quality"] },
    video_link : { type : String, default : "" },
    pdf_link : { type : String, default : "" },
    project_code : {type : String, required : true, match: [/^[a-zA-Z0-9-]+$/, 'Project Code can only contain alphanumeric characters and hyphens']},
    completion: {
        type: Map,
        of: {
            video_completed: { type: Boolean, required: true, default: false },
            pdf_completed: { type: Boolean, required: true, default: false }
        },
        default: {}
    },
    active : { type : Boolean, default : true },
}, { timestamps: true });

const headersModel = mongoose.model("headers", headersSchema);

export default headersModel;