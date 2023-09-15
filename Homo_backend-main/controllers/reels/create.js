const Reels = require("../../models/Reels");

// Create a new story
module.exports = async (req, res) => {
  let { files } = req;
  // const id = req.user.id;

  const reel = new Reels({
    caption: req.body.caption,
    user: req.body.id,
    // expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Set expiration time to 24 hours from now
  });
  if (files?.length) {
    reel.image = files.map((file) => `/upload/reels/images${file.filename}`);
    //   await uploadFiles(files).then((response) => {
    //     response?.forEach((file) => {
    //       media.push(file.path);
    //       deletefile(file.path);
    //     });
    //   });
  }

  reel
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        reel: result,
        message: "Reel created successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Failed to create Reel",
        error: err.message,
      });
    });
};
