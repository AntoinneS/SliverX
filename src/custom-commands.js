 var cmds = {
     /*********************************************************
      * Informational Commands                                *
      *********************************************************/
     sh: 'servercommands',
     serverhelp: 'servercommands',
     sc: 'servercommands',
     servercommand: 'servercommands',
     servercommands: function (target, room, user) {
         if (!this.canBroadcast()) return;

         if (!target) {
             return this.sendReplyBox(
                 '/profile - See user\'s profile with infomation about money, status, location, etc. <br/>' +
                 '/stafflist - List of staff members. <br/>' +
                 '/regdate <i>name</i> - Displays registration date of a user. <br/>' +
                 '/twitchchat <i>on/off</i> - Enables Twitch Chat integration. <br/>' +
                 '/twitchgroup - Shows info about twitch groups. <br/>' +
                 '/poke <i>name</i> - Pokes a users. <br/>' +
                 '/pickrandom <i>options...</i> - Randomly picks one from the options <br/>' +
                 '/emoticons - View list of emoticons <br/>' +
                 '/earnmoney - Find out more ways to earn money <br/>' +
                 '<br/> For more help use /serverhelp <i>hangman</i>'
             );
         }
         if (target.toLowerCase() === 'tour') {
             return this.sendReplyBox(
                 "- /nt &lt;format>, &lt;type> [, &lt;comma-separated arguments>]: Creates a new tournament in the current room.<br />" +
                 "- /settype &lt;type> [, &lt;comma-separated arguments>]: Modifies the type of tournament after it's been created, but before it has started.<br />" +
                 "- /et: Forcibly ends the tournament in the current room.<br />" +
                 "- /st: Starts the tournament in the current room.<br />" +
                 "- /dq &lt;user>: Disqualifies a user.<br />" +
                 "- /remind &lt;user>: Pings the users in the tournament.<br />" +
                 "More detailed help can be found <a href=\"https://gist.github.com/kotarou3/7872574\">here</a>"
             );
         }

         if (target.toLowerCase() === 'hangman') {
             return this.sendReplyBox('<font size = 2>A brief introduction to </font><font size = 3>Hangman:</font><br />' +
                 'The classic game, the basic idea of hangman is to guess the word that someone is thinking of before the man is "hanged." Players are given 8 guesses before this happens.<br />' +
                 'Games can be started by any of the rank Voice or higher, including Room Voice, Room Mod, and Room Owner.<br />' +
                 'The commands are:<br />' +
                 '<ul><li>/hangman <em>word</em>, <em>description</em> - Starts the game of hangman, with a specified word and a general category. Requires: + % @ & ~</li>' +
                 '<li>/guess <em>letter</em> - Guesses a letter.</li>' +
                 '<li>/guessword <em>word</em> - Guesses a word.</li>' +
                 '<li>/viewhangman - Shows the current status of hangman. Can be broadcasted.</li>' +
                 '<li>/word - Allows the person running hangman to view the word.</li>' +
                 '<li>/category <em>description</em> OR /topic <em>description</em> - Allows the person running hangman to changed the topic.</li>' +
                 '<li>/endhangman - Ends the game of hangman in the room. Requires: + % @ & ~</li></ul>');
         } 
		 /* if(target === 'techsupport' || target === 'support') {
		 return this.sendReplyBox('<h1>Tech Support</h1><br />' +
		 '<h3>Rank 3 Support - Developers</h3><hr /><br />' +
		 '<b>iFaZe<b> - Custom Styles, Trainer Cards, Commands<br />' +
		 '<b>Bandi<b> - Custom Styles, Bot, Tournament edits, Other<br />' +
		 '<b>CreaturePhil<b> - Twitch Chat, Bot, Commands, Other<br />' +
		 
		 );
		 }*/ else {

             return this.sendReply('Could not find ' + target + '.');
         }
     },
     stafflist: function (target, room, user, connection) {
         var buffer = [];
         var admins = [];
         var leaders = [];
         var mods = [];
         var drivers = [];
         var voices = [];

         admins2 = '';
         leaders2 = '';
         mods2 = '';
         drivers2 = '';
         voices2 = '';
         stafflist = fs.readFileSync('config/usergroups.csv', 'utf8');
         stafflist = stafflist.split('\n');
         for (var u in stafflist) {
             line = stafflist[u].split(',');
             if (line[1] == '~') {
                 admins2 = admins2 + line[0] + ',';
             }
             if (line[1] == '&') {
                 leaders2 = leaders2 + line[0] + ',';
             }
             if (line[1] == '@') {
                 mods2 = mods2 + line[0] + ',';
             }
             if (line[1] == '%') {
                 drivers2 = drivers2 + line[0] + ',';
             }
             if (line[1] == '+') {
                 voices2 = voices2 + line[0] + ',';
             }
         }
         admins2 = admins2.split(',');
         leaders2 = leaders2.split(',');
         mods2 = mods2.split(',');
         drivers2 = drivers2.split(',');
         voices2 = voices2.split(',');
         for (var u in admins2) {
             if (admins2[u] != '') admins.push(admins2[u]);
         }
         for (var u in leaders2) {
             if (leaders2[u] != '') leaders.push(leaders2[u]);
         }
         for (var u in mods2) {
             if (mods2[u] != '') mods.push(mods2[u]);
         }
         for (var u in drivers2) {
             if (drivers2[u] != '') drivers.push(drivers2[u]);
         }
         for (var u in voices2) {
             if (voices2[u] != '') voices.push(voices2[u]);
         }
         if (admins.length > 0) {
             admins = admins.join(', ');
         }
         if (leaders.length > 0) {
             leaders = leaders.join(', ');
         }
         if (mods.length > 0) {
             mods = mods.join(', ');
         }
         if (drivers.length > 0) {
             drivers = drivers.join(', ');
         }
         if (voices.length > 0) {
             voices = voices.join(', ');
         }
         connection.popup('Administrators: \n--------------------\n' + admins + '\n\nLeaders:\n-------------------- \n' + leaders + '\n\nModerators:\n-------------------- \n' + mods + '\n\nDrivers: \n--------------------\n' + drivers + '\n\nVoices:\n-------------------- \n' + voices);
     },
     emoticons: function (target, room, user) {
         if (!this.canBroadcast()) return;
         return this.sendReplyBox(
             '<b><u>Emoticons are case-sensitive:</b></u> <br/>' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ebf60cd72f7aa600-24x18.png">:) ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ae4e17f5b9624e2f-24x18.png">:O ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-d570c4b3b8d8fc4d-24x18.png">:( ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-cfaf6eac72fe4de6-24x18.png">;) ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-e838e5e34d9f240c-24x18.png">:P ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-374120835234cb29-24x18.png">:/ ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3407bf911ad2fd4a-24x18.png">;P ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-2cde79cfe74c6169-24x18.png">B) ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-8e128fa8dc1de29c-24x18.png">O_o ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-0536d670860bf733-24x18.png">R) ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-9f2ac5d4b53913d7-24x18.png">:D ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-b9cbb6884788aa62-24x18.png">:z ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-f124d3a96eff228a-41x28.png">BloodTrail ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-f6c13c7fc0a5c93d-36x30.png">BibleThump ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-76292ac622b0fc38-20x30.png"> 4Head ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ddc6e3a8732cb50f-25x28.png">Kappa ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-60aa1af305e32d49-23x30.png">PogChamp ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1ddcc54d77fc4a61-28x28.png">ResidentSleeper ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-3227-src-77d12eca2603dde0-28x28.png">crtNova ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-3228-src-d4b613767d7259c4-28x28.png">crtSSoH ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-5d019b356bd38360-24x24.png">SSSsss ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-680b6b3887ef0d17-21x28.png">SwiftRage ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ce52b18fccf73b29-25x32.png">DansGame ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3a624954918104fe-19x27.png">Kreygasm ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-c8a77ec0c49976d3-22x30.png">FailFish ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-10413-src-9e30fb4e8b42c21a-28x28.png">pikaQQ ' +
             '<img src="http://e.deviantart.net/emoticons/n/ninja.gif">:ninja: ' +
             '<img src="http://e.deviantart.net/emoticons/k/katana.gif">:katana: ' +
             '<img src="http://e.deviantart.net/emoticons/n/ninjabattle.gif">:ninjabattle: ' +
             '<img src="http://e.deviantart.net/emoticons/j/jawdrop.gif">:jawdrop:' +
			 '<img src="https://s.yimg.com/lq/i/mesg/emoticons7/19.gif">:devil:' +
			 '<img src="http://e.deviantart.net/emoticons/h/heart.gif">:heart:' +
			 '<img src="https://s.yimg.com/lq/i/mesg/emoticons7/46.gif">:sigh:' +
			 '<img src="http://www.sherv.net/cm/emo/lol/moving-lol.gif">LOL' +
			 '<img src="http://e.deviantart.net/emoticons/t/tears.gif">:cry:' +
			 '<img src="http://e.deviantart.net/emoticons/l/lmao.gif">:lmao: ' +
			 '<img src="http://e.deviantart.net/emoticons/a/above.gif">^' +
             '<img src="http://e.deviantart.net/emoticons/h/hump.gif">:hump:'
         );
     },

     groups: function (target, room, user) {
         if (!this.canBroadcast()) return;
         this.sendReplyBox('+ <b>Voice</b> - They can use ! commands like !groups, and talk during moderated chat<br />' +
             '% <b>Driver</b> - The above, and they can mute. Global % can also lock users and check for alts<br />' +
             '@ <b>Moderator</b> - The above, and they can ban users<br />' +
             '&amp; <b>Leader</b> - The above, and they can promote to moderator and force ties<br />' +
             '~ <b>Administrator</b> - They can do anything, like change what this message says<br />' +
             '± <b>Nova Bot</b> - This is the server itself that auto moderates chats and tells jokes<br />' +
             '# <b>Room Owner</b> - They are administrators of the room and can almost totally control it');
     },

     regdate: function (target, room, user, connection) {
         if (!this.canBroadcast()) return;
         if (!target || target == "." || target == "," || target == "'") return this.sendReply('/regdate - Please specify a valid username.');
         var username = sanitize(target);
         target = target.replace(/\s+/g, '');
         var util = require("util"),
             http = require("http");

         var options = {
             host: "www.pokemonshowdown.com",
             port: 80,
             path: "/forum/~" + target
         };

         var content = "";
         var self = this;
         var req = http.request(options, function (res) {

             res.setEncoding("utf8");
             res.on("data", function (chunk) {
                 content += chunk;
             });
             res.on("end", function () {
                 content = content.split("<em");
                 if (content[1]) {
                     content = content[1].split("</p>");
                     if (content[0]) {
                         content = content[0].split("</em>");
                         if (content[1]) {
                             regdate = content[1];
                             data = username + ' was registered on' + regdate + '.';
                         }
                     }
                 } else {
                     data = username + ' is not registered.';
                 }
                 self.sendReplyBox(data);
                 room.update();
             });
         });
         req.end();
     },

     twitchgroups: function (target, room, user) {
         if (!this.canBroadcast()) return;

         return this.sendReplyBox('<img src="http://i.imgur.com/UEMY7N1.png" title="System Operator" height="14"><b>System Operator</b> - These are the people who make the server tick. Say hello!<br/><img src="http://i.imgur.com/mbdkl0w.png" title="Elite Moderator" height="14"><b>Elite Moderator</b> - Our most experienced and trustworthy moderator squad who help us keep the server safe and fun.<br/><img src="http://i.imgur.com/0IugM.png" title="Broadcaster" height="14"><b>Broadcaster</b> - This icon denotes the person whose room you\'re currently in.<br/><img src="http://i.imgur.com/Fqiyjil.png" title="Chat Moderator" height="14"><b>Chat Moderator</b> - Specifically appointed chat moderators for the server.<br/><img src="http://i.imgur.com/kZyJVgU.png" title="Turbo User" height="14"><b>Turbo User</b> - These are the people who donated or contributed to the server.');
     },
     /*********************************************************
      * Useful Commands                                       *
      *********************************************************/
      join: function(target, room, user, connection) {
		if (!target) return false;
		var targetRoom = Rooms.get(target) || Rooms.get(toId(target));
		if (!targetRoom) {
			if (target === 'lobby') return connection.sendTo(target, "|noinit|nonexistent|");
			return connection.sendTo(target, "|noinit|nonexistent|The room '"+target+"' does not exist.");
		}
		if (targetRoom.isPrivate && !user.named) {
			return connection.sendTo(target, "|noinit|namerequired|You must have a name in order to join the room '"+target+"'.");
		}
		if (!user.joinRoom(targetRoom || room, connection)) {
			return connection.sendTo(target, "|noinit|joinfailed|The room '"+target+"' could not be joined.");
		}
		if (target.toLowerCase() == "lobby") {
			return connection.sendTo('lobby','|html|<div class="broadcast-silver"><h1><center><b><u>Welcome to the Silver!</u></b></center></h1><br/><br/<center><img src="http://img834.imageshack.us/img834/5062/70785931.jpg"><br/><br/><center><b>What Can You Do Here?</b></center><hr>' +
'<center><b>Participate In Tournaments For Money And Prizes!</b></center><br>' +
'<center><b>Join Various Leagues And Clans!</b></center><br>' +
'<center><b>Our Just Hang Out And Chat</b></center><br>' +
'<center><b>If You Liked Your Experience here Make Sure To Tell Your Friends About Us!</b></center><hr><br>' +
'<center><b>For General Help For Server Commands Use /serverhelp</b></center><br>' +
'<center><b>If You Have Any Problems Pm a Staff Member, Only Serious Problems Should Be Taken To Admins (~)</b></center><hr><br>' +
'<center><a href="http://pokemonshowdown.com/rules"><button class="bluebutton" title="Rules"><font color="white"><b>Rules</b></a></button>   |   <a href="http://www.smogon.com/sim/faq"><button class="bluebutton" title="FAQs"><font color="white"><b>FAQs</b></a></button> </button></div>');
		}
	},

