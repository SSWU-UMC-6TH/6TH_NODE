import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { joinUser } from "../services/user.service.js";


// export const userSignin = async (req, res, next) => {
//     console.log("회원가입을 요청하였습니다!");
//     console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

//     try {
//         const result = await joinUser(req.body);
//         // joinUser 함수의 반환값을 확인하고, 성공 또는 실패에 따라 응답을 보냄
//         if (result.isSuccess) {
//             res.send(response({
//                 isSuccess: true,
//                 code: 200,
//                 message: "success!",
//                 data: {
//                     email: result.result.email,
//                     name: result.result.name,
//                     preferCategory: result.result.preferCategory
//                 }
//             }));
//         } else {
//             res.status(500).send(response({
//                 isSuccess: false,
//                 code: 500,
//                 message: result.message
//             }));
//         }
//     } catch (error) {
//         // joinUser 함수에서 발생한 예외를 캐치하여 서버 오류로 응답
//         console.error("회원가입 중 오류 발생:", error);
//         res.status(500).send(response({
//             isSuccess: false,
//             code: 500,
//             message: "서버 에러, 관리자에게 문의 바랍니다."
//         }));
//     }
// };




export const userSignin = async (req, res, next) => {
    console.log("회원가입을 요청하였습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용
    res.send(response(status.SUCCESS, await joinUser(req.body)));
};

