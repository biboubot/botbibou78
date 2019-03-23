const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
var prefix = ".";
 
client.login('NTU0Mjc2NDIyNzcyODUwNzAw.D2gWLA.vYnKQYERdTA0ycUcZgLlwoVjMCs');

bot.on('message', message => {
    if (message.content === prefix + "help"){
        message.channel.sendMessage("Voici les commandes: \n .kick @mentionner raison \n .ban @mentionner raison \n .warn @mentionner raison \n .infractions @mentionner raison \n .8ball \n .clear un nombre entre 1 et 100 \n .mute @mentionner raison");
    }
})

    if (message.content === prefix +"Fondateur de bot")
        message.channel.sendMessage("Mon créateur et le magnifique savasava !")
 
client.on('message', message =>{
    if(message.content === "tu fais quoi?"){
        message.reply('ok');
        console.log('répond à tfq');
    }
});

client.on('guildMemberAdd', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription('Coucou gros chien bienvenue **' + member.user.username + '** a rejoint ' + member.guild.name)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('528930989901217795').send(embed)
 
});
 
client.on('guildMemberRemove', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':o ba non pars pas comme ca: **' + member.user.username + '** a quitté ' + member.guild.name)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('528930989901217795').send(embed)
 
});

/*Kick*/
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'kick'){
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("ta juste pas la perm")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("faut mentionner qql")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
       if (!member.kickable) return message.channel.send("jpeux pas le kick")
       member.kick()
       message.channel.send("**"+member.user.username + '** a été exclu :white_check_mark:')
    }
});
 
/*Ban*/
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban'){
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("ba non ta pas la perm ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("MENTIONNE QQL")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.send("JPEUX PAS LE BAN")
       message.guild.ban(member, {days: 7})
       message.channel.send("**"+member.user.username + '** a été banni :white_check_mark:')
    }
});

const warns = JSON.parse(fs.readFileSync('./warns.json'))
 
client.login(require("./token.json"))
 
client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "warn") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("ba non ta pas la perm")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("MENTIONNE QQL")
        if (member.highestRole.comparePositionTo(message.member.highestRole) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas warn ce membre")
        let reason = args.slice(2).join(' ')
        if (!reason) return message.channel.send("et donc c'est quoi la raison ?")
        if (!warns[member.id]) {
            warns[member.id] = []
        }
        warns[member.id].unshift({
            reason: reason,
            date: Date.now(),
            mod: message.author.id
        })
        fs.writeFileSync('./warns.json', JSON.stringify(warns))
        message.channel.send(member + " a été warn pour " + reason + " :white_check_mark:")
    }
 
    if (args[0].toLowerCase() === prefix + "infractions") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("ba non ta pas la perm")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("MENTIONNE QQL")
        let embed = new Discord.RichEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL)
            .addField('10 derniers warns', ((warns[member.id]) ? warns[member.id].slice(0, 10).map(e => e.reason) : "il n'a pas de warn gg a lui"))
            .setTimestamp()
        message.channel.send(embed)
    }
})

client.on('ready', function () {
    console.log('Bot ON')
})
 
client.on('message',message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
   
    if (args[0].toLocaleLowerCase() === prefix + '8ball'){
        if (!args[0]) return message.channel.send("Veuillez **poser une question**")
        let rep = ["et tu veux pas fermer ta geule", "j'ai meme pas envie de te répondre","chepa gros", "c'est un gros chien", "bz ta soeur mdr", "enft nan", "juste oui", "MAIS NAAAAAAAAAAAAAN", "tg stp", "exao la pute", "le bot bibou c'est le meilleur", " pk", "arrete"];
        let reptaille = Math.floor((Math.random() * rep.length));
        let question = args.slice(0).join(" ");
 
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag)
            .setColor("ORANGE")
            .addField("Question:", question)
            .addField("Réponse:", rep[reptaille]);
        message.channel.send(embed)
    }
})