join: function(target, room, user, connection) {
		if (!target) return false;
		var targetRoom = Rooms.get(target) || Rooms.get(toId(target));
		if (!targetRoom) {
			if (target === 'stormsilver') return connection.sendTo(target, "|noinit|nonexistent|");
			return connection.sendTo(target, "|noinit|nonexistent|The room '"+target+"' does not exist.");
		}
		if (targetRoom.isPrivate && !user.named) {
			return connection.sendTo(target, "|noinit|namerequired|You must have a name in order to join the room '"+target+"'.");
		}
		if (!user.joinRoom(targetRoom || room, connection)) {
			return connection.sendTo(target, "|noinit|joinfailed|The room '"+target+"' could not be joined.");
		}
		if (target.toLowerCase() == "stormsilver") {
			return connection.sendTo('stormsilver','|html|<div class="broadcast-silver"><h1><center><b><u>Welcome to the Storm Silver!</u></b></center></h1><br/><br/<center><img src="data:image/jpeg;base64,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"><br/><br/><center><b>What Can You Do Here & What Is A Clan?</b></center><hr>' +
'<center><b>A Clan Is Basically A Group Of People Battling For Fun And To Be The Best So Basically A League With No Gym Leaders Or Elites.</b></center><br>' +
'<center><b>Play Various Tiers</b></center><br>' +
'<center><b>Our Just Hang Out And Chat</b></center><br>' +
'<center><b>If You Liked Your Experience here Make Sure To Tell Your Friends About Us!</b></center><hr><br>' +
'<center><b>Battle Among Your Clan Members and Go Against Other Clans</b></center><br>' +
'<center><a href="http://pokemonshowdown.com/rules"><button class="bluebutton" title="Rules"><font color="white"><b>Rules</b></a></button>   |   <a href="http://www.smogon.com/sim/faq"><button class="bluebutton" title="FAQs"><font color="white"><b>FAQs</b></a></button> </button></div>');
		}
	},
	
	/*********************************************************
	 * Shop commands
	 *********************************************************/

	createpoints: function(target, room, user, connection) {
		if(!user.can('hotpatch')) return this.sendReply('You do not have enough authority to do this.');
		fs.exists('config/money.csv', function (exists) {
			if(exists){
				return connection.sendTo(room, 'Since this file already exists, you cannot do this.');
			} else {
				fs.writeFile('config/money.csv', 'badsteel,10000', function (err) {
					if (err) throw err;
					console.log('config/money.csv created.');
					connection.sendTo(room, 'config/money.csv created.');
				});
			}
		});
	},

	wallet: 'atm',
	satchel: 'atm',
	fannypack: 'atm',
	purse: 'atm',
	bag: 'atm',
	atm: function(target, room, user, connection, cmd) {
	if (!this.canBroadcast()) return;
	var cMatch = false;
	var mMatch = false;
	var money = 0;
	var coins = 0;
	var total = '';
	if (!target) {
	var data = fs.readFileSync('config/money.csv','utf8')
		var row = (''+data).split("\n");
		for (var i = row.length; i > -1; i--) {
			if (!row[i]) continue;
			var parts = row[i].split(",");
			var userid = toUserid(parts[0]);
			if (user.userid == userid) {
			var x = Number(parts[1]);
			var money = x;
			mMatch = true;
			if (mMatch === true) {
				break;
			}
			}
		}
		if (mMatch === true) {
			var p = 'bucks';
			if (money < 2) p = 'buck';
			total += user.name + ' has ' + money + ' ' + p + '.<br />';
		}
		if (mMatch === false) {
			total += 'You have no bucks.<br />';
		}
		user.money = money;
		var data = fs.readFileSync('config/coins.csv','utf8')
		var row = (''+data).split("\n");
		for (var i = row.length; i > -1; i--) {
			if (!row[i]) continue;
			var parts = row[i].split(",");
			var userid = toUserid(parts[0]);
			if (user.userid == userid) {
			var x = Number(parts[1]);
			var coins = x;
			cMatch = true;
			if (cMatch === true) {
				break;
			}
			}
		}
		if (cMatch === true) {
			var p = 'coins';
			if (coins < 2) p = 'coin';
			total += user.name + ' has ' + coins + ' ' + p + '.'
		}
		if (cMatch === false) {
			total += 'You have no coins.'
		}
		user.coins = coins;
	} else {
		var data = fs.readFileSync('config/money.csv','utf8')
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!targetUser) {
			return this.sendReply('User '+this.targetUsername+' not found.');
		}
		var money = 0;
		var row = (''+data).split("\n");
		for (var i = row.length; i > -1; i--) {
			if (!row[i]) continue;
			var parts = row[i].split(",");
			var userid = toUserid(parts[0]);
			if (targetUser.userid == userid || target == userid) {
			var x = Number(parts[1]);
			var money = x;
			mMatch = true;
			if (mMatch === true) {
				break;
			}
			}
		}
		if (mMatch === true) {
			var p = 'bucks';
			if (money < 2) p = 'buck';
			total += targetUser.name + ' has ' + money + ' ' + p + '.<br />';
		}
		if (mMatch === false) {
			total += targetUser.name + ' has no bucks.<br />';
		}
		targetUser.money = money;
		var data = fs.readFileSync('config/coins.csv','utf8')
		var coins = 0;
		var row = (''+data).split("\n");
		for (var i = row.length; i > -1; i--) {
			if (!row[i]) continue;
			var parts = row[i].split(",");
			var userid = toUserid(parts[0]);
			if (targetUser.userid == userid || target == userid) {
			var x = Number(parts[1]);
			var coins = x;
			cMatch = true;
			if (cMatch === true) {
				break;
			}
			}
		}
		if (cMatch === true) {
			var p = 'coins';
			if (coins < 2) p = 'coin';
			total += targetUser.name + ' has ' + coins + ' ' + p + '.<br />';
		}
		if (cMatch === false) {
			total += targetUser.name + ' has no coins.<br />';
		}
		targetUser.coins = coins;
	}
	return this.sendReplyBox(total);
	},

	awardbucks: 'givebucks',
	gb: 'givebucks',
	givebucks: function(target, room, user) {
		if(!user.can('hotpatch')) return this.sendReply('You do not have enough authority to do this.');
		if(!target) return this.parse('/help givebucks');
		if (target.indexOf(',') != -1) {
			var parts = target.split(',');
			parts[0] = this.splitTarget(parts[0]);
			var targetUser = this.targetUser;
		if (!targetUser) {
			return this.sendReply('User '+this.targetUsername+' not found.');
		}
		if (isNaN(parts[1])) {
			return this.sendReply('Very funny, now use a real number.');
		}
		var cleanedUp = parts[1].trim();
		var giveMoney = Number(cleanedUp);
		var data = fs.readFileSync('config/money.csv','utf8')
		var match = false;
		var money = 0;
		var line = '';
		var row = (''+data).split("\n");
		for (var i = row.length; i > -1; i--) {
			if (!row[i]) continue;
			var parts = row[i].split(",");
			var userid = toUserid(parts[0]);
			if (targetUser.userid == userid) {
			var x = Number(parts[1]);
			var money = x;
			match = true;
			if (match === true) {
				line = line + row[i];
				break;
			}
			}
		}
		targetUser.money = money;
		targetUser.money += giveMoney;
		if (match === true) {
			var re = new RegExp(line,"g");
			fs.readFile('config/money.csv', 'utf8', function (err,data) {
			if (err) {
				return console.log(err);
			}
			var result = data.replace(re, targetUser.userid+','+targetUser.money);
			fs.writeFile('config/money.csv', result, 'utf8', function (err) {
				if (err) return console.log(err);
			});
			});
		} else {
			var log = fs.createWriteStream('config/money.csv', {'flags': 'a'});
			log.write("\n"+targetUser.userid+','+targetUser.money);
		}
		var p = 'bucks';
		if (giveMoney < 2) p = 'buck';
		this.sendReply(targetUser.name + ' was given ' + giveMoney + ' ' + p + '. This user now has ' + targetUser.money + ' bucks.');
		targetUser.send(user.name + ' has given you ' + giveMoney + ' ' + p + '.');
		} else {
			return this.parse('/help givebucks');
		}
	},

	takebucks: 'removebucks',
	removebucks: function(target, room, user) {
		if(!user.can('hotpatch')) return this.sendReply('You do not have enough authority to do this.');
		if(!target) return this.parse('/help removebucks');
		if (target.indexOf(',') != -1) {
			var parts = target.split(',');
			parts[0] = this.splitTarget(parts[0]);
			var targetUser = this.targetUser;
		if (!targetUser) {
			return this.sendReply('User '+this.targetUsername+' not found.');
		}
		if (isNaN(parts[1])) {
			return this.sendReply('Very funny, now use a real number.');
		}
		var cleanedUp = parts[1].trim();
		var takeMoney = Number(cleanedUp);
		var data = fs.readFileSync('config/money.csv','utf8')
		var match = false;
		var money = 0;
		var line = '';
		var row = (''+data).split("\n");
		for (var i = row.length; i > -1; i--) {
			if (!row[i]) continue;
			var parts = row[i].split(",");
			var userid = toUserid(parts[0]);
			if (targetUser.userid == userid) {
			var x = Number(parts[1]);
			var money = x;
			match = true;
			if (match === true) {
				line = line + row[i];
				break;
			}
			}
		}
		targetUser.money = money;
		targetUser.money -= takeMoney;
		if (match === true) {
			var re = new RegExp(line,"g");
			fs.readFile('config/money.csv', 'utf8', function (err,data) {
			if (err) {
				return console.log(err);
			}
			var result = data.replace(re, targetUser.userid+','+targetUser.money);
			fs.writeFile('config/money.csv', result, 'utf8', function (err) {
				if (err) return console.log(err);
			});
			});
		} else {
			var log = fs.createWriteStream('config/money.csv', {'flags': 'a'});
			log.write("\n"+targetUser.userid+','+targetUser.money);
		}
		var p = 'bucks';
		if (takeMoney < 2) p = 'buck';
		this.sendReply(targetUser.name + ' has had ' + takeMoney + ' ' + p + ' removed. This user now has ' + targetUser.money + ' bucks.');
		targetUser.send(user.name + ' has removed ' + takeMoney + ' bucks from you.');
		} else {
			return this.parse('/help removebucks');
		}
	},

	buy: function(target, room, user) {
		if (!target) return this.parse('/help buy');
		if (closeShop) return this.sendReply('The shop is currently closed and will open shortly.');
		var target2 = target;
		var target3 = target;
		target = target.split(', ');
		var avatar = '';
		var voice = '';
		var data = fs.readFileSync('config/money.csv','utf8')
		var match = false;
		var money = 0;
		var line = '';
		var row = (''+data).split("\n");
		for (var i = row.length; i > -1; i--) {
			if (!row[i]) continue;
			var parts = row[i].split(",");
			var userid = toUserid(parts[0]);
			if (user.userid == userid) {
			var x = Number(parts[1]);
			var money = x;
			match = true;
			if (match === true) {
				line = line + row[i];
				break;
			}
			}
		}
		user.money = money;
		var price = 0;
		if (target2 === 'symbol') {
			price = 5;
			if (price <= user.money) {
				user.money = user.money - price;
				this.sendReply('You have purchased a custom symbol. You will have this until you log off for more than an hour.');
				this.sendReply('Use /customsymbol [symbol] to change your symbol now!');
				user.canCustomSymbol = true;
				this.add(user.name + ' has purchased a custom symbol!');
			} else {
				return this.sendReply('You do not have enough bucks for this. You need ' + (price - user.money) + ' more bucks to buy ' + target + '.');
			}
		}
		if (target[0] === 'custom') {
			price = 15;
			if (price <= user.money) {
				if (!target[1]) return this.sendReply('Please specify the avatar you would like you buy. It has a maximum size of 80x80 and must be in .png format. ex: /buy custom, [url to the avatar]');
       				var filename = target[1].split('.');
				filename = '.'+filename.pop();
				if (filename != ".png") return this.sendReply('Your avatar must be in .png format.');
				user.money = user.money - price;
				this.sendReply('You have purchased a custom avatar. Staff have been notified and it will be added in due time.');
				user.canCustomAvatar = true;
				Rooms.rooms.staff.add(user.name+' has purchased a custom avatar. Image: '+target[1]);
				for (var u in Users.users) {
					if (Users.users[u].group == "~" || Users.users[u].group == "&") {
						Users.users[u].send('|pm|~Server|'+Users.users[u].group+Users.users[u].name+'|'+user.name+' has purchased a custom avatar. Image: '+target[1]);
					}
				}
			} else {
				return this.sendReply('You do not have enough bucks for this. You need ' + (price - user.money) + ' more bucks to buy ' + target + '.');
			}
		}
		if (target[0] === 'animated') {
			price = 25;
			if (price <= user.money) {
				if (!target[1]) return this.sendReply('Please specify the avatar you would like you buy. It has a maximum size of 80x80 and must be in .gif format. ex: /buy animated, [url to the avatar]');
       				var filename = target[1].split('.');
				filename = '.'+filename.pop();
				if (filename != ".gif") return this.sendReply('Your avatar must be in .gif format.');
				user.money = user.money - price;
				this.sendReply('You have purchased a custom animated avatar. Staff have been notified and it will be added in due time.');
				user.canAnimatedAvatar = true;
				Rooms.rooms.staff.add(user.name+' has purchased a custom animated avatar. Image: '+target[1]);
				for (var u in Users.users) {
					if (Users.users[u].group == "~" || Users.users[u].group == "&") {
						Users.users[u].send('|pm|~Server|'+Users.users[u].group+Users.users[u].name+'|'+user.name+' has purchased a custom animated avatar. Image: '+target[1]);
					}
				}
			} else {
				return this.sendReply('You do not have enough bucks for this. You need ' + (price - user.money) + ' more bucks to buy ' + target + '.');
			}
		}
		if (target[0] === 'room') {
			price = 80;
			if (price <= user.money) {
				user.money = user.money - price;
				this.sendReply('You have purchased a chat room. You need to message an Admin so that the room can be made.');
				user.canChatRoom = true;
				this.add(user.name + ' has purchased a chat room!');
			} else {
				return this.sendReply('You do not have enough bucks for this. You need ' + (price - user.money) + ' more bucks to buy ' + target + '.');
			}
		}
		if (target2 === 'trainer') {
			price = 30;
			if (price <= user.money) {
				user.money = user.money - price;
				this.sendReply('You have purchased a trainer card. You need to message an Admin capable of adding this (Storm Developer or Cometstorm).');
				user.canTrainerCard = true;
				this.add(user.name + ' has purchased a trainer card!');
			} else {
				return this.sendReply('You do not have enough bucks for this. You need ' + (price - user.money) + ' more bucks to buy ' + target + '.');
			}
		}
		if (target2 === 'fix') {
			price = 10;
			if (price <= user.money) {
				user.money = user.money - price;
				this.sendReply('You have purchased the ability to alter your avatar or trainer card. You need to message an Admin capable of adding this (Storm Developer or Cometstorm).');
				user.canFixItem = true;
				this.add(user.name + ' has purchased the ability to set alter their card or avatar!');
			} else {
				return this.sendReply('You do not have enough bucks for this. You need ' + (price - user.money) + ' more bucks to buy ' + target + '.');
			}
		}
		if (target2 === 'declare') {
			price = 25;
			if (price <= user.money) {
				user.money = user.money - price;
				this.sendReply('You have purchased the ability to declare (from Admin). To do this message an Admin (~) with the message you want to send. Keep it sensible!');
				user.canDecAdvertise = true;
				this.add(user.name + ' has purchased the ability to declare from an Admin!');
			} else {
				return this.sendReply('You do not have enough bucks for this. You need ' + (price - user.money) + ' more bucks to buy ' + target + '.');
			}
		}
		if (match === true) {
			var re = new RegExp(line,"g");
			fs.readFile('config/money.csv', 'utf8', function (err,data) {
			if (err) {
				return console.log(err);
			}
			var result = data.replace(re, user.userid+','+user.money);
			fs.writeFile('config/money.csv', result, 'utf8', function (err) {
				if (err) return console.log(err);
			});
			});
		}
	},

	customsymbol: function(target, room, user) {
		if(!user.canCustomSymbol) return this.sendReply('You need to buy this item from the shop to use.');
		if(!target || target.length > 1) return this.sendReply('/customsymbol [symbol] - changes your symbol (usergroup) to the specified symbol. The symbol can only be one character');
		var a = target;
		if (a === "+" || a === "$" || a === "%" || a === "@" || a === "&" || a === "~" || a === "#" || a === "a" || a === "b" || a === "c" || a === "d" || a === "e" || a === "f" || a === "g" || a === "h" || a === "i" || a === "j" || a === "k" || a === "l" || a === "m" || a === "n" || a === "o" || a === "p" || a === "q" || a === "r" || a === "s" || a === "t" || a === "u" || a === "v" || a === "w" || a === "x" || a === "y" || a === "z" || a === "0" || a === "1" || a === "2" || a === "3" || a === "4" || a === "5" || a === "6" || a === "7" || a === "8" || a === "9" ) {
			return this.sendReply('Sorry, but you cannot change your symbol to this for safety/stability reasons.');
		}
		user.getIdentity = function(){
			if(this.muted)	return '!' + this.name;
			if(this.locked) return '‽' + this.name;
			return target + this.name;
		};
		user.updateIdentity();
		user.canCustomSymbol = false;
		user.hasCustomSymbol = true;
	},

	shop: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<center><h4><b><u>Silver Bucks Shop</u></b></h4><table border="1" cellspacing ="0" cellpadding="3"><tr><th>Command</th><th>Description</th><th>Cost</th></tr>' +
			'<tr><td>Symbol</td><td>Buys a custom symbol to go infront of name and puts you at top of userlist (temporary until restart)</td><td>5</td></tr>' +
			'<tr><td>Custom</td><td>Buys a custom avatar to be applied to your name (you supply)</td><td>15</td></tr>' +
			'<tr><td>Animated</td><td>Buys an animated avatar to be applied to your name (you supply)</td><td>25</td></tr>' +
			'<tr><td>Room</td><td>Buys a chatroom for you to own (within reason, can be refused)</td><td>80</td></tr>' +
			'<tr><td>Trainer</td><td>Buys a trainer card which shows information through a command such as /badsteel (note: third image costs 10 bucks extra, ask for more details)</td><td>40</td></tr>' +
			'<tr><td>Fix</td><td>Buys the ability to alter your current custom avatar or trainer card (don\'t buy if you have neither)!</td><td>10</td></tr>' +
			'<tr><td>Declare</td><td>You get the ability to get two declares from an Admin in lobby. This can be used for league or room advertisement (not server)</td><td>25</td></tr>' +
			'</table><br />To buy an item from the shop, use /buy [command]. <br />Also do /moneycommands to view money based commands.<br /> Bucks are not transferable among alts.</center>');
		global.closeShop = global.closeShop || false;
		if (closeShop) return this.sendReply('|raw|<center><h3><b>The shop is currently closed and will open shortly.</b></h3></center>');
	},

	lockshop: 'closeshop',
	closeshop: function(target, room, user) {
		if (!user.can('hotpatch')) return this.sendReply('You do not have enough authority to do this.');

		if(closeShop && closedShop === 1) closedShop--;

		if (closeShop) {
			return this.sendReply('The shop is already closed. Use /openshop to open the shop to buyers.');
		}
		else if (!closeShop) {
			if (closedShop === 0) {
				this.sendReply('Are you sure you want to close the shop? People will not be able to buy anything. If you do, use the command again.');
				closedShop++;
			}
			else if (closedShop === 1) {
				closeShop = true;
				closedShop--;
				this.add('|raw|<center><h4><b>The shop has been temporarily closed, during this time you cannot buy items.</b></h4></center>');
			}
		}
	},

	openshop: function(target, room, user) {
		if (!user.can('hotpatch')) return this.sendReply('You do not have enough authority to do this.');

		if (!closeShop && closedShop === 1) closedShop--;

		if (!closeShop) {
			return this.sendRepy('The shop is already closed. Use /closeshop to close the shop to buyers.');
		}
		else if (closeShop) {
			if (closedShop === 0) {
				this.sendReply('Are you sure you want to open the shop? People will be able to buy again. If you do, use the command again.');
				closedShop++;
			}
			else if (closedShop === 1) {
				closeShop = false;
				closedShop--;
				this.add('|raw|<center><h4><b>The shop has been opened, you can now buy from the shop.</b></h4></center>');
			}
		}
	},

	shoplift: 'awarditem',
	giveitem: 'awarditem',
	awarditem: function(target, room, user) {
		if (!target) return this.parse('/help awarditem');
		if(!user.can('hotpatch')) return this.sendReply('You do not have enough authority to do this.');

		target = this.splitTarget(target);
		var targetUser = this.targetUser;

		if (!target) return this.parse('/help awarditem');
		if (!targetUser) {
			return this.sendReply('User '+this.targetUsername+' not found.');
		}

		var matched = false;
		var isItem = false;
		var theItem = '';
		for (var i = 0; i < inShop.length; i++) {
			if (target.toLowerCase() === inShop[i]) {
				isItem = true;
				theItem = inShop[i];
			}
		}
		if (isItem === true) {
			if (theItem === 'symbol') {
				if (targetUser.canCustomSymbol === true) {
					return this.sendReply('This user has already bought that item from the shop... no need for another.');
				}
				if (targetUser.canCustomSymbol === false) {
					matched = true;
					this.sendReply(targetUser.name + ' can now use /customsymbol to get a custom symbol.');
					targetUser.canCustomSymbol = true;
					Rooms.rooms.lobby.add(user.name + ' has stolen custom symbol from the shop!');
					targetUser.send(user.name + ' has given you ' + theItem + '! Use /customsymbol [symbol] to add the symbol!');
				}
			}
			if (theItem === 'custom') {
				if (targetUser.canCustomAvatar === true) {
					return this.sendReply('This user has already bought that item from the shop... no need for another.');
				}
				if (targetUser.canCustomAvatar === false) {
					matched = true;
					targetUser.canCustomSymbol = true;
					Rooms.rooms.lobby.add(user.name + ' has stolen a custom avatar from the shop!');
					targetUser.send(user.name + ' has given you ' + theItem + '!');
				}
			}
			if (theItem === 'animated') {
				if (targetUser.canAnimated === true) {
					return this.sendReply('This user has already bought that item from the shop... no need for another.');
				}
				if (targetUser.canCustomAvatar === false) {
					matched = true;
					targetUser.canCustomAvatar = true;
					Rooms.rooms.lobby.add(user.name + ' has stolen a custom avatar from the shop!');
					targetUser.send(user.name + ' has given you ' + theItem + '!');
				}
			}
			if (theItem === 'room') {
				if (targetUser.canChatRoom === true) {
					return this.sendReply('This user has already bought that item from the shop... no need for another.');
				}
				if (targetUser.canChatRoom === false) {
					matched = true;
					targetUser.canChatRoom = true;
					Rooms.rooms.lobby.add(user.name + ' has stolen a chat room from the shop!');
					targetUser.send(user.name + ' has given you ' + theItem + '!');
				}
			}
			if (theItem === 'trainer') {
				if (targetUser.canTrainerCard === true) {
					return this.sendReply('This user has already bought that item from the shop... no need for another.');
				}
				if (targetUser.canTrainerCard === false) {
					matched = true;
					targetUser.canTrainerCard = true;
					Rooms.rooms.lobby.add(user.name + ' has stolen a trainer card from the shop!');
					targetUser.send(user.name + ' has given you ' + theItem + '!');
				}
			}
			if (theItem === 'fix') {
				if (targetUser.canFixItem === true) {
					return this.sendReply('This user has already bought that item from the shop... no need for another.');
				}
				if (targetUser.canFixItem === false) {
					matched = true;
					targetUser.canFixItem = true;
					Rooms.rooms.lobby.add(user.name + ' has stolen the ability to alter a current trainer card or avatar from the shop!');
					targetUser.send(user.name + ' has given you the ability to set ' + theItem + '!');
				}
			}
			if (theItem === 'voice') {
				if (targetUser.canBeVoice === true) {
					return this.sendReply('This user has already bought that item from the shop... no need for another.');
				}
				if (targetUser.canBeVoice === false) {
					matched = true;
					targetUser.canBeVoice = true;
					Rooms.rooms.lobby.add(user.name + ' has stolen Global Voice from the shop!');
					targetUser.send(user.name + ' has given you Global ' + theItem + '!');
				}
			}
			if (theItem === 'declare') {
				if (targetUser.canDecAdvertise === true) {
					return this.sendReply('This user has already bought that item from the shop... no need for another.');
				}
				if (targetUser.canDecAdvertise === false) {
					matched = true;
					targetUser.canDecAdvertise = true;
					Rooms.rooms.lobby.add(user.name + ' has stolen the ability to get a declare from the shop!');
					targetUser.send(user.name + ' has given you the ability to set ' + theItem + '!');
				}
			}
			else
				if (!matched) return this.sendReply('Maybe that item isn\'t in the shop yet.');
		}
		else
			return this.sendReply('Shop item could not be found, please check /shop for all items - ' + theItem);
	},

	removeitem: function(target, room, user) {
		if (!target) return this.parse('/help removeitem');
		if(!user.can('hotpatch')) return this.sendReply('You do not have enough authority to do this.');

		target = this.splitTarget(target);
		var targetUser = this.targetUser;

		if (!target) return this.parse('/help removeitem');
		if (!targetUser) {
			return this.sendReply('User '+this.targetUsername+' not found.');
		}

		if (target === 'symbol') {
			if (targetUser.canCustomSymbol) {
				targetUser.canCustomSymbol = false;
				this.sendReply(targetUser.name + ' no longer has a custom symbol ready to use.');
				targetUser.send(user.name + ' has removed the custom symbol from you.');
			}
			else
				return this.sendReply('They do not have a custom symbol for you to remove.');
		}
		else if (target === 'voice') {
			if (targetUser.canBeVoice) {
				targetUser.canBeVoice = false;
				this.sendReply(targetUser.name + ' no longer has Global Voice ready to use.');
				targetUser.send(user.name + ' has removed Global Voice from you.');
			}
			else
				return this.sendReply('They do not have Global voice for you to remove.');
		}
		else if (target === 'custom') {
			if (targetUser.canCustomAvatar) {
				targetUser.canCustomAvatar = false;
				this.sendReply(targetUser.name + ' no longer has a custom avatar ready to use.');
				targetUser.send(user.name + ' has removed the custom avatar from you.');
			}
			else
				return this.sendReply('They do not have a custom avatar for you to remove.');
		}
		else if (target === 'animated') {
			if (targetUser.canAnimatedAvatar) {
				targetUser.canAnimatedAvatar = false;
				this.sendReply(targetUser.name + ' no longer has a animated avatar ready to use.');
				targetUser.send(user.name + ' has removed the animated avatar from you.');
			}
			else
				return this.sendReply('They do not have an animated avatar for you to remove.');
		}
		else if (target === 'room') {
			if (targetUser.canChatRoom) {
				targetUser.canChatRoom = false;
				this.sendReply(targetUser.name + ' no longer has a chat room ready to use.');
				targetUser.send(user.name + ' has removed the chat room from you.');
			}
			else
				return this.sendReply('They do not have a chat room for you to remove.');
		}
		else if (target === 'trainer') {
			if (targetUser.canTrainerCard) {
				targetUser.canTrainerCard = false;
				this.sendReply(targetUser.name + ' no longer has a trainer card ready to use.');
				targetUser.send(user.name + ' has removed the trainer card from you.');
			}
			else
				return this.sendReply('They do not have a trainer card for you to remove.');
		}

		else if (target === 'fix') {
			if (targetUser.canFixItem) {
				targetUser.canFixItem = false;
				this.sendReply(targetUser.name + ' no longer has the fix to use.');
				targetUser.send(user.name + ' has removed the fix from you.');
			}
			else
				return this.sendReply('They do not have a trainer card for you to remove.');
		}
		else if (target === 'declare') {
			if (targetUser.canDecAdvertise) {
				targetUser.canDecAdvertise = false;
				this.sendReply(targetUser.name + ' no longer has a declare ready to use.');
				targetUser.send(user.name + ' has removed the declare from you.');
			}
			else
				return this.sendReply('They do not have a trainer card for you to remove.');
		}
		else
			return this.sendReply('That isn\'t a real item you fool!');
	},
	moneycommands: function(target, room, user) {
		if (!this.canBroadcast()) return;
		return this.sendReplyBox('The command for the Money system:<br />' +
			'/shop - Show the shop with the items you can buy.<br />' +
			'/buy [command] - Buy an item from the shop using the item command name.<br />' +
			'/atm [username] - Show your bucks (if just /atm) or show someone else\'s bucks.<br />' +
			'/prizes - A link to the prize page and ways to earn bucks.');
	},
	
     imgdeclare: function (target, room, user) {
         if (!target) return this.sendReply('|raw|Correct Syntax: /imgdeclare <i>insert img url here</i>');
         if (!this.can('imgdeclare')) return;

         if (!this.canTalk(target)) {
             return false;
         } else {
             this.add('|raw|' + '<img width="100%" src="' + target + '" >');
             this.logModCommand(user.name + ' declared ' + target);
         }
         this.logModCommand(user.name + ' image declared ' + target);
     },

     masspm: 'pmall',
     pmall: function (target, room, user) {
         if (!target) return this.sendReply('|raw|/pmall <em>message</em> - Sends a PM to every user in a room.');
         if (!this.can('pmall')) return false;

         var pmName = bot.name;

         for (var i in Users.users) {
             var message = '|pm|' + pmName + '|' + Users.users[i].getIdentity() + '|' + target;
             Users.users[i].send(message);
         }
     },

     gdeclarered: 'gdeclare',
     gdeclaregreen: 'gdeclare',
     gdeclare: function (target, room, user, connection, cmd) {
         if (!target) return this.parse('/help gdeclare');
         if (!this.can('lockdown')) return false;


         var roomName = (room.isPrivate) ? 'a private room' : room.id;


         if (cmd === 'gdeclare') {
             for (var id in Rooms.rooms) {
                 if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-blue"><b><font size=1><i>Global declare from ' + roomName + '<br /></i></font size>' + target + '</b></div>');
             }
         }
         if (cmd === 'gdeclarered') {
             for (var id in Rooms.rooms) {
                 if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-red"><b><font size=1><i>Global declare from ' + roomName + '<br /></i></font size>' + target + '</b></div>');
             }
         } else if (cmd === 'gdeclaregreen') {
             for (var id in Rooms.rooms) {
                 if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-green"><b><font size=1><i>Global declare from ' + roomName + '<br /></i></font size>' + target + '</b></div>');
             }
         }
         this.logEntry(user.name + ' used /gdeclare');
     },

     modmsg: 'declaremod',
     moddeclare: 'declaremod',
     declaremod: function (target, room, user) {
         if (!target) return this.sendReply('/declaremod [message] - Also /moddeclare and /modmsg');
         if (!this.can('declare', null, room)) return false;

         if (!this.canTalk()) return false;

         this.privateModCommand('|raw|<div class="broadcast-red"><b><font size=1><i>Private Auth (Driver +) declare from ' + user.name + '<br /></i></font size>' + target + '</b></div>');

         this.logModCommand(user.name + ' mod declared ' + target);
     },
     
	 database: 'db',
	 db: function(target, room, user, connection) {
		 if (!this.can('db')) return false;
		 if(!target) return user.send('|popup|You much enter a target.');
		 try {
		 	 var log = fs.readFileSync(('src/data/'+target+'.csv'),'utf8');
	     return user.send('|popup|'+log);
		 } catch (e) {
			 return user.send('|popup|Something bad happen:\n\n ' + e.stack);
		 }
	 },

     // @Override declare command becuase of the canTalk function prevents user from declaring
     declare: function (target, room, user) {
         if (!target) return this.parse('/help declare');
         if (!this.can('declare', null, room)) return false;
         this.add('|raw|<div class="broadcast-blue"><b>' + target + '</b></div>');
         this.logModCommand(user.name + ' declared ' + target);
     },
     /*********************************************************
      * Fun Commands                                          *
      *********************************************************/
     kick: function (target, room, user) {
         if (!this.can('declare')) return this.sendReply('/kick - Access Denied');
         if (!target) return this.sendReply('|raw|/kick <em>username</em> - kicks the user from the room.');
         var targetUser = Users.get(target);
         if (!targetUser) return this.sendReply('User ' + target + ' not found.');
         if (targetUser.group === '~') {
             return this.sendReply('Administrators can\'t be room kicked.');
         }
         if (!Rooms.rooms[room.id].users[targetUser.userid]) return this.sendReply(target + ' is not in this room.');
         targetUser.popup('You have been kicked from room ' + room.title + ' by ' + user.name + '.');
         targetUser.leaveRoom(room);
         room.add('|raw|' + targetUser.name + ' has been kicked from room by ' + user.name + '.');
         this.logModCommand(user.name + ' kicked ' + targetUser.name + ' from ' + room.id);
     },

     frt: 'forcerenameto',
     forcerenameto: function (target, room, user) {
         if (!target) return this.parse('/help forcerenameto');
         target = this.splitTarget(target);
         var targetUser = this.targetUser;
         if (!targetUser) {
             return this.sendReply('User ' + this.targetUsername + ' not found.');
         }
         if (!target) {
             return this.sendReply('No new name was specified.');
         }
         if (!this.can('forcerenameto', targetUser)) return false;

         if (targetUser.userid === toUserid(this.targetUser)) {
             var entry = '' + targetUser.name + ' was forcibly renamed to ' + target + ' by ' + user.name + '.';
             this.privateModCommand('(' + entry + ')');
             targetUser.forceRename(target, undefined, true);
         } else {
             this.sendReply("User " + targetUser.name + " is no longer using that name.");
         }
     },


     poke: function (target, room, user) {
         if (!target) return this.sendReply('/poke needs a target.');
         return this.parse('/me pokes ' + target + '.');
     },

     roll: 'dice',
     dice: function (target, room, user) {
         if (!this.canBroadcast()) return;
         var d = target.indexOf("d");
         if (d != -1) {
             var num = parseInt(target.substring(0, d));
             faces = NaN;
             if (target.length > d) var faces = parseInt(target.substring(d + 1));
             if (isNaN(num)) num = 1;
             if (isNaN(faces)) return this.sendReply("The number of faces must be a valid integer.");
             if (faces < 1 || faces > 1000) return this.sendReply("The number of faces must be between 1 and 1000");
             if (num < 1 || num > 20) return this.sendReply("The number of dice must be between 1 and 20");
             var rolls = new Array();
             var total = 0;
             for (var i = 0; i < num; i++) {
                 rolls[i] = (Math.floor(faces * Math.random()) + 1);
                 total += rolls[i];
             }
             return this.sendReplyBox('Random number ' + num + 'x(1 - ' + faces + '): ' + rolls.join(', ') + '<br />Total: ' + total);
         }
         if (target && isNaN(target) || target.length > 21) return this.sendReply('The max roll must be a number under 21 digits.');
         var maxRoll = (target) ? target : 6;
         var rand = Math.floor(maxRoll * Math.random()) + 1;
         return this.sendReplyBox('Random number (1 - ' + maxRoll + '): ' + rand);
     },

     derpray: function (target, room, user) {
         if (!target) return this.parse('/help ban');


         target = this.splitTarget(target);
         var targetUser = this.targetUser;
         if (!targetUser) {
             return this.sendReply('User ' + this.targetUsername + ' not found.');
         }
         if (target.length > 30) {
             return this.sendReply('The reason is too long. It cannot exceed ' + 30 + ' characters.');
         }
         if (!this.can('ban', targetUser)) return false;


         if (Users.checkBanned(targetUser.latestIp) && !target && !targetUser.connected) {
             var problem = ' but was already derp rayed';
             return this.privateModCommand('(' + targetUser.name + ' would be hit by ' + user.name + '\'s derp ray' + problem + '.)');
         }


         targetUser.popup(user.name + " has hit you with his/her derp ray." + (config.appealurl ? ("  If you feel that your banning was unjustified you can appeal the ban:\n" + config.appealurl) : "") + "\n\n" + target);


         this.addModCommand("" + targetUser.name + " derp rayed by " + user.name + "." + (target ? " (" + target + ")" : ""), ' (' + targetUser.latestIp + ')');
         var alts = targetUser.getAlts();
         if (alts.length) {
             this.addModCommand("" + targetUser.name + "'s alts were also derp rayed: " + alts.join(", "));
             for (var i = 0; i < alts.length; ++i) {
                 this.add('|unlink|' + toId(alts[i]));
             }
         }


         this.add('|unlink|' + targetUser.userid);
         targetUser.ban();
     },
     /*********************************************************
      * Tour Commands                                         *
      *********************************************************/
     nt: 'newtour',
     newtour: function (target, room, user) {
         this.parse('/tour new ' + target);
     },

     st: 'starttour',
     starttour: function (target, room, user) {
         this.parse('/tour start');
     },

     jt: 'jointour',
     jointour: function (target, room, user) {
         this.parse('/tour join');
     },

     lt: 'leavetour',
     leavetour: function (target, room, user) {
         this.parse('/tour leave');
     },

     remind: function (target, room, user) {
         this.parse('/tour remind');
     },
     dq: 'disqualify',
     disqualify: function (target, room, user) {
         this.parse('/tour dq ' + target);
     },

     settype: function (target, room, user) {
         this.parse('/tour settype ' + target);
     },
     et: 'endtour',
     endtour: function (target, room, user) {
         this.parse('/tour end');
     },
	 
	
     
     /*********************************************************
      * Important Commands                                    *
      *********************************************************/
     unstuck: function (target, room, user) {
         setInterval(function () {
             for (var i in Users.users) {
                 Users.users[i].chatQueue = null;
                 Users.users[i].chatQueueTimeout = null;
             }
         }, 5000);
     },
     reload: function (target, room, user) {
         if (!this.can('hotpatch')) return false;

         try {
             var path = require("path"),
                 fs = require("fs");

             this.sendReply('Reloading command-parser...');
             CommandParser.uncacheTree(path.join(__dirname, '../', 'command-parser.js'));
             CommandParser = require(path.join(__dirname, '../', 'command-parser.js'));

             this.sendReply('Reloading hangman.js...');
             CommandParser.uncacheTree(path.join(__dirname, '../', 'hangman.js'));
             hangman = require(path.join(__dirname, '../', 'hangman.js')).hangman();

 
             
             var runningTournaments = Tournaments.tournaments;
             this.sendReply('Reloading tournaments...');
             CommandParser.uncacheTree(path.join(__dirname, '../', 'tournaments/frontend.js'));
             Tournaments = require(path.join(__dirname, '../', 'tournaments/frontend.js'));
             Tournaments.tournaments = runningTournaments;
             this.sendReply('Reloading commands...');
             CommandParser.uncacheTree('./src/custom-commands.js');
             customcommands = require('./custom-commands.js');
             CommandParser.uncacheTree('./src/trainer-cards.js');
             trainercards = require('./trainer-cards.js');
	     

             return this.sendReply('All files have been reloaded.');
         } catch (e) {
             return this.sendReply('Something failed while trying to reload: \n' + e.stack);
         }
     }

 };


 Object.merge(CommandParser.commands, cmds);
 exports.cmds = cmds;
