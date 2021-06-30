var Itemdb = require('../model/model');

// CRUD operations

// create and save new item
exports.create = (req, res) => {
  // validate request
  if(!req.body){
    res.status(400).send({ message : "Content can not be empty!"});
    return;
  }
  
  // new item
  const item = new Itemdb({
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock
  })

  // save item in database
  item
    .save(item)
    .then(data => {
    res.redirect('/add-item');
    })
    .catch(err => {
      res.status(500).send({
        message:err.message || "Error occured while adding"
      });
    });

}

// retrieve all items/ or a single item
exports.find = (req, res) => {
  if(req.query.id) {
    const id = req.query.id;

    Itemdb.findById(id)
      .then(data => {
        if(!data) {
          res.status(404).send({message: `Item with id ${id} not found`})
        } else {
          res.send(data)
        }
      })
      .catch(err => {
        res.status(500).send({message: `Item with id ${id} not found`})
      })
  } else {
    Itemdb.find()
    .then(item => {
      res.send(item)
    })
    .catch(err => {
      res.status(500).send({message:err.message || "Error occurred while reading items"})
    })
  }
}

// update item by id
exports.update = (req, res) => {
  if(!req.body) {
    return res
      .status(400)
      .send({message:"Update data cannot be empty"})
  }
  const id = req.params.id;
  Itemdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data => {
      if(!data) {
        res.status(404).send({message:`Cannot update item with ${id}. Perhaps item does not exist!`})
      } else {
        res.send(data)
      }
    })
    .catch(err => {
      res.status(500).send({message:"Error updating"})
    })
}

// delete item by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Itemdb.findByIdAndDelete(id)
    .then(data => {
      if(!data) {
        res.status(404).send({message:`Failed to delete item with ${id}.`})
      } else {
        res.send({
          message:"Item deleted successfully"
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message:`Could not delete item with id=${id}`
      });
    });
}