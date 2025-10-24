module.exports = {
  name: "Add Reaction (MOD)",
  section: "Messaging",
  subtitle(data) {
    return `${data.emoji}`;
  },
  fields: ["storage", "varName", "emoji"],
  html() {
    return `
    <div>
      <store-in-variable dropdownLabel="Source Message" selectId="storage" variableInputId="varName"></store-in-variable><br>
      <div style="padding-top: 8px">
        <label>Emoji to Add:</label><br>
        <input id="emoji" class="round" type="text" placeholder="Example: ✅ or custom_emoji:id">
      </div>
    </div>`;
  },
  async action(cache) {
    const data = cache.actions[cache.index];
    const msg = this.getVariable(data.storage, data.varName, cache);
    const emoji = this.evalMessage(data.emoji, cache);
    if (msg?.react) msg.react(emoji).catch(console.error);
    this.callNextAction(cache);
  },
  mod() {}
};
