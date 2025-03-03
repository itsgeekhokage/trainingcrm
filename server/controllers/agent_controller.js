import agentModel from "../models/agent_modal.js";
import bcrypt from "bcryptjs";
import projectsModel from "../models/project_modal.js";

export const createAgent = async (req, res) => {

    const agents = req.body;

    try {
        const savedAgents = await Promise.all(
            agents.map(async (agent) => {
                const { user_name, mobile_number, password, project_code, training_type_online, training_type_offline, training_type_ac_pc, training_type_quality } = agent;

                const hashedPassword = await bcrypt.hash(password, 10);

                const existingAgent = await agentModel.findOne({ mobile_number });

                if (existingAgent) {
                    await agentModel.updateOne(
                        { mobile_number },
                        { user_name, password: hashedPassword, project_code, training_type_online, training_type_offline, training_type_ac_pc, training_type_quality }
                    );
                    return { ...existingAgent.toObject(), user_name, password: hashedPassword, project_code, training_type_online, training_type_offline, training_type_ac_pc, training_type_quality };
                } else {
                    const newAgent = new agentModel({
                        user_name,
                        mobile_number,
                        password: hashedPassword,
                        project_code,
                        training_type_online,
                        training_type_offline,
                        training_type_ac_pc,
                        training_type_quality,
                    });

                    return await newAgent.save();
                }
            })
        );

        res.status(201).json({ message: "Agents successfully added!", data: savedAgents });
    } catch (error) {
        console.error("Error saving agents:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const getAllagents = async (req, res) => {
    try {
        const agents = await agentModel.find().select("-_id -password -__v -createdAt -updatedAt");
        res.status(200).json({ data: agents, message: "" });
    } catch (error) {
        console.error("Error fetching headers:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const getAgent = async (req, res) => {
    const { mobile_number, password } = req.body;
    try {
        const agent = await agentModel.findOne({ mobile_number }).select("-_id -__v -createdAt -updatedAt");

        if (agent === null) {
            return res.status(404).json({ message: "Agent not found" });
        }

        const match = await bcrypt.compare(password, agent.password);
        console.log("match", match, agent.password, password);
        if (match) {
            agent.password = undefined;
            res.status(200).json({data : agent, message: "Agent verified" });
        } else {
            res.status(401).json({ message: "Invalid password" });
        }

    } catch (error) {
        console.error("Error fetching headers:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const deleteAgent = async (req, res) => {
    const { mobile_number } = req.params;
    try {
        const agent = await agentModel.findOne({ mobile_number });
        if (agent === null) {
            return res.status(404).json({ message: "Agent not found" });
        }
        await agentModel.deleteOne({ mobile_number });
        res.status(200).json({ message: "Agent deleted successfully" });
    } catch (error) {
        console.error("Error deleting agent:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

