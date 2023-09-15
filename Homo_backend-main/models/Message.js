const { Schema, default: mongoose } = require("mongoose");

const MessageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    text: String,

    attachment: {
      contentType: {
        type: String,
        enum: ["video", "audio", "location", "contact", "image", "attachment"],
      },
      url: String,
    },
    reciepients: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
        status: {
          type: String,
          enum: ["pending", "delivered", "read", "deleted"],
          default: "pending",
        },
      },
    ],
    scheduledAt: Date,
    status: {
      type: String,
      default: "active",
      enum: ["deleted", "active"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
