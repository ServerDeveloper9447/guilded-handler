const fs = require('fs')
class guildedHandler extends Error {
    constructor(message) {
        super(message);
        this.name = "Guilded Handler error"
      this.message = "\n" + message
    }
}
/**
 * 
 * @param {String} path Path to the commands folder
 * @param {Object} client The guilded API client object
 */
module.exports = (path,client) => {
  const dir = fs.readdirSync(path)
  dir.forEach(file => {
    if(fs.lstatSync(`${path}/${file}`).isDirectory()) throw new guildedHandler("Sorry, I am not capable to reading directories at this moment. Please only include .js files in the directory");
    if(file.toLowerCase() == "index.js") return;
    console.log(`Walking into ${path}/${file}`)
    try {
    const command = require(`${path}/${file}`)
    if(!command.name || !command.run) return console.log(`Failed to walk in: ${path}/${file}`),console.log("name or run parameter empty");
    client.on("messageCreated",message => {
      const args = message.content.slice(3).split(" ").shift()
      if(!message.content.toLowerCase().includes(command.name)) return;
      command.run(client,message,args)
    })
    } catch(err) {
      console.warn(`Failed to walk in: ${path}/${file}.`)
      throw new guildedHandler(err)
    }
  })
}