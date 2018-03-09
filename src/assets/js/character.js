export default class Character {
  //basic info
  name = '';
  species = '';
  career = '';
  specializations = '';
  type = 'Player';
  //stats
  soakThresh = 0;
  soakCurrent = 0;
  defenseRNG = 0;
  defenseMEL = 0;
  encThresh = 0;
  encCurrent = 0;
  woundThresh = 0;
  woundCurrent = 0;
  strainThresh = 0;
  strainCurrent = 0;
  hasForce = false;
  forceAvail = 0;
  forceCommit = 0;

  //characteristics
  characteristics = {
    brawn: 0,
    agility: 0,
    intellect: 0,
    cunning: 0,
    willpower: 0,
    presence: 0,
    forceRank: 0
  }

  //skills
  skills = {
    astrogation: 0,
    athletics: 0,
    charm: 0,
    coercion: 0,
    computers: 0,
    cool: 0,
    coordination: 0,
    deception: 0,
    discipline: 0,
    leadership: 0,
    mechanics: 0,
    medicine: 0,
    negotiation: 0,
    perception: 0,
    pilotingPlanetary: 0,
    pilotingSpace: 0,
    resilience: 0,
    skulduggery: 0,
    stealth: 0,
    streetwise: 0,
    survival: 0,
    vigilance: 0,

    //weapons
    brawl: 0,
    melee: 0,
    lightsaber: 0,
    rangedLight: 0,
    rangedHeavy: 0,
    gunnery: 0,

    //knowledge
    coreWorlds: 0,
    education: 0,
    lore: 0,
    outerRim: 0,
    underworld: 0,
    warfare: 0,
    xenology: 0
  }

  //inventory
  inventory = {
    weapons: {
      'Blaster Rifle': {
        class: 'Ranged Heavy',
        damage: 13
      }
    },

    armor: {
    }
  }

  //etc
  credits = 0;
  totalXP = 0;
  availableXP = 0
}
