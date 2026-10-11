import {ApiResponse} from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";
// avoid too many TRY CATCH
// const healthCheck = async (req, res, next) => {
//     try {
//         const user = await getUserFromDb();
//         res
//             .status(200)
//             .json(new ApiResponse(200, { message: "Server is running" }));
//     } catch (error) {
//         // const response = new ApiResponse(false, "Server is unhealthy", error.message);
//         // return res.status(500).json(response);
//     }
// }

const healthCheck = asyncHandler(async (req, res, next) => {
    res
        .status(200)
        .json(new ApiResponse(200, { message: "Server is running" }));
})

export { healthCheck };