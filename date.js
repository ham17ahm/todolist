function getDate() {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  let day = today.toLocaleDateString("en-GB", options);

  return day;
}

module.exports = getDate;
