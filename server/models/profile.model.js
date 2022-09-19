const mongoose = require("mongoose");

const { Schema } = mongoose;

const profileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  website: String,
  location: {
    type: String,
    default: "India",
  },
  bio: { type: String, default: "Health Care Community" },
  dob: {
    type: Date,
  },
  profileImageUrl: {
    type: String,
    default:
      "https://res.cloudinary.com/dnboldv5r/image/upload/v1632958381/probook/avatar_ism2fu.png",
  },

  backgroundImageUrl: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdG9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
});

module.exports = mongoose.model("Profile", profileSchema);
