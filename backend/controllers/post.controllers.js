const Post = require("../models/post.model");
const path = require("path");

const addPost = async (req, res) => {
  const added_by = req.user._id;
  let { description, location, type = "FOUND", image } = req.body;
  if (!description || !location || !req.files || !req.files.image) {
    return res.status(400).send({ message: "all fileds are required" });
  }
  try {
    if (description.length < 5) {
      return res.status(400).send({ message: "not enough information given" });
    }

    //location
    const validLocations = [
      "BEIRUT",
      "SOUTH",
      "NORTH",
      "BEKAA",
      "MOUNT LEBANON",
      "OTHER",
    ];
    if (!validLocations.includes(location)) {
      return res
        .status(400)
        .send({ message: "location does not match available ones" });
    }

    //image
    if (Array.isArray(req.files.image)) {
      return res
        .status(400)
        .send({ message: "Only one image can be uploaded at a time" });
    }
    const imageFile = req.files.image;

    const imageExtension = path.extname(imageFile.name);
    const imageName = `${added_by}-${Date.now()}${imageExtension}`;

    const imageDir = path.join(__dirname, "../public/images/posts", imageName);
    await imageFile.mv(imageDir).catch((err) => {
      console.error(err);
      return res.status(500).send({ message: "Error uploading image" });
    });

    image = imageName;

    const post = new Post({
      added_by,
      description,
      location,
      image,
      type,
    });
    await post.save();
    return res.status(200).send({ post, status: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};

const editPost = async (req, res) => {
  let { description, location, type, image, id } = req.body;
  let updatedValues = {};
  try {
    const post = await Post.findOne({ _id: id });
    if (!post) {
      return res.status(404).send({ message: "post not found" });
    }

    if (type) {
      const validtypes = ["LOST", "FOUND"];
      if (!validtypes.includes(type)) {
        return res.status(400).send({ message: "type does not exist" });
      }
      updatedValues.type = type;
    }
    if (location) {
      const validLocations = [
        "BEIRUT",
        "SOUTH",
        "NORTH",
        "BEKAA",
        "MOUNT LEBANON",
        "OTHER",
      ];
      if (!validLocations.includes(location)) {
        return res
          .status(400)
          .send({ message: "location does not match available ones" });
      }
      updatedValues.location = location;
    }
    if (description) {
      if (description.length < 5) {
        return res
          .status(400)
          .send({ message: "not enough information given" });
      }
      updatedValues.description = description;
    }

    if (req.files && req.files.image) {
      if (Array.isArray(req.files.image)) {
        return res
          .status(400)
          .send({ message: "Only one image can be uploaded at a time" });
      }
      const imageFile = req.files.image;

      const imageExtension = path.extname(imageFile.name);
      const imageName = `${id}-${Date.now()}${imageExtension}`;

      const imageDir = path.join(
        __dirname,
        "../public/images/posts",
        imageName
      );
      await imageFile.mv(imageDir).catch((err) => {
        console.error(err);
        return res.status(500).send({ message: "Error uploading image" });
      });
      updatedValues.image = imageName;
    }
    await Post.findByIdAndUpdate(id, updatedValues);
    return res.status(200).send({ message: "post updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "server error" });
  }
};
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate(
      "added_by",
      "_id name phone email"
    );
    res.status(200).json({ posts: posts });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
const getPost = async (req, res) => {};
const deletePost = async (req, res) => {};

module.exports = {
  addPost,
  editPost,
  getAllPosts,
  getPost,
  deletePost,
};
