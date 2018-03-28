# space-argument

> A Star Wars RPG Team System

## About

~I'm tangentially familiar with Vue and very interested in the 'realtime' part of Firebase, and I'm also a big fan of tabletop RPGs and have lately been playing through a campaign in a Star Wars RPG (at time of writing I can't think of what specifically it's called), so I've decided to build a character/campaign management system, both to get more familiar with Vue and Firebase, but also as a gift to my RPG buds.~

As of writing this, all my core desired features are done. I'm going to leave them in this doc, struck-through, for posterity, but I'm going to continue to add things to the roadmap.

## Roadmap

I'll try and keep a list of things that I want or will need this to do, which hopefully will keep me focused and help me lay out all of the things I need to learn or implement. This is my first fairly big solo project, as I'm coming from primarily Front-End experience.

### Account Creation and Authentication

Creation and authentication has been successfully implemented, for the most part. Still experiencing a bug where, upon a refresh, the loss of connection with Firebase fucks up how things display. Easy solution: don't refresh unless I'm logged out. Can't get a grasp of it otherwise. I cheated with creation, mostly because I needed to make it easier on myself making 5 player accounts + 1 admin account.

### Admin/DM Account

* ~Ability for DM to write a brief about where we are in the campaign, what our current objectives are, where we are, etc. Ideally this could/would/should extend into lore/necessary information about the world we're on, etc.~ This has been implemented using Pell and Firebase.

* ~POTENTIALLY Allow DM to create new characters and bring new users in. Right now I think this might be beyond my skill set but hopefully by the time I'm finished with the core features this is something I'll be able to implement with relative ease.~ There's really no reason for this; if a new player joins I can just set up their account faster.

* ~Allow DM to interact with players mid game. The initial thing I wanted to do with this app was just to have our character stats live on screen and our DM to be able to quickly check on our stats or injure us and have those changes reflect in real time on our character screens; for instance, in the middle of a battle if a player takes a couple wound, that number updates in real time and maybe the screen flashes red or something.~

* ~Allow DM to award EXP to players~

Potentially more to come after I discuss desired features with the DM

### Player account

* ~Quick check stats and vitals. Ideally I want necessary stats on hand at all times, everything else is ancillary. This is straightforward enough; each account is tied to a character in the DB with stats.~

* ~Change equipped weapon on the fly and have damage values reflected and available to DM.~

* ~Check DM brief and codex/other information~

* Rank up skills. The problem with this is that certain skills that are associated with the player's career and specialization cost less to rank up; and as of right now I have no built in system by which I can identify whether or not the skills in question are specializations, and right now the data structure doesn't...easily allow for this. I'll think of something.

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
