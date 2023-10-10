import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//routes
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import commentRoutes from "./routes/commentsRoutes.js";
app.use("/api/v1", userRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/comment", commentRoutes);

app.get("/", (req, res) => {
  res.send(`
  <div style="font-family: Arial, sans-serif;">
  <div>
      <div>
          <h1>API Routes</h1>
          <ul style="list-style-type: none; padding: 0;">
              <li style="margin-bottom: 10px;"><a href="http://localhost:4000/api/v1/comment/create-comment" style="color: blue; text-decoration: none;">POST /comment/create-comment</a></li>
              <li style="margin-bottom: 10px;"><a href="http://localhost:4000/api/v1/comment/update-comment" style="color: blue; text-decoration: none;">PUT /comment/update-comment</a></li>
              <li style="margin-bottom: 10px;"><a href="http://localhost:4000/api/v1/comment/get-comments" style="color: blue; text-decoration: none;">GET /comment/get-comments</a></li>
              <li style="margin-bottom: 10px;"><a href="http://localhost:4000/api/v1/comment/delete-comment/:name" style="color: blue; text-decoration: none;">DELETE /comment/delete-comment/:name</a></li>
              <li style="margin-bottom: 10px;"><a href="http://localhost:4000/api/v1/blogs/create-blog" style="color: blue; text-decoration: none;">POST /blogs/create-blog</a></li>
              <li style="margin-bottom: 10px;"><a href="http://localhost:4000/api/v1/blogs/update-blog/:_id" style="color: blue; text-decoration: none;">PUT /blogs/update-blog/:_id</a></li>
              <li style="margin-bottom: 10px;"><a href="http://localhost:4000/api/v1/blogs/delete-blog/:_id" style="color: blue; text-decoration: none;">DELETE /blogs/delete-blog/:_id</a></li>
              <li style="margin-bottom: 10px;"><a href="http://localhost:4000/api/v1/blogs/get-blogs" style="color: blue; text-decoration: none;">GET /blogs/get-blogs</a></li>
              <li style="margin-bottom: 10px;"><a href="http://localhost:4000/api/v1/blogs/get-blog/:_id" style="color: blue; text-decoration: none;">GET /blogs/get-blog/:_id</a></li>
          </ul>
      </div>
  </div>
</div>


    `);
});

export default app;
