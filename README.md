# space-argument

> A Star Wars RPG Team System

## About

I'm tangentially familiar with Vue and very interested in the 'realtime' part of Firebase, and I'm also a big fan of tabletop RPGs and have lately been playing through a campaign in a Star Wars RPG (at time of writing I can't think of what specifically it's called), so I've decided to build a character/campaign management system, both to get more familiar with Vue and Firebase, but also as a gift to my RPG buds.

## Roadmap

I'll try and keep a list of things that I want or will need this to do, which hopefully will keep me focused and help me lay out all of the things I need to learn or implement. This is my first fairly big solo project, as I'm coming from primarily Front-End experience.

### Account Creation and Authentication

I'm less worried about _creation_ as this is just a personal project; really don't want people to happen across it and sign up so I'll have to come up with some way to prevent any ol Joe Schmoe from making an account. Since we have a finite number of players I can probably limit the number of signups, or have a player select their character when they sign up; once there are no more characters available, sign-up won't work. Since this'll be hosted either on my personal site or on an unlisted domain I think minimum sign-up limitation will be enough.

I'm familiar enough with Firebase auth to implement account verification and auth.

The one roadblock I'm aware of is associating an auth account with a user in the database. I did it when I was testing out some of this functionality in a closed project, but I'm still not 100% on it so this will probably be an area of concern.

### Admin/DM Account

The first thing I think I'll tackle, once I get auth and account creation set up, is making the DM account, since this will require practically all of the features the player accounts will need plus a bit more, and once I hammer this out, player accounts should be easy. List of desired features as follows:

* Ability for DM to write a brief about where we are in the campaign, what our current objectives are, where we are, etc. Ideally this could/would/should extend into lore/necessary information about the world we're on, etc.

* POTENTIALLY Allow DM to create new characters and bring new users in. Right now I think this might be beyond my skill set but hopefully by the time I'm finished with the core features this is something I'll be able to implement with relative ease.

* Allow DM to interact with players mid game. The initial thing I wanted to do with this app was just to have our character stats live on screen and our DM to be able to quickly check on our stats or injure us and have those changes reflect in real time on our character screens; for instance, in the middle of a battle if a player takes a couple wound, that number updates in real time and maybe the screen flashes red or something.

* Allow DM to award EXP to players

Potentially more to come after I discuss desired features with the DM

### Player account

* Quick check stats and vitals. Ideally I want necessary stats on hand at all times, everything else is ancillary. This is straightforward enough; each account is tied to a character in the DB with stats.

* Change equipped weapon on the fly and have damage values reflected and available to DM.

* Check DM brief and codex/other information

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
