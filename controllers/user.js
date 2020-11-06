const User = require('../models/user');
const Slot = require('../models/slot');
const Booking = require('../models/booking');

const accessTokenGenerator = require('../jwtService/accessToken/generateJWT');

exports.login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        console.log("data", email, password);
        let data = await User.find({ email });


        if (!data.length) {
            res.status(401).json({
                err: "Auth failed"
            });
            return;
        }


        data = data[0];


        if (data.password === password) {
            const accessToken = accessTokenGenerator({
                email, name: data.name
            });

            res.status(200).json({
                accessToken
            });
        } else {
            res.status(401).json({
                err: "Auth failed"
            });
        }
    } catch (err) {
        res.status(500).json({
            err: "Internal Server Error"
        });

        console.log(err);
    }
}



exports.serveParkingSlots = async (req, res, next) => {
    try {
        const xCord = req.body.xCord;
        const yCord = req.body.yCord;


        let circleName = "Vit, Vellore";

        if (req.user.name === "Tim") {
            circleName = "Panvel";
        }


        const data = await Slot.aggregate([
            {
                $match: {
                    "circleName": circleName
                }
            },
            {
                $group: {
                    _id: "$circleName",
                    circleXCord: {
                        $first: "$circleXCord",
                    },
                    circleYCord: {
                        $first: "$circleYCord"
                    },
                    slots: {
                        $push: {
                            slotName: "$slotName",
                            slotXCord: "$slotXCord",
                            slotYCord: "$slotYCord",
                            available: "$capacity"
                        }
                    }
                }
            }
        ]);

        console.log(data[0]);

        setTimeout(() =>
            res.status(200).json({
                ...data[0]
            }),
            1000
        )


    } catch (error) {
        res.status(500).json({
            err: "Internal Server Error"
        });

        console.log(error);
    }
}

exports.bookSlot = async (req, res, next) => {
    try {

        const slotName = req.body.slotName;
        const userName = req.user.name;
        const time = req.body.time;

        await Booking.create({ userName, slotName, price: 60, time });

        res.status(201).json({});

    } catch (error) {
        res.status(500).json({
            err: "Internal Server Error"
        });
        console.log(error);
    }
}


exports.bookHistory = async (req, res, next) => {
    try {

        const user = req.user.name;

        const data = await Booking.find({ userName: user });

        console.log(data);

        res.status(200).json({
            bookings: data
        })

    } catch (error) {
        res.status(500).json({
            err: "Internal Server Error"
        });
        console.log(error);
    }
}