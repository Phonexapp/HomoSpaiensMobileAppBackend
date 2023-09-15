const {default:mongoose,Schema} = require('mongoose');

const userSchema = new mongoose.Schema({
      reportedUserId: { type: mongoose.Schema.Types.ObjectId },
      reason: {type: String, required: true, },
      details: String,
});

module.exports = mongoose.model('Report', userSchema);
