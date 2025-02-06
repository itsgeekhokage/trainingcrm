import questionsModel from "../models/questions_modal.js";

export const createQuestions = async (req, res) => {
    const questions = req.body;

    try {
        const savedQuestions = await Promise.all(
            questions.map(async (question) => {
                const { question_text, header_code, project_code, training_type, option_1, option_2, option_3, option_4, option_5, answer } = question;

                const existingQuestion = await questionsModel.findOne({ question });

                if (existingQuestion) {
                    await questionsModel.updateOne(
                        { question_text },
                        { header_code, project_code, training_type, option_1, option_2, option_3, option_4, option_5, answer }
                    );
                    return { ...existingQuestion.toObject(), header_code, project_code, training_type, option_1, option_2, option_3, option_4, option_5, answer };
                } else {
                    const newQuestion = new questionsModel({
                        question_text,
                        header_code,
                        project_code,
                        training_type,
                        option_1,
                        option_2,
                        option_3,
                        option_4,
                        option_5,
                        answer,
                    });

                    return await newQuestion.save();
                }
            })
        );

        res.status(201).json({ message: "Questions successfully added!", data: savedQuestions });
    } catch (error) {
        console.error("Error saving questions:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const getQuestions = async (req, res) => {
    const { header_code, project_code, training_type } = req.body;
    try {
        const questions = await questionsModel.find({ header_code, project_code, training_type })
            .select("-__v -_id -createdAt -updatedAt");

        res.status(200).json({data :questions, message : ""});
    } catch (error) {
        console.error("Error getting questions:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const getAllQuestions = async (req, res) => {
    try {
        const questions = await questionsModel.find().select("-__v -_id -createdAt -updatedAt");

        res.status(200).json({data :questions, message : ""});
    } catch (error) {
        console.error("Error getting questions:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}