'use strict';

// These two fns render different views, so one could argue they need different
// ctrls. In developing these, if it becomes clear to break them out, by all
// means, go ahead!

module.exports.displayAllCategories = (req, res, next) => {
  // Gets all categories & three products for each category
  // Renders index.pug
};

module.exports.displayCategory = (req, res, next) => {
  // Gets products for a particular category
  // Renders category.pug
};
