const { default: mongoose, Schema } = require("mongoose");

const ConversationSchema = new Schema(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    admins: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    avatar: String,
    type: { type: String, enum: ["personal", "group"], default: "personal" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
