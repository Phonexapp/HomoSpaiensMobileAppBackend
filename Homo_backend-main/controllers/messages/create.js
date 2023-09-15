const express = require("express");
const Message = require("../../models/Message");
const Conversation = require("../../models/Conversation");
const sendPushNotification = require("../../services/sendPushNotification");
const Users = require("../../models/Users");
const io = require("../../services/socketio");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
module.exports = async (req, res) => {
  const { files } = req;

  let { sender, reciever, conversationId, text } = req.body;
  /** @type {Array} */
  const attachments = req.body.attachments;
  try {
    let conversation;
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
    }
    if (!conversationId) {
      conversation = await Conversation.findOne({
        members: { $all: [sender, reciever] },
        type: "personal",
      });
    }

    if (!conversation) {
      conversation = new Conversation({
        members: [sender, reciever],
        type: "personal",
      });
      let socketId = io.users.get(sender);
      if (socketId) {
        io.addUserToConversation(conversation._id, sender, socketId);
      }
    }

    if (!conversation.members.includes(sender)) {
      return res
        .status(403)
        .send("You are not authorized to send messages to this conversation");
    }
    if (files?.length) {
      console.log(files);
    }
    let reciepients = conversation.members
      .filter((member) => member._id.toString() !== sender)
      .map((member) => ({
        user: member,
        status: "pending",
      }));
    let messages = [];
    if (attachments?.length) {
      messages = attachments.map((item) => {
        return new Message({
          conversation: conversation._id,
          sender,
          text,
          attachment: { contentType: item.type, url: item.url },
          reciepients,
        });
      });
    } else {
      messages = [
        new Message({
          conversation: conversation._id,
          sender,
          text,
          reciepients,
        }),
      ];
    }
    let senderData = await Users.findById(sender, { name: 1 });

    for (let message of messages) {
      conversation.messages.push(message._id);
      let result = io.sendMessage({
        conversationId: conversation._id.toString(),
        reciever: conversation.members.map((member) => member._id.toString()),
        sender: sender,
        message: message,
      });
      if (result.notDeliveredUsers) {
        for (let reciepient of result.notDeliveredUsers) {
          let reciever = await Users.findById(reciepient.user.toString());
          for (let recipientToken of reciever.deviceTokens) {
            try {
              await sendPushNotification({
                notification: {
                  title: senderData.displayname,
                  body: text,
                  // imageUrl: senderData.photo,
                },
                token: recipientToken,
                apns: {
                  payload: {
                    aps: {
                      sound: "default",
                    },
                  },
                  headers: {
                    "apns-priority": "5",
                  },
                },
              });
              let receipIndex = message.reciepients.findIndex(
                (rec) => rec.user._id.toString() === reciepient
              );
              if (receipIndex) {
                message.reciepients[receipIndex].status = "delivered";
              }
            } catch (err) {
              console.log(err);
              reciever.deviceTokens = reciever.deviceTokens.filter(
                (token) => token !== recipientToken
              );
              await reciever.save();
            }
          }
        }
      }
      if (result.deliveredUsers) {
        for (let recipient of result.deliveredUsers) {
          let receipIndex = message.reciepients.findIndex(
            (rec) => rec.user._id.toString() === recipient
          );
          if (receipIndex) {
            message.reciepients[receipIndex].status = "read";
          }
        }
      }
      await message.save();
    }

    await conversation.save();

    // let recieverId = conversation.members.filter(
    //   (user) => !user._id.equals(sender)
    // )[0]._id;

    res.json({
      message: "Message successfully sent",
      conversationId: conversation._id,
      // messageId: message._id,
      // senderId: sender,
      // recipientId: recieverId,
      // text,
      // createdAt: message.createdAt,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to send message", error: err.message });
  }
};
