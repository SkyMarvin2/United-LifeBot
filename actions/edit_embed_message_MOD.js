module.exports = {
  name: "Edit Embed Message (MOD)",
  section: "Messaging",
  subtitle(data) {
    return `Edit an embed message`;
  },
  fields: ["storage", "varName", "title", "description", "color"],
  html() {
    return `
    <div>
      <store-in-variable dropdownLabel="Source Message" selectId="storage" variableInputId="varName"></store-in-variable><br>
      <div style="padding-top:8px">
        <label>Embed Title:</label><br>
        <input id="title" class="round" type="text">
      </div><br>
      <div>
        <label>Embed Description:</label><br>
        <textarea id="description" rows="6" placeholder="Enter embed text..." style="width:100%;"></textarea>
      </div><br>
      <div>
        <label>Embed Color (hex):</label><br>
        <input id="color" class="round" type="text" placeholder="#8A2BE2">
      </div>
    </div>`;
  },
  async action(cache) {
    const data = cache.actions[cache.index];
    const msg = this.getVariable(data.storage, data.varName, cache);
    if (!msg?.edit) return this.callNextAction(cache);
    const Discord = require("discord.js");
    const title = this.evalMessage(data.title, cache);
    const description = this.evalMessage(data.description, cache);
    const color = this.evalMessage(data.color, cache);
    const embed = new Discord.MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setColor(color);
    msg.edit({ embeds: [embed] }).catch(console.error);
    this.callNextAction(cache);
  },
  mod() {}
};
