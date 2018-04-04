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

New users are able to create characters fairly easily.

## Overview of Process

This was built with me knowing essentially nothing about Vue and literally nothing about Firebase, as was intended; I wanted to learn Vue for a long time, and was reading about Firebase Auth when I discovered their 'realtime database,' which clicked in my head combined with Vue's reactivity. Why wouldn't I, I thought, be able to make an app that could talk to Firebase and reactively render upon changes? What sort of app would that be? And from there it turned into this.

I approached this in probably the least constructive way; I had a long list of features that I wanted, and I knew I wanted to incorporate Firebase's realtime database and auth, so I just kind of went at it scattershot, learning and building Vue while working on the data models for firebase and incorporating auth and understanding how data was going to pass around Vue. Had I been more familiar with any one part of this process, this definitely would have gone a lot smoother. Because I rewrote the player data structure 5-7 times throughout, I also had to rewrite how data was displayed in Vue *and* how that data was handled by JS. In addition to this, I switched the way I did components at least twice in this process, and as such the organization of my project folder affected the code and markup I ended up writing. I use CSS IDs fairly frequently (something for which I am unapologetic), but my casing alternates between camelCase and kebab-case, I'm pretty sure I alternate between arrow functions and not...arrow functions several times.

I did my best to clean up my code and to follow the Vue style guide, but given that I was learning as I was doing, there are a number of things I missed.
