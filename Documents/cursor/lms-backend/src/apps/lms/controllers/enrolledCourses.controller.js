import { EnrolledCourse } from "../models/enrolledCourses.models.js";
import { Courses } from "../models/courses.models.js";
import { User } from "../../../common/models/user.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const enrollUserInCourse = asyncHandler(async (req, res) => {
    const { user, course } = req.body;

    const userExists = await User.findById(user);
    if (!userExists) throw new ApiError(404, "User not found");

    const courseExists = await Courses.findById(course);
    if (!courseExists) throw new ApiError(404, "Course not found");

    const existingEnrollment = await EnrolledCourse.findOne({ user, course });
    if (existingEnrollment) {
        throw new ApiError(409, "User is already enrolled in this course");
    }

    const enrollment = await EnrolledCourse.create({
        user,
        course,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, enrollment, "User enrolled successfully"));
});

const getUserEnrollments = asyncHandler(async (req, res) => {
    const { userId } = req.params; // OR req.user._id if finding for self

    // If no param, assume logged in user
    const targetUser = userId || req.user?._id;

    const enrollments = await EnrolledCourse.find({ user: targetUser }).populate("course", "name");

    return res
        .status(200)
        .json(new ApiResponse(200, enrollments, "User enrollments fetched successfully"));
});

const removeEnrollment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const enrollment = await EnrolledCourse.findByIdAndDelete(id);

    if (!enrollment) {
        throw new ApiError(404, "Enrollment not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "User unenrolled successfully"));
});

export {
    enrollUserInCourse,
    getUserEnrollments,
    removeEnrollment,
};
