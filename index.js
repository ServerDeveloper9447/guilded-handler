// javascript is really confusing ngl
const fs = require('fs')
const chalk = require('chalk')
class guildedHandler extends Error {
    constructor(message) {
        super(message);
        this.name = "Guilded Handler error"
      this.message = "\n" + message
    }
}
const walk = require('walk')
/**
 * 
 * @param {String} path Path to the commands folder
 * @param {Object} client The guilded API client object
 */
module.exports = (client,config = {path_to_dir:path,prefix:""}) => {
  if (!client) throw new guildedHandler("Must provide app where client = Guilded.js client object")
  if (!config.path_to_dir) throw new guildedHandler("Must provide path where path_to_dir = the path to the directory containing all command files (js).")
  const pathogen = require('path').resolve(config.path_to_dir)
  client.options.path = pathogen
  try {
    fs.accessSync(pathogen, fs.R_OK)
  } catch (err) {
    throw new guildedHandler("Cannot access path. Please provide the absolute path from root")
  }
  if (!fs.lstatSync(pathogen).isDirectory()) throw new guildedHandler("Path must be a directory");
  console.log(chalk.blueBright("Loading Commands..."))
  var files = []
  const walker  = walk.walk(pathogen, { followLinks: false });
  walker.on('file', function(root, stat, next) {
    // Add this file to the list of files
    files.push(root + '/' + stat.name);
    next();
});
  
  walker.on('end',() => {
    var commandcount = 0
    var commands = []
    const prefarr = [].concat(config.prefix)
    client.options.prefix = config.prefix
    files.forEach(path => {
    console.log(chalk.greenBright(`Walking into ${path}`))
    try {
    const command = require(path)
    if(!command.name || !command.run) return console.log(chalk.redBright(`Failed to walk in: ${path}`)),console.log(chalk.redBright("name or run parameter empty"));
      console.log(chalk.green(`Loaded command ${command.name}\n----------------------------`))
      commandcount++
      const aliases = [].concat(command.aliases)
      const cnames = [].concat(command.name,aliases.filter(x => x!=null))
      commands.push({name:cnames,run:command.run})
    } catch(err) {
      console.warn(chalk.redBright(`Failed to walk in: ${path}.`))
      throw new guildedHandler(err)
    }
  })
    client.on('messageCreated',message => { //only to limit this mf i had to change the whole structure
      if(message.createdById == client.user.id) return;
        if(!prefarr.some(w => message.content.toLowerCase().startsWith(w.toLowerCase()))) return;
        var prefixforthis = "";
        prefarr.forEach(el => {
          if(prefixforthis == null) return;
          if(message.content.toLowerCase().startsWith(el.toLowerCase())) {
            prefixforthis = el.toLowerCase()
          }
        })
      const messagearr = message.content.slice(prefixforthis.length).split(" ")
      const commandname = messagearr[0]
      messagearr.shift()
      const commandnames = []
      commands.map(x => x.name).forEach(x => {
        x.forEach(m => commandnames.push(m.toLowerCase()))
      })
      var cname = ''
      commandnames.some(w => {
        if(!cname) {
         if(commandname.toLowerCase() == w) {
            cname = w;
           return true;
          } else return false;
        }
      })
      const command = commands.filter(x => x.name.includes(cname.toLowerCase()))[0]
      if(!command) return;
      command.run(client,message,messagearr)
    })
    client.on('ready',() => {
      console.log(chalk.blue(`Bot            : ${client.user.name}\nID             : ${client.user.id}\nBot ID         : ${client.user.botId}\nPrefix         : ${prefarr.join(", ").toLowerCase()}\nTotal Commands : ${commandcount}`))
      console.log(`${chalk.blue("Status         :")} ${chalk.green("Ready")}`)
      console.log(`Guilded-Handler Version: ${require(__dirname+'/package.json').version} || ${client.user.name} || Power Guilds Development Team || https://guilded.gg/powerguilds`)
    })
    client.on('error',() => {
      console.log(chalk.blue("Status         : ") + chalk.red("Disconnected!"))
    })
  })
}