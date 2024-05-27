const user = mongoose.Schema({
  id: String,
  access_token: String,
  refresh_token: String,
  email: String,
  date: { type: String, default: () => moment().format("LLL") },
});

module.exports = mongoose.model("user", user);
