import bcrypt from "bcrypt";
import mongoose from "mongoose";

const strongPasswordPattern = /^(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^[0-9]{10,15}$/, "Phone number must contain 10 to 15 digits"]
    },
    username: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 40,
      default: undefined
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      match: [
        strongPasswordPattern,
        "Password must be at least 8 characters and include one number and one special character"
      ],
      select: false
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
