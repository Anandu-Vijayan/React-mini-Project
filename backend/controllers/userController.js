const asyncHandler = require("express-async-handler");
const Application = require("../models/applicationModel");
const { db } = require("../models/userModels");
const User = require("../models/userModels");
const generateToken = require("../utils/generateToken");
const session = require("express-session");
const Seats = require("../models/seatModel");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, mobile } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  const user = await User.create({
    name,
    email,
    password,
    mobile,
    status: true,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("error occured");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    req.session.user_id = user._id;

    if (!user.status) {
      res.status(500);
      throw new Error("your account is blocked");
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      status: user.status,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
});

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (users) {
    res.json({ users });
  } else {
    res.status(400);
    throw new Error("No users available");
  }
});
const blockUser = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  let user = await User.findOne({ _id: _id });

  if (user) {
    let success = await User.updateOne(
      { _id: _id },
      {
        $set: { status: false },
      }
    );
    user = await User.findOne({ _id: _id });

    res.json({ user });
  } else {
    res.status(400);
    throw new Error("No users available");
  }
});

const unBlockUser = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  let user = await User.findOne({ _id: _id });

  if (user) {
    let success = await User.updateOne(
      { _id: _id },
      {
        $set: { status: true },
      }
    );
    user = await User.findOne({ _id: _id });

    res.json({ user });
  } else {
    res.status(400);
    throw new Error("No users available");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  let user = await User.findOne({ _id: _id });

  if (user) {
    let success = await User.deleteOne({ _id: _id });
    user = await User.findOne({ _id: _id });

    res.json({ user });
  } else {
    res.status(400);
    throw new Error("No users available");
  }
});

const editUser = asyncHandler(async (req, res) => {
  const { _id, name, email, mobile } = req.body;

  let user = await User.findOne({ _id: _id });

  if (user) {
    let success = await User.updateOne(
      { _id: _id },
      {
        $set: {
          name: name,

          email: email,
          mobile: mobile,
        },
      }
    );
    user = await User.findOne({ _id: _id });

    res.json({ user });
  } else {
    res.status(400);
    throw new Error("No users available");
  }
});

const getSubmitStatus = asyncHandler(async (req, res) => {
  try {
    const application = await Application.findOne({
      user_id: req.session.user_id,
    });

    res.json(application);
  } catch (e) {
    throw new Error(e);
  }
});

const submitApplication = asyncHandler(async (req, res) => {
  req.body.user_id = req.session.user_id;
  try {
    const userId = req.session.user_id;
    let user = await User.findOne({ _id: userId });

    if (user) {
      let application = await Application.create(req.body);
      application.approval_status = "pending";
      res.json(application);
    } else {
      throw new Error("error occured try after some times");
    }
  } catch (e) {
    res.json({ e });
  }
});

const approveApp = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.body;
    if (_id) {
      await Application.updateOne(
        { _id: _id },
        {
          $set: {
            approval_status: "approved",
          },
        }
      );
      res.json({ status: "approved" });
    }
  } catch (e) {}
});

const declineApp = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.body;
    if (_id) {
      await Application.updateOne(
        { _id: _id },
        {
          $set: {
            approval_status: "declined",
          },
        }
      );
      res.json({ status: "declined" });
    }
  } catch (e) {}
});

const getApplications = asyncHandler(async (req, res) => {
  try {
    const appData = await Application.find().sort({ createdAt: 1 });

    res.json(appData);
  } catch (e) {}
});

const logout = asyncHandler(async (req, res) => {
  try {
    req.session.destroy;
    res.json({ logout: true });
  } catch (e) {}
});

const addSeat = asyncHandler(async (req, res) => {
  try {
    const seat = await Seats.create(req.body);

    res.json(seat);
  } catch (e) {}
});

const getSeats = asyncHandler(async (req, res) => {
  try {
    const seats = await Seats.find().sort({ seat_number: 1 });

    res.json(seats);
  } catch (e) {}
});

const removeCompanyseat = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    const removed = await Seats.updateOne(
      { _id: _id },
      {
        $set: {
          name: null,
          email: null,
          user_id: null,
          status: true,
        },
      }
    );

    if (removed) {
      res.json({ removed: true });
      console.log(removed);
    } else {
      throw new Error("error occured during removal");
    }
  } catch (error) {
    console.log(error);
  }
});

const assignSeat = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { company_id, seat_id } = req.body;

  try {
    const companyDetails = await Application.findById({ _id: company_id });
    console.log(companyDetails);

    const data = await Seats.updateOne(
      { _id: seat_id },
      {
        $set: {
          name: companyDetails.company_name,
          email: companyDetails.email,
          user_id: companyDetails._id,
          status: false,
        },
      }
    );
    console.log(data);

    if (data) {
      res.json({ status: true });
    } else {
      throw new Error("error occured");
    }
  } catch (error) {
    console.log(error);
  }
});

const getRoomData = asyncHandler(async (req, res) => {
  console.log(req.session.user_id);

try {
  const rooms = await User.aggregate([
    {
      $lookup: {
        from: "applications",
        localField: "_id",
        foreignField: "user_id",
        as: "applications",
      },
    },
    {
      $match: {
        "applications.user_id": ObjectId(req.session.user_id)
        
      },
    },
    {
      $unwind: {
        path: "$applications",
        includeArrayIndex: "string",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "seatings",
        localField: "applications._id",
        foreignField: "user_id",
        as: "rooms",
      },
    },
    {
      $project: {
        rooms: 1,
      },
    },
  ]);
console.log(rooms[0].rooms)
if(rooms){
  res.json(rooms[0].rooms)
}


  
} catch (error) {
  console.log(error);
}
});

const getUserApplications =asyncHandler(async(req,res)=>{
 const userId= req.params.id
 console.log(userId);
  console.log("userId");

try {
  const appData = await Application.find({user_id:userId})
   if(appData){
    res.json(appData)
   }

} catch (error) {
  
}


})

module.exports = {
  registerUser,
  authUser,
  getAllUser,
  blockUser,
  unBlockUser,
  getUserApplications,
  editUser,
  deleteUser,
  submitApplication,
  getSubmitStatus,
  logout,
  getApplications,
  approveApp,
  declineApp,
  addSeat,
  getSeats,
  assignSeat,
  removeCompanyseat,
  getRoomData,
};
