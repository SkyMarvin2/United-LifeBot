module.exports = {
  name: "Store Reaction Info (MOD)",
  section: "Reaction Control",
  subtitle(data) {
    const info = ["User", "Message ID", "Emoji Name"];
    return `Store ${info[parseInt(data.info, 10)]}`;
  },
  fields: ["info", "storage", "varName"],
  html() {
    return `
    <div>
      <label>Source Info:</label><br>
      <select id="info" class="round">
        <option value="0">User</option>
        <option value="1">Message ID</option>
        <option value="2">Emoji Name</option>
      </select>
    </div><br>
    <store-in-variable variableInputId="varName"></store-in-variable>`;
  },
  action(cache) {
    const data = cache.actions[cache.index];
    const reaction = cache.reaction;
    let result;
    switch (parseInt(data.info, 10)) {
      case 0:
        result = reaction?.users?.cache?.last();
        break;
      case 1:
        result = reaction?.message?.id;
        break;
      case 2:
        result = reaction?.emoji?.name;
        break;
      default:
        break;
    }
    if (result !== undefined) {
      this.storeValue(result, data.storage, data.varName, cache);
    }
    this.callNextAction(cache);
  },
  mod() {}
};
