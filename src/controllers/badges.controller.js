const { BadgeModel } = require('../models');
const { UserModel } = require('../models');
const ObjectId = require('mongoose').Types.ObjectId;

async function getOneById (req, res) {
  const id = req.params.id;
  try {
    const data = await BadgeModel.findById(id);
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).json({
      message: 'Error get one',
      data: id
    });
  }
}
async function getOneByPlate (req, res) {
  const plate = req.params.plate;
  try {
    const data = await BadgeModel.findOne({ plate: plate });
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).json({
      message: 'Error get one',
      data: plate
    });
  }
}
async function getAll (req, res) {
  if (req.user.type !== 'super') {
    return res.status(400).send({message: 'Unauthorized user'})
  }
  const Id =  req.params.userId;
  try {
    const data = await BadgeModel.find({ userId: Id });
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).json({
      message: 'Error'
    });
  }
}
async function createOne (req, res) {
  const createdBy = req.user._id;
  const updateUser = {};
  const admins = [createdBy];
  const superadmin = createdBy;
  try {
    const newData = await BadgeModel.create({ ...req.body, createdBy, admins, superadmin });
    if (!newData) {
      return res.status(400).end();
    }
    updateUser.type = 'admin';
    updateUser.badgeId = newData._id;
    const update = await UserModel
      .findOneAndUpdate({
        _id: createdBy
      },
      updateUser,
      { new: true })
      .lean()
      .exec();
    if (!update) {
      return res.status(400).end();
    }
    res.status(201).json(newData);
    // res.status(201).json(update);
  } catch (err) {
    res.status(400).json({
      message: 'Error Creating a Badge'
    });
  }
}
async function updateOne (req, res) {
  const id = req.params.id;
  const createdBy = req.user._id;
  const body = req.body;
  const admin = [];
  const admins = body.admins;
  const vehicles = body.vehicles;
  const vehicle = [];
  const drivers = body.drivers;
  const driver = [];
  delete body.admins;
  delete body.drivers;
  delete body.vehicles;

  console.log('*************Badge UpdateOne**************');
  try {
    const findOne = await BadgeModel
      .findOne({
        createdBy: createdBy,
        _id: id
      });

    if (admins) {
      admins.forEach(element => admin.push(ObjectId((element))));
    }
    if (findOne.admins) {
      findOne.admins.forEach(element =>
        admin.push(ObjectId((element)))
      );
    }

    for (let i = 0; i < admin.length; i++) {
      const update = await UserModel
        .findOneAndUpdate({
          _id: admin[i]
        },
        {
          badgeId: findOne.id,
          type: 'admin'
        },
        { new: true })
        .lean()
        .exec();
      if (!update) {
        return res.status(400).end();
      }
    }

    if (vehicles) {
      vehicles.forEach(element => vehicle.push(ObjectId((element))));
    }
    if (findOne.vehicles) {
      findOne.vehicles.forEach(element => vehicle.push(ObjectId((element))));
    }
    if (drivers) {
      drivers.forEach(element => driver.push(ObjectId((element))));
    }
    if (findOne.driver) {
      findOne.driver.forEach(element => driver.push(ObjectId((element))));
    }
    const update = await BadgeModel
      .findOneAndUpdate({
        createdBy: createdBy,
        _id: id
      },
      { admins: removeDups(admin), vehicles: removeDups(vehicle), drivers: removeDups(driver), ...req.body },
      { new: true })
      .lean()
      .exec();
    console.log(update);
    if (!update) {
      return res.status(400).end();
    }

    res.status(200).json({ data: update });
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
}

function removeDups (names) {
  const unique = {};
  names.forEach(function (i) {
    if (!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}

module.exports = {
  getOneById,
  getAll,
  createOne,
  updateOne
};
