const { Server } = require("socket.io");

/** @type {SocketIOServer} */
const io = new Server({ cors: "*" });

// Initialize user map and conversation map
/**
 * @typedef {Map<string, string>} UserMap - A map of user IDs to their socket IDs
 * @typedef {Map<string, Set<{ userId: string, socketId: string }>>} ConversationMap - A map of conversation IDs to their member user IDs and socket IDs
 */
io.users = new Map();
io.conversations = new Map();

/**
 * @typedef {{ conversationId?: string, receivers: string[], sender: string, message: {} }} SendMessageParams - Parameters for sending a message
 * @typedef {{ success: boolean, error?: Error, notDeliveredUsers?: string[], deliveredUsers?: string[] }} SendMessageResult - Result of sending a message
 * @typedef {(params: SendMessageParams) => SendMessageResult} SendMessageFunction - Function for sending a message
 */
io.sendMessage = ({ conversationId, receivers, sender, message } = {}) => {
  if (conversationId) {
    const conversation = io.conversations.get(conversationId);
    try {
      if (conversation) {
        io.to(conversationId).emit("getMessage", {
          conversationId,
          sender,
          message,
        });
        const deliveryStatusUser = receivers.reduce(
          (result, receiver) => {
            const socketId = io.users.get(receiver);
            if (!socketId) {
              result.notDelivered.push(receiver);
            } else {
              const isDelivered = [...conversation].some(
                ({ userId, socketId }) => {
                  return userId === receiver && socketId === socketId;
                }
              );
              if (isDelivered) {
                result.delivered.push(receiver);
              } else {
                result.notDelivered.push(receiver);
              }
            }
            return result;
          },
          { delivered: [], notDelivered: [] }
        );

        return {
          success: true,
          notDeliveredUsers: deliveryStatusUser.notDelivered,
          deliveredUsers: deliveryStatusUser.delivered,
        };
      } else {
        throw new Error("Conversation not found");
      }
    } catch (e) {
      return { success: false, error: e, notDeliveredUsers: receivers };
    }
  } else {
    if (receivers.length === 1) {
      const receiver = io.getUser(receivers[0]);
      try {
        if (receiver?.socketId) {
          io.to(receiver?.socketId).emit("getMessage", {
            receiver: receivers[0],
            sender,
            message,
          });
          return { success: true };
        } else {
          throw new Error("Receiver not found");
        }
      } catch (e) {
        return { success: false, error: e, notDeliveredUsers: receivers };
      }
    }
  }
};

io.addUserToConversation = (conversationId, userId, socketId) => {
  let conversation = io.conversations.get(conversationId);
  if (!conversation) {
    conversation = new Set();
    io.conversations.set(conversationId, conversation);
  }
  conversation.add({ userId, socketId });
};

io.removeUserFromConversation = (conversationId, socketId) => {
  const conversation = io.conversations.get(conversationId);
  if (conversation) {
    for (const user of conversation) {
      if (user.socketId === socketId) {
        conversation.delete(user);
        break;
      }
    }
    if (conversation.size === 0) {
      io.conversations.delete(conversationId);
    }
  }
};
/**
 * Set user details
 * @param {string} userId - The user ID
 * @param {string} socketId - The socket ID
 */
io.setUser = (userId, socketId) => {
  io.users.set(userId, socketId);
};
/**
 * Get user details by user ID
 * @param {string} userId - The user ID
 * @returns {Object|null} - User details (object with 'userId' and 'socketId') or null if user not found
 */
io.getUser = (userId) => {
  if (!userId) return null;
  for (const [user, socketId] of io.users) {
    if (user === userId) {
      return { userId: user, socketId };
    }
  }
  return null;
};

/**
 * Remove user details by socket ID
 * @param {string} socketId - The socket ID
 */
io.removeUser = (socketId) => {
  for (const [userId, id] of io.users) {
    if (id === socketId) {
      io.users.delete(userId);
      break;
    }
  }
};

// Handle connection events
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  if (socket.handshake.query.userId) {
    io.setUser(socket.handshake.query.userId, socket.id);
  }

  socket.on("addUser", (userId) => {
    io.setUser(userId, socket.id);
  });

  // Handle joining a conversation
  socket.on("joinConversation", (data) => {
    console.log(data);
    let { conversationId, userId } =
      typeof data === "string" ? JSON.parse(data) : data;
    socket.join(conversationId);
    io.addUserToConversation(conversationId, userId, socket.id);
    console.log(`User ${userId} joined conversation: ${conversationId}`);
  });

  // Handle leaving a conversation
  socket.on("leaveConversation", ({ conversationId, userId }) => {
    socket.leave(conversationId);
    io.removeUserFromConversation(conversationId, socket.id);
    console.log(`User ${userId} left conversation: ${conversationId}`);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    // Remove the user from all conversations
    io.conversations.forEach((conversation, conversationId) => {
      const userToRemove = [...conversation].find(
        (user) => user.socketId === socket.id
      );
      if (userToRemove) {
        conversation.delete(userToRemove);
      }
      if (conversation.size === 0) {
        io.conversations.delete(conversationId);
      }
    });

    // Remove the user from the users map
    io.removeUser(socket.id);

    console.log("User removed from users map:", io.users);
  });
});
/**
 * @typedef {import("socket.io").Server & { users: UserMap, sendMessage: SendMessageFunction, conversations: ConversationMap, setUser: (userId: string, socketId: string) => void, getUser: (userId: string) => { userId: string, socketId: string } | null, removeUser: (socketId: string) => void, addUserToConversation: (conversationId: string, userId: string, socketId: string) => void, removeUserFromConversation: (conversationId: string, socketId: string) => void }} SocketIOServer - Custom Socket.IO server type with additional properties
 */
module.exports = io;
