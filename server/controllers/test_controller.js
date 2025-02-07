import mongoose from "mongoose";
import testModel from "../models/test_modal.js";


export const createTest = async (req, res) => {
    const test = req.body;
    console.log(test)
    try {
        const newTest = new testModel(test);
        await newTest.save();
        res.status(201).json({data : newTest, message : "results saved..."});
    } catch (error) {
        console.log(error)
        res.status(409).json({ message: error.message });
    }
}

export const getTests = async (req, res) => {
    const agent_mobile = req.params.agent_mobile;
    try {
        const tests = await testModel.find({ agent_mobile: agent_mobile });
        res.status(200).json({data : tests, message : ""});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
