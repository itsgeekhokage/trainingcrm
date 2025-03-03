import mongoose from "mongoose";
import testModel from "../models/test_modal.js";


export const createTest = async (req, res) => {
    const test = req.body;
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


export const getTestByMobileNumberAndHeaderCode = async (req, res) => {
    const { mobile_number, header_code } = req.params;
    try {
        const test = await testModel.findOne(
            { mobile_number, header_code }
        ).sort({ createdAt: -1 });

        if (!test) {
            return res.status(200).json({ result : "pending", message: "No test found" });
        }

        res.status(200).json({ result : test.result ? "pass" : "fail", message: "Latest test result retrieved" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

