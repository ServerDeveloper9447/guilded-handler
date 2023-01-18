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
const Commands = require('./Commands.js')
const walk = require('walk')
/**
 * 
 * @param {String} path Path to the commands folder
 * @param {Object} client The guilded API client object
 */
module.exports = (client, config = { path_to_dir: path, prefix:""}) => {
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
  const walker = walk.walk(pathogen, { followLinks: false });
  walker.on('file', function(root, stat, next) {
    // Add this file to the list of files
    files.push(root + '/' + stat.name);
    next();
  });

  walker.on('end', () => {
    var commandcount = 0
    const commands = []
    const mapper = new Commands()
    files.forEach(path => {
      console.log(chalk.greenBright(`Walking into ${path}`))
      try {
        const command = require(path)
        if (command.disabled === true) return console.log(`${chalk.green("Loaded command: " + command.name)} [${chalk.red("Disabled")}]\n----------------------------`);
        if (!command.name || !command.run) return console.log(chalk.redBright(`Failed to walk in: ${path}`)), console.log(chalk.redBright("name or run parameter empty"));
        console.log(chalk.green(`Loaded command ${command.name}\n----------------------------`))
        if (typeof command.name != 'string') throw new guildedHandler("Command name param must be a  string");
        if (typeof command.run != 'function') throw new guildedHandler("Command run param must be a function");
        commandcount++
        const aliases = [].concat(command.aliases)
        const cnames = [].concat(command.name, aliases.filter(x => x != null))
        commands.push({ name: cnames, run: command.run })
        mapper.set(mapper.size, command)
      } catch (err) {
        console.warn(chalk.redBright(`Failed to walk in: ${path}.`))
        throw new Error(err)
      }
    })
    client.commands = mapper
   client.cmd = {load: () => {
      const nwalker = walk.walk(pathogen, { followLinks: false })
      var newfiles = []
      nwalker.on('file', function(root, stat, next) {
    // Add this file to the list of files
    newfiles.push(root + '/' + stat.name);
    next();
  });
      nwalker.on('end', () => {
        const newmapper = new Commands()
        newfiles.forEach(path => {
      console.log(chalk.greenBright(`Walking into ${path}`))
      try {
        delete require.cache[require.resolve(path)]
        const command = require(path)
        if (command.disabled === true) return console.log(`${chalk.green("Loaded command: " + command.name)} [${chalk.red("Disabled")}]\n----------------------------`);
        if (!command.name || !command.run) return console.log(chalk.redBright(`Failed to walk in: ${path}`)), console.log(chalk.redBright("name or run parameter empty"));
        console.log(chalk.green(`Loaded command ${command.name}\n----------------------------`))
        if (typeof command.name != 'string') throw new guildedHandler("Command name param must be a  string");
        if (typeof command.run != 'function') throw new guildedHandler("Command run param must be a function");
        newmapper.set(newmapper.size, command)
      } catch (err) {
        console.warn(chalk.redBright(`Failed to walk in: ${path}.`))
        throw new Error(err)
      }
    })
        client.commands = newmapper
        return true;
      })
    }}
    var prefarr = [""];
    if(typeof config.prefix == 'string' || typeof config.prefix == 'object') {
     prefarr = [].concat(config.prefix)
    client.options.prefix = config.prefix 
    }
    if(typeof config.prefix == 'function') prefarr = ["Custom Prefix"],client.options.prefix = config.prefix;
    client.on('messageCreated', message => { //only to limit this mf i had to change the whole structure
      if (message.createdById == client.user.id) return;
      if(typeof config.prefix == 'function') {
        (async () => {
          const get = [].concat(await config.prefix(client,message)).filter(x => x.trim() != '')
          const pref = !get[0] ? [""] : get
        if (!pref.some(w => message.content.toLowerCase().startsWith(w.toLowerCase()))) return;
      var prefixforthis = "";
      pref.forEach(el => {
        if (prefixforthis == null) return;
        if (message.content.toLowerCase().startsWith(el.toLowerCase())) {
          prefixforthis = el.toLowerCase()
        }
      })
      const messagearr = message.content.slice(prefixforthis.length).split(" ").filter(x => x.trim() != "")
      const commandname = messagearr[0]
      messagearr.shift()
      const commandnames = []
      client.commands.map(x => [].concat(x.name,x.aliases)).forEach(x => {
        x.filter(l=>l!=null).forEach(m => commandnames.push(m.toLowerCase()))
      })
          
      var cname = ''
      commandnames.some(w => {
        if (!cname) {
          if (commandname.toLowerCase() == w) {
            cname = w;
            return true;
          } else return false;
        }
      })
          function aliaseslow(aliases) {
            const e = [];
            [].concat(aliases).filter(x => x!=null).forEach(x => {
              e.push(x.toLowerCase())
            })
            return e;
          }
      const command = client.commands.filter(x => [].concat(x.name.toLowerCase(),aliaseslow(x.aliases)).includes(cname.toLowerCase())).map(x => x)[0]
      if (!command) return;
          message.prefix = prefixforthis
          message.command = cname
      command.run(client, message, messagearr)
        })()
      } else {
        if (!prefarr.some(w => message.content.toLowerCase().startsWith(w.toLowerCase()))) return;
      var prefixforthis = "";
      prefarr.forEach(el => {
        if (prefixforthis == null) return;
        if (message.content.toLowerCase().startsWith(el.toLowerCase())) {
          prefixforthis = el.toLowerCase()
        }
      })
      const messagearr = message.content.slice(prefixforthis.length).split(" ").filter(x => x.trim() != "")
      const commandname = messagearr[0]
      messagearr.shift()
      const commandnames = []
      client.commands.map(x => [].concat(x.name,x.aliases)).forEach(x => {
        x.filter(l => l!=null).forEach(m => commandnames.push(m.toLowerCase()))
      })
      var cname = ''
      commandnames.some(w => {
        if (!cname) {
          if (commandname.toLowerCase() == w) {
            cname = w;
            return true;
          } else return false;
        }
      })
      function aliaseslow(aliases) {
            const e = [];
            [].concat(aliases).filter(x => x!=null).forEach(x => {
              e.push(x.toLowerCase())
            })
            return e;
          }
      const command = client.commands.filter(x => [].concat(x.name.toLowerCase(),aliaseslow(x.aliases)).includes(cname.toLowerCase())).map(x => x)[0]
      if (!command) return;
        message.prefix = prefixforthis
        message.command = cname
      command.run(client, message, messagearr)
      }
    })
    client.on('ready', () => {
      delete client.readyTimestamp
      client.readyAt = new Date().toISOString()
      console.log(chalk.blue(`Bot            : ${client.user.name}\nID             : ${client.user.id}\nBot ID         : ${client.user.botId}\nPrefix         : ${prefarr.join(", ").toLowerCase()}\nTotal Commands : ${commandcount}`))
      console.log(`${chalk.blue("Status         :")} ${chalk.green("Ready")}`)
      console.log(`Guilded-Handler Version: ${require(__dirname + '/package.json').version} || ${client.user.name} || Power Guilds Development Team || https://guilded.gg/powerguilds`)
      console.log(chalk.red("You're using an experimental version of this package. Consider using a stable version if you're not an advanced user."))
    })
    client.on('error', () => {
      console.log(chalk.blue("Status         : ") + chalk.red("Disconnected!"))
      throw new guildedHandler("Error on websocket")
    })
    client.on('exit',() => console.log(`${chalk.blue("Status         :")} ${chalk.red("Disconnected")}`))
  })
}