const fs = require('fs')
const chalk = require('chalk')
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
module.exports = (client,config = {path_to_dir:path,prefix:"!"}) => {
  if (!client) throw new guildedHandler("Must provide app where client = Guilded.js client object")
  if (!config.path_to_dir) throw new guildedHandler("Must provide path where path_to_dir = the path to the directory containing all command files (js).")
  if(typeof config.prefix != "string") throw new guildedHandler("Prefix must be a string");
  const path = require('path').resolve(config.path_to_dir)
  console.log(chalk.blueBright("Loading Commands..."))
  try {
    fs.accessSync(path, fs.R_OK)
  } catch (err) {
    throw new guildedHandler("Cannot access path. Please provide the absolute path from root")
  }
  if (!fs.lstatSync(path).isDirectory()) throw new guildedHandler("Path must be a directory");
  const dir = fs.readdirSync(path)
  dir.forEach(file => {
    if(fs.lstatSync(`${path}/${file}`).isDirectory()) return;
    if(file.toLowerCase() == "index.js") return;
    console.log(chalk.greenBright(`Walking into ${path}/${file}`))
    try {
    const command = require(`${path}/${file}`)
    if(!command.name || !command.run) return console.log(chalk.redBright(`Failed to walk in: ${path}/${file}`)),console.log(chalk.redBright("name or run parameter empty"));
      console.log(chalk.green(`Loaded command ${command.name}`))
      const arr = [].concat(command.name,command.aliases).filter(x => x!=null)
      client.on('messageCreated',message => {
        if(!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
        const messagearr = message.content.slice(config.prefix.length).split(" ")
        const commandname = messagearr[0]
        messagearr.shift()
        if(!arr.some(w => commandname.toLowerCase() == w.toLowerCase())) return;
        command.run(client,message,messagearr)
      })
    } catch(err) {
      console.warn(chalk.redBright(`Failed to walk in: ${path}/${file}.`))
      throw new guildedHandler(err)
    }
  })
}