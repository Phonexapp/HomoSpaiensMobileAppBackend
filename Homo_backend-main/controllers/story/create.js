const Story = require("../../models/Story");

// Create a new story
module.exports = async (req, res) => {
  let { files } = req;
  // const id = req.user.id;

  const story = new Story({
    caption: req.body.caption,
    user: req.body.id,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Set expiration time to 24 hours from now

  });
  if (files?.length) {
    story.image = files.map((file) => `/upload/story/images/${file.filename}`);
    //   await uploadFiles(files).then((response) => {
    //     response?.forEach((file) => {
    //       media.push(file.path);
    //       deletefile(file.path);
    //     });
    //   });
  }

  story
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        story: result,
        message: "Story created successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Failed to create Story",
        error: err.message,
      });
    });
};
