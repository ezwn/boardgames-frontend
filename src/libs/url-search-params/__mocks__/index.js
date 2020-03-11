export default {
  get: key => {
    switch (key) {
      case "playerName":
        return "Nicolas";
      case "playerPassword":
        return "012345678";
        default:
            return null;
    }
  }
};
