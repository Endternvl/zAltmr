module.exports = {
  calculator: function (num1, operator, num2) {
    if (!num1) throw new TypeError("Missing num1");
    if (!operator) throw new TypeError("Missing operator");
    if (!num2) throw new TypeError("Missing num2");
    if (operator == "*") return num1 * num2;
    if (operator == "^") return num1 ^ num2;
    if (operator == "+") return num1 + num2;
    if (operator == "-") return num1 - num2;
    if (operator == "/") return num1 / num2;
  },
  formatDate: function (date) {
    return new Intl.DateTimeFormat("en-US").format(date);
  },
  match: function(msg, i) {
        if (!msg) return undefined;
        if (!i) return undefined;
        let user = i.members.cache.find(
          m =>
            m.user.username.toLowerCase().startsWith(msg) ||
            m.user.username.toLowerCase() === msg ||
            m.user.username.toLowerCase().includes(msg) ||
            m.displayName.toLowerCase().startsWith(msg) ||
            m.displayName.toLowerCase() === msg ||
            m.displayName.toLowerCase().includes(msg)
        );
        if (!user) return undefined;
        return user.user;
    },
};