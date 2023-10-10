import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import comment from "../models/Comment.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createcomment = catchAsyncError(async (req, res, next) => {
  let keyword = req.body.comment;
  let { array } = req.body;
  keyword = keyword.trim().toLowerCase();
  const commentExist = await comment.findOne({ name: keyword });

  if (commentExist) {
    return next(new ErrorHandler("comment already exist", 400));
  }
  const comment = await comment.create({ name: keyword });
  array.map((arr) =>
    comment.related.push({ similar: arr.trim().toLowerCase() })
  );
  await comment.save();

  res.status(200).json({
    success: true,
    message: "comment created successfully",
  });
});

export const updatecomment = catchAsyncError(async (req, res, next) => {
  let keyword = req.body.comment;
  let { array } = req.body;
  let { name } = req.body;
  keyword = keyword.trim();
  const comment = await comment.findOne({ name: name.trim().toLowerCase() });

  if (!comment) {
    return next(new ErrorHandler("comment does not exist", 400));
  }

  comment.name = keyword.toLowerCase();

  let simArr = array;
  let newSimArr = [];
  let actualSimArr = comment.related;
  for (let i = 0; i < simArr.length; i++) {
    const element = simArr[i].trim();
    let isPresent = false;
    for (let j = 0; j < actualSimArr.length; j++) {
      const jelement = actualSimArr[j].similar.trim();
      if (jelement == element) {
        isPresent = true;
        break;
      }
    }

    if (!isPresent) actualSimArr.push({ similar: element.toLowerCase() });
  }

  comment.related = actualSimArr;
  await comment.save();

  res.status(200).json({
    success: true,
    message: "comment updated successfully",
  });
});

export const getAllcomments = catchAsyncError(async (req, res, next) => {
  const comments = await comment.find();

  res.status(200).json({
    success: true,
    comments,
  });
});

export const deletecomment = catchAsyncError(async (req, res, next) => {
  const name = req.params?.name.trim().toLowerCase();

  const comment = await comment.findOne({
    name: { $regex: `^${name}$`, $options: "i" },
  });
  if (!comment)
    return next(new ErrorHandler(`${name} comment does not exist`, 400));

  await comment.deleteOne({ name });

  res.status(200).json({
    success: true,
    message: `${name} comment deleted successfully`,
  });
});
