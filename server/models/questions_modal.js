import mongoose from "mongoose";
import mongooseSequence from 'mongoose-sequence';

const questionsSchema = new mongoose.Schema({
    question_code: { type: Number, unique: true },
    question_text: { type: String, required: true },
    header_code: { type: String, required: true, match: [/^[a-zA-Z0-9-]+$/, 'Project Code can only contain alphanumeric characters and hyphens'] },
    project_code: { type: String, required: true, match: [/^[a-zA-Z0-9-]+$/, 'Project Code can only contain alphanumeric characters and hyphens'] },
    training_type: { type: String, required: true, enum: ["online", "offline", "ac_pc", "quality"] },
    option_1: { type: String, required: true },
    option_2: { type: String, default: "" },
    option_3: { type: String, default: "" },
    option_4: { type: String, default: "" },
    option_5: { type: String, default: "" },
    option_6 : { type: String, default: "" },
    option_7 : { type: String, default: "" },
    option_8 : { type: String, default: "" },
    option_9 : { type: String, default: "" },
    option_10 : { type: String, default: "" },
    answer: { type: String, required: true }
}, { timestamps: true });

const AutoIncrement = mongooseSequence(mongoose);
questionsSchema.plugin(AutoIncrement, { inc_field: 'question_code' });



const questionsModel = mongoose.model("questions", questionsSchema);

export default questionsModel;