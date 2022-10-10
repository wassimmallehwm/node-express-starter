const { ErrorsHandler } = require("../../utils");
const Role = require("./role.model");
const roleService = require("./role.service");
      
module.exports.create = async(req, res) => {
  try {
    const { label } = req.body;
    const {
      success,
      status,
      content,
      message
    } = await roleService.create(label)
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, "RoleController:create")
    res.status(status).json({ message, entity: 'Role' })
  }
};

module.exports.getById = async(req, res) => {
  try {
    const { id } = req.params;
    const {
      success,
      status,
      content,
      message
    } = await roleService.findById(id)
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, "RoleController:getById")
    res.status(status).json({ message, entity: 'Role' })
  }
};

module.exports.getByLabel = async(req, res) => {
  try {
    const { label } = req.params;
    const {
      success,
      status,
      content,
      message
    } = await roleService.findByLabel(label)
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, "RoleController:getByLabel")
    res.status(status).json({ message, entity: 'Role' })
  }
};
    
    
      