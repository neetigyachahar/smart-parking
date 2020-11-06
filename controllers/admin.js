const Slot = require('../models/slot');


exports.createNewSlot = async (req, res, next) => {
    try {
        const circleName = req.body.circleName;
        const circleXCord = req.body.circleXCord;
        const circleYCord = req.body.circleYCord;
        const slotName = req.body.slotName;
        const slotXCord = req.body.slotXCord;
        const slotYCord = req.body.slotYCord;
        const capacity = req.body.capacity;

        await Slot.create({ circleName, circleXCord, circleYCord, slotName, slotXCord, slotYCord, capacity });
        
        res.status(201).json({});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            err: "Internal Server Error."
        });
    }
}