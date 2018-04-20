
// get current user id? <-- no, that will come from the route when clicked on the nav bar...

//query for users product's

module.exports.getUserProds = ( ({ req: { id } }, res, next) => {
  Product.findAll({
    where: {
      creator_id: id,
      deleted: false
    }
    .then( products => {
      res.status(200).json(products);
    })
  })
})

//delete user's product