client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("ba non ta pas la perm")
        let count = args[1]
        if (!count) return message.channel.send("tu veux supprimer combien de message")
        if (isNaN(count)) return message.channel.send("nan mais jte demande un nombre valide enft")
        if (count < 1 || count > 500) return message.channel.send("indique un nombre entre 1 et 500")
        message.channel.bulkDelete(parseInt(count) + 1)
    }
 
    if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("ba non ta pas la perm")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Membre introuvable")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas mute ce membre")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + ' a été mute :white_check_mark:')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then((role) => {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' a été mute :white_check_mark:')
            })
        }
    }
})

client.on('message', message =>{
    if(message.content === "coucou"){
        message.reply('salusava le sang dla veine');
        console.log('répond à coucou');
    }})

client.on('message', message =>{
        if(message.content === "gros chien"){
            message.reply('TU VEUX QUOI');
            console.log('répond à gros chien');
    }})

    client.on('message', message =>{
        if(message.content === "ta mere"){
            message.reply('ba non');
            console.log('répond à ta mere');
    }})

    client.on('message', message =>{
        if(message.content === "salusava"){
            message.reply('savaettwa');
            console.log('répond à salusava');
    }})

    client.on('message', message =>{
        if(message.content === "pk"){
            message.reply('chepa');
            console.log('répond à pk');
    }})

    client.on('message', message =>{
        if(message.content === "gaudin"){
            message.reply('la pute');
            console.log('répond à gaudin');
    }})

    client.on('message', message =>{
        if(message.content === "ba non"){
            message.reply('ba');
            console.log('répond à ba non');
    }})

    client.on('message', message =>{
        if(message.content === "coeur jaune"){
            message.reply('CE SOIR TA PLUS DMERE');
            console.log('répond à coeur jaune');
    }})

    client.on('message', message =>{
        if(message.content === "tu fais quoi"){
            message.reply('mais nan !');
            console.log('répond à tu fais quoi');
    }})

    client.on('message', message =>{
        if(message.content === "comment"){
            message.reply('meme moi chepa');
            console.log('répond à tfq');
    }})

    client.on('message', message =>{
        if(message.content === "g plu dinspi"){
            message.reply('moi aussi');
            console.log('répond à g plu dinspi');
    }})

    client.on('message', message =>{
        if(message.content === "jte jure"){
            message.reply('si tu me jure alors');
            console.log('répond à jte jure');
    }})

    client.on('message', message =>{
        if(message.content === "g pa dami"){
            message.reply('oui mdr sale merde :heart:');
            console.log('répond à g pa dami');
    }})

    client.on('message', message =>{
        if(message.content === ":heart:"){
            message.reply('gros chien de gay de merde');
            console.log('répond à :heart:');
    }})

    client.on('message', message =>{
        if(message.content === "ok"){
            message.reply('tg');
            console.log('répond à ok');
    }})

    client.on('message', message =>{
        if(message.content === "aled"){
            message.reply('zariv mon cop1');
            console.log('répond à aled');
    }})

    client.on('message', message =>{
        if(message.content === "A"){
            message.reply('jsui mort');
            console.log('répond à A');
    }})

    client.on('message', message =>{
        if(message.content === "B"){
            message.reply('t pa drol.');
            console.log('répond à B');
    }})

    client.on('message', message =>{
        if(message.content === "ca boom"){
            message.reply('tu peux arreter de parler stp merci');
            console.log('répond à ca boom');
    }})

    client.on('message', message =>{
        if(message.content === "I LOVE YOU JACK"){
            message.reply('ME TOO I LOVE JACK');
            console.log('répond à I LOVE YOU JACK');
    }})

    client.on('message', message =>{
        if(message.content === "gg"){
            message.reply('gg');
            console.log('répond à gg');
    }})

    client.on('message', message =>{
        if(message.content === "oui et toi"){
            message.reply('savasava');
            console.log('répond à oui et toi');
    }})


    








    





