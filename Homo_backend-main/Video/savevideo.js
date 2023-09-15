
const User = require('../models/Users');
const BusinessModel = require('../models/BusinessAccountModel.js');
const InstituteModel = require('../models/InstituteAccountModel.js');


module.exports = async (req, res) => {
    const { AccountType, userId, VideoId, action } = req.body;
    if (AccountType == "Personal") {
        try {
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (action === 'save') {
                if (user.savedVideo.includes(VideoId)) {
                    return res.status(400).json({ message: 'Video is already saved' });
                }

                user.savedVideo.push(VideoId);
                await user.save();

                res.json({ message: 'Video saved successfully' });
            } else if (action === 'unsave') {
                if (!user.savedVideo.includes(VideoId)) {
                    return res.status(400).json({ message: 'Video is not saved' });
                }

                user.savedVideo.pull(VideoId);
                await user.save();

                res.json({ message: 'Video unsaved successfully' });
            } else {
                return res.status(400).json({ message: 'Invalid action' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    else if (AccountType == "Business") {
        try {
            const user = await BusinessModel.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (action === 'save') {
                if (user.savedVideo.includes(VideoId)) {
                    return res.status(400).json({ message: 'Video is already saved' });
                }

                user.savedVideo.push(VideoId);
                await user.save();

                res.json({ message: 'Video saved successfully' });
            } else if (action === 'unsave') {
                if (!user.savedVideo.includes(VideoId)) {
                    return res.status(400).json({ message: 'Video is not saved' });
                }

                user.savedVideo.pull(VideoId);
                await user.save();

                res.json({ message: 'Video unsaved successfully' });
            } else {
                return res.status(400).json({ message: 'Invalid action' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    else if (AccountType == "Institute") {
        try {
            const user = await InstituteModel.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (action === 'save') {
                if (user.savedVideo.includes(VideoId)) {
                    return res.status(400).json({ message: 'Video is already saved' });
                }

                user.savedVideo.push(VideoId);
                await user.save();

                res.json({ message: 'Video saved successfully' });
            } else if (action === 'unsave') {
                if (!user.savedVideo.includes(VideoId)) {
                    return res.status(400).json({ message: 'Video is not saved' });
                }

                user.savedVideo.pull(VideoId);
                await user.save();

                res.json({ message: 'Video unsaved successfully' });
            } else {
                return res.status(400).json({ message: 'Invalid action' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    else {
        res.status(204).json({ Message: "User Not Found" });
    }
}

