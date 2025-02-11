import headersModel from "../models/headers_modal.js";
import projectsModel from "../models/project_modal.js";

export const createHeader = async (req, res) => {
    const headers = req.body;

    try {
        const savedHeaders = await Promise.all(
            headers.map(async (header) => {
                const { header_code, header_name, training_type, video_link, pdf_link, project_code } = header;

                const existingProject = await projectsModel.findOne({ project_code });
                if(!existingProject) {
                    await projectsModel.create({ project_code });
                }
                const existingHeader = await headersModel.findOne({ header_code });

                if (existingHeader) {
                    await headersModel.updateOne(
                        { header_code },
                        { header_name, training_type, video_link, pdf_link, project_code }
                    );
                    return { ...existingHeader.toObject(), header_name, training_type, video_link, pdf_link, project_code };
                } else {
                    const newHeader = new headersModel({
                        header_code,
                        header_name,
                        training_type,
                        video_link,
                        pdf_link,
                        project_code,
                    });

                    return await newHeader.save();
                }
            })
        );

        res.status(201).json({ message: "Headers successfully added!", data: savedHeaders });
    } catch (error) {
        console.error("Error saving headers:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const getAllHeaders = async (req, res) => {
    try {
        const headers = await headersModel.find().select("-_id -__v -createdAt -updatedAt");
        res.status(200).json({ data: headers, message : ""});
    } catch (error) {
        console.error("Error fetching headers:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


export const getProjectHeaders = async (req, res) => {
    const { project_code, training_type } = req.params;
    try {
        const headers = await headersModel.find({ project_code, training_type }).select("-_id -__v -createdAt -updatedAt");
        res.status(200).json({ data: headers});
    } catch (error) {
        console.error("Error fetching headers:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const getVideoConfirmation = async (req, res) => {
    const { header_code } = req.params;
    console.log(header_code);
    try {
        const header = await headersModel.findOne({ header_code });
        header.video_completed = !header.video_completed;
        await header.save();
        res.status(200).json({ data : header, message: "Video confirmation updated!" });
    } catch (error) {
        console.error("Error updating video confirmation:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const getPdfConfirmation = async (req, res) => {
    const { header_code } = req.params;
    try {
        const header = await headersModel.findOne({ header_code });
        header.pdf_completed = !header.pdf_completed;
        await header.save();
        res.status(200).json({ data : header, message: "PDF confirmation updated!" });
    } catch (error) {
        console.error("Error updating pdf confirmation:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const inactivateHeader = async (req, res) => {
    const { header_code } = req.params;
    try {
        const header = await headersModel.findOne({ header_code });
        header.active = !header.active;
        await header.save();
        res.status(200).json({ data : header, message: "Header inactivated!" });
    } catch (error) {
        console.error("Error inactivating header:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}