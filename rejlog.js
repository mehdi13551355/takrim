const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// کلید مخفی برای تولید توکن
const SECRET_KEY = "mysecretkey";

// دیتابیس موقتی
const users = [];

// ثبت‌نام کاربر
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // رمزگذاری پسورد
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: "User registered successfully!" });
});

// ورود کاربر
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  // بررسی رمز عبور
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password!" });
  }

  // تولید توکن
  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

// اعتبارسنجی توکن
app.get("/protected", (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token required!" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: `Welcome ${decoded.username}! This is a protected route.` });
  } catch (err) {
    res.status(401).json({ message: "Invalid token!" });
  }
});

// شروع سرور
app.listen(3000, () => console.log("Server is running on port 3000"));
