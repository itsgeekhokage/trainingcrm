import bcrypt from "bcryptjs";
import adminModal from "../models/admin_modal.js";

export const getAdmin = async (req, res) => {
    const { mobile_number, password } = req.body;
    console.log("Mobile number:", mobile_number);
    const user_name = mobile_number;
    try {
        // const admin = await adminModal.find()
        // console.log("Admin:", admin);
        const admin = await adminModal.findOne({ user_name}).select("-_id -__v -createdAt -updatedAt");

        if (admin === null) {
            return res.status(404).json({ message: "Admin not found" });
        }
        else {
            // const match = await bcrypt.compare(password, admin.password);
            const match = password === admin.password;
            admin.password = undefined;
            if (match) {
                res.status(200).json({data : admin, message: "admin verified" });
            } else {
                res.status(401).json({ message: "Invalid password" });
            }
        }

    } catch (error) {
        console.error("Error fetching headers:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}