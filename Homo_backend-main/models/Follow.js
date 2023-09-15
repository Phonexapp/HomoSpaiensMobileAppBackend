const { default: mongoose, Schema } = require("mongoose");

const followSchema = new mongoose.Schema({
  
},
{timestamps:true}
);




const Follow = mongoose.model("Follow", followSchema);

module.exports = Follow;
