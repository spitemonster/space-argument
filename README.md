# space-argument

> A Star Wars RPG Team System

## About

~I'm tangentially familiar with Vue and very interested in the 'realtime' part of Firebase, and I'm also a big fan of tabletop RPGs and have lately been playing through a campaign in a Star Wars RPG (at time of writing I can't think of what specifically it's called), so I've decided to build a character/campaign management system, both to get more familiar with Vue and Firebase, but also as a gift to my RPG buds.~

~As of writing this, all my core desired features are done. I'm going to leave them in this doc, struck-through, for posterity, but I'm going to continue to add things to the roadmap.~

I'll go ahead and say I'm finished with v1. List of features:

### Admin
* On dashboard, view entire team's wound, characteristics, equipped weapons and armor, stats for both weapons and armor, and character soak, all of which are calculated and displayed dynamically: when a player equips a different weapon or armor, the change is reflected immediately.

* On dashboard, wound each player individual in 1 point increments, which reflects immediately for all players in their 'Party' screen. When a player is below 20% health, an animated class is added to their health bar which glows and pulses red.

* On utilities screen, award whole team EXP, heal all players to 100% and describe and give individual players weapons and armor.

* On briefs screen, write brief with title, current world, current goal and content that will be displayed to each player.

### Player

* On dashboard, view vitals, characteristics and skills, the latter of which either displayed all at once or broken down by associated characteristic.

* On dashboard, view current credits and available experience points. Player can rank up skills, and the rank up function is dynamic, calculating the cost of the rank based on whether or not that skill is a specialization and the rank to be purchased.

* On dashboard, view weapon and armor inventory and change equipped weapon and armor in real time.

* On party screen, view vitals, characteristics and equipped weapons and armor of entire team.

* On briefs screen, read latest brief written by DM.

## Roadmap

I'll try and keep a list of things that I want or will need this to do, which hopefully will keep me focused and help me lay out all of the things I need to learn or implement. This is my first fairly big solo project, as I'm coming from primarily Front-End experience.

### Account Creation and Authentication

~Creation and authentication has been successfully implemented, for the most part. Still experiencing a bug where, upon a refresh, the loss of connection with Firebase fucks up how things display. Easy solution: don't refresh unless I'm logged out. Can't get a grasp of it otherwise. I cheated with creation, mostly because I needed to make it easier on myself making 5 player accounts + 1 admin account.~

### Admin/DM Account

* ~Ability for DM to write a brief about where we are in the campaign, what our current objectives are, where we are, etc. Ideally this could/would/should extend into lore/necessary information about the world we're on, etc.~ This has been implemented using Pell and Firebase.

* ~Allow DM to interact with players mid game. The initial thing I wanted to do with this app was just to have our character stats live on screen and our DM to be able to quickly check on our stats or injure us and have those changes reflect in real time on our character screens; for instance, in the middle of a battle if a player takes a couple wound, that number updates in real time and maybe the screen flashes red or something.~

* ~Allow DM to award EXP to players~

* Allow DM to award and take away credits from individual players or whole team.

* Create character, possibly. This will prove complicated because of how character creation works. May not do this.

* Give players items that are not necessarily weapons or armor, such as medpacks/repair kits or quest items.

### Player account

* ~Quick check stats and vitals. Ideally I want necessary stats on hand at all times, everything else is ancillary. This is straightforward enough; each account is tied to a character in the DB with stats.~

* ~Change equipped weapon on the fly and have damage values reflected and available to DM.~

* ~Check DM brief and codex/other information~

* ~Rank up skills. The problem with this is that certain skills that are associated with the player's career and specialization cost less to rank up; and as of right now I have no built in system by which I can identify whether or not the skills in question are specializations, and right now the data structure doesn't...easily allow for this. I'll think of something.~

* Ability to use items that are not necessarily weapons or armor, such as medpacks/repair kits, on themselves OR other players in the team.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
