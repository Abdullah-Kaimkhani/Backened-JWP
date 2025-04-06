import userModel from "../models/userSchema"


export const getAllUsersController = async (req, res) => {
    try {
        const data = await userModel.find({});
        res.status(200).json({
            status: "success",
            data: data
        })
    } catch (error) {
        console.log(error)
    }
}