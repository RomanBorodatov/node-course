const mongoose = require("mongoose");
const Store = mongoose.model("Store");

exports.homePage = (req, res) => {
  res.render("index");
};

exports.addStore = (req, res) => {
  res.render("editStore", {
    title: "Add store"
  });
};

exports.createStore = async (req, res) => {
  const store = new Store(req.body);
  await store.save();
  req.flash(
    "success",
    `Successfully Created ${store.name}. Care to leave areview`
  );
  res.redirect("/");
};

exports.getStores = async (req, res) => {
  // 1. Query the database fore a list of all stores
  const stores = await Store.find();
  console.log(stores);
  res.render("stores", { title: "Stores", stores });
};

exports.editStore = async (req, res) => {
  // 1. Find the store given the ID
  const store = await Store.findOne({ _id: req.params.id });
  // 2. confirm they are the owner of the store
  // TODO
  // 3. Render out the edit form so the user can update their store
  res.render("editStore", { title: "Edit Store", store });
};

exports.updateStore = async (req, res) => {
  // 1. Find and update the store
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new store instead of the old one
    runValidators: true
  }).exec();
  req.flash(
    "success",
    `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store</a>`
  );

  // 2. redirect to
  res.redirect(`/stores/${store._id}/edit`);
};
