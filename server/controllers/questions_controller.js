import questionsModel from "../models/questions_modal.js";

export const createQuestions = async (req, res) => {
    const questions = req.body;

    try {
        const savedQuestions = await Promise.all(
            questions.map(async (question) => {
                const { question_text, header_code, project_code, training_type, option_1, option_2, option_3, option_4, option_5, option_6, option_7, option_8, option_9, option_10, answer } = question;

                const existingQuestion = await questionsModel.findOne({ question_text });

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
                        option_6, option_7, option_8, option_9, option_10,
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

        if (questions.length > 30) {
            questions.sort(() => Math.random() - 0.5);
            questions.splice(30);
        }

        res.status(200).json({ data: questions, message: "" });
    } catch (error) {
        console.error("Error getting questions:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const getAllQuestions = async (req, res) => {
    try {
        const questions = await questionsModel.find().select("-__v -_id -createdAt -updatedAt");

        res.status(200).json({ data: questions, message: "" });
    } catch (error) {
        console.error("Error getting questions:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


export const deleteQuestion = async (req, res) => {
    const { question_code } = req.params;
    try {
        const deletedQuestion = await questionsModel.findOneAndDelete({ question_code });
        res.status(200).json({ message: "Question successfully deleted!", data: deletedQuestion });
    }
    catch (error) {
        console.error("Error deleting question:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}