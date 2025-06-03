const Campaign = require('../Models/Campaign');
const User = require('../Models/User');

const createCampaign = async (req, res) => {
  try {
    const userId = req.user._id; 

    const {
      name,
      company,
      emailBody,
      audienceDescription,
      sendAt, 
    } = req.body;

    if (!name || !company || !emailBody) {
      return res.status(400).json({ error: 'name, company, and emailBody are required' });
    }
    const newCampaign = new Campaign({
      name,
      company,
      emailBody,
      audienceDescription,
      sendAt
    });

    await newCampaign.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.campaigns.push(newCampaign._id);
    await user.save();

    res.status(201).json({ message: 'Campaign created and linked to user', campaign: newCampaign });

  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = createCampaign;
