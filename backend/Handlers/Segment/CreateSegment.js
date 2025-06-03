const Segment = require('../../Models/Segment');
const Customer = require('../../Models/Customer');

const createSegment = async (req, res) => {
    try {
        const { name, rule_set } = req.body;
        const created_by = req.user._id;

        if (!name || !rule_set) {
            return res.status(400).json({
                success: false,
                message: 'Name and rule set are required'
            });
        }

        // Calculate audience size based on rule set
        const audienceQuery = buildQueryFromRules(rule_set);
        const audience_size = await Customer.countDocuments(audienceQuery);

        const segment = new Segment({
            name,
            created_by,
            rule_set,
            audience_size
        });

        await segment.save();

        res.status(201).json({
            success: true,
            message: 'Segment created successfully',
            segment
        });
    } catch (error) {
        console.error('Error creating segment:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error while creating segment'
        });
    }
};

// Helper function to build MongoDB query from rule set
function buildQueryFromRules(rule_set) {
    const query = {};
    if (rule_set.conditions && rule_set.conditions.length > 0) {
        const conditions = rule_set.conditions.map(condition => {
            switch (condition.operator) {
                case 'equals':
                    return { [condition.field]: condition.value };
                case 'greater_than':
                    return { [condition.field]: { $gt: condition.value } };
                case 'less_than':
                    return { [condition.field]: { $lt: condition.value } };
                case 'contains':
                    return { [condition.field]: { $regex: condition.value, $options: 'i' } };
                default:
                    return {};
            }
        });

        if (rule_set.combination === 'OR') {
            query.$or = conditions;
        } else {
            query.$and = conditions;
        }
    }
    return query;
}

module.exports = createSegment; 