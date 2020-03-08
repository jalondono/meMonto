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
  try {
    const data = await BadgeModel.find();
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
    if (vehicles) {
      vehicles.forEach(element => vehicle.push(ObjectId((element))));
    }
    if (findOne.vehicles) {
      findOne.vehicles.forEach(element => vehicle.push(ObjectId((element))));
      findOne.vehicles.forEach(element => {
      const updateOne =  updateUser({badgeId: findOne._id, element})})
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

async function updateUser(req, res) {
    const update = {};
    update.type = 'admin';
    update.badgeId = req.badgeId;
    const updUser = await UserModel
        .findOneAndUpdate({
                _id: req.id
            },
            update,
            { new: true })
        .lean()
        .exec();
    if (!updateUser) {
        return res.status(400).end();
    }
    res.status(200).json({ data: update });
}



module.exports = {
  getOneById,
  getOneByPlate,
  getAll,
  createOne,
  updateOne
};
