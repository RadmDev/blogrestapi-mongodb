export const createProduct = (req, res, next) => {
  //   console.log(req.body);
  const { name, price } = req.body;

  res.json({
    message: "Create product success",
    data: {
      id: 1,
      name: name,
      price: price,
    },
  });
};

export const getAllProducts = (req, res, next) => {
  res.json({
    message: "Get all products success",
    data: [
      {
        id: 1,
        name: "Sari Gandum",
        price: 8000,
      },
    ],
  });
};
