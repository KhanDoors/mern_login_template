exports.signup = (req, res) => {
  console.log("Req Body", req.body);
  res.json({ data: "you hit the endpoint" });
};
