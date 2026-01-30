import { Router } from "express";
import institutionRoutes from "./institution.routes.js";
import institutionSetupRoutes from "./institutionSetup.routes.js";
import studentRoutes from "./student.routes.js";
import teacherRoutes from "./teacher.routes.js";
import coursesRoutes from "./courses.routes.js";
import subjectsRoutes from "./subjects.routes.js";
import branchRoutes from "./branch.routes.js";
import enrolledCoursesRoutes from "./enrolledCourses.routes.js";
import assignmentRoutes from "./assignment.routes.js";
import notesRoutes from "./notes.routes.js";
import videoRoutes from "./video.routes.js";
import quizzRoutes from "./quizz.routes.js";
import resultRoutes from "./result.routes.js";
import announcementRoutes from "./announcement.routes.js";
import eventRoutes from "./event.routes.js";
import commentRoutes from "./comment.routes.js";
import likeRoutes from "./like.routes.js";
import feesRoutes from "./fees.routes.js";

const router = Router();

// Core
router.use("/institution", institutionRoutes);
router.use("/institution-setup", institutionSetupRoutes);
router.use("/student", studentRoutes);
router.use("/teacher", teacherRoutes);

// Academic
router.use("/courses", coursesRoutes);
router.use("/subjects", subjectsRoutes);
router.use("/branch", branchRoutes);
router.use("/enrolled-courses", enrolledCoursesRoutes);

// Content & Assessment
router.use("/assignment", assignmentRoutes);
router.use("/notes", notesRoutes);
router.use("/video", videoRoutes);
router.use("/quizz", quizzRoutes);
router.use("/result", resultRoutes);

// Engagement & Ops
router.use("/announcement", announcementRoutes);
router.use("/event", eventRoutes);
router.use("/comment", commentRoutes);
router.use("/like", likeRoutes);
router.use("/fees", feesRoutes);

export default router;
