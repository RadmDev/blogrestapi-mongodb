export const createBlogPost = (req, res, next) => {
  const { title, body } = req.body;

  const result = {
    message: "Create Blog Post Success",
    data: {
      post_id: 1,
      title,
      image: "imagefile.png",
      body,
      created_at: "10/10/2020",
      author: {
        uid: 1,
        name: "Testing",
      },
    },
  };
  res.status(201).json(result);
};
