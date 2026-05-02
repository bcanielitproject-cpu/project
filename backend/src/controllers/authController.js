import User from "../models/User.js";
import { signToken } from "../utils/token.js";

const strongPasswordPattern = /^(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const passwordRuleMessage =
  "Password must be at least 8 characters and include one number and one special character";

function isStrongPassword(value) {
  return strongPasswordPattern.test(value);
}

function sanitizeAuthUser(user) {
  return {
    id: user._id,
    phone: user.phone,
    username: user.username || "",
    role: user.role || "user"
  };
}

function authResponse(user) {
  return {
    user: sanitizeAuthUser(user),
    token: signToken(user)
  };
}

export async function register(req, res, next) {
  try {
    const { phone, password, username } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password are required" });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({ message: passwordRuleMessage });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(409).json({ message: "Phone number is already registered" });
    }

    const normalizedUsername = typeof username === "string" ? username.trim() : "";
    const payload = { phone, password };
    if (normalizedUsername) {
      payload.username = normalizedUsername;
    }

    const user = await User.create(payload);
    res.status(201).json(authResponse(user));
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password are required" });
    }

    const user = await User.findOne({ phone }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid phone or password" });
    }

    res.json(authResponse(user));
  } catch (error) {
    next(error);
  }
}

export async function loginAdmin(req, res, next) {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password are required" });
    }

    const user = await User.findOne({ phone }).select("+password");
    const isAdmin = user?.role === "admin";
    const isValidPassword = user ? await user.comparePassword(password) : false;

    if (!isAdmin || !isValidPassword) {
      return res.status(401).json({ message: "Invalid admin phone or password" });
    }

    res.json(authResponse(user));
  } catch (error) {
    next(error);
  }
}

export function me(req, res) {
  res.json({
    user: sanitizeAuthUser(req.user)
  });
}

export async function updateProfile(req, res, next) {
  try {
    const { username } = req.body;

    if (!username || username.trim().length < 2) {
      return res.status(400).json({ message: "Username must be at least 2 characters" });
    }

    req.user.username = username.trim();
    await req.user.save();

    res.json(authResponse(req.user));
  } catch (error) {
    next(error);
  }
}

export async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current password and new password are required" });
    }

    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({ message: passwordRuleMessage });
    }

    const user = await User.findById(req.user._id).select("+password");
    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
}
