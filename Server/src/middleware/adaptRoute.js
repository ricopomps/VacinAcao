export const adaptRoute = (controllerFunciton) => {
  return async (req, res) => {
    const response = await controllerFunciton(req);
    res.status(response.statusCode).json(response.body);
  };
};
