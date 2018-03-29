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
    ag: {
      val: 0,
      skills: {
        coordination: {
          val: 0,
          spec: false
        },
        gunnery: {
          val: 0,
          spec: false
        },
        pilotingSpace: {
          val: 0,
          spec: false
        },
        pilotingPlanetary: {
          val: 0,
          spec: false
        },
        rangedLight: {
          val: 0,
          spec: false
        },
        rangedHeavy: {
          val: 0,
          spec: false
        },
        stealth: {
          val: 0,
          spec: false
        }
      }
    },
    br: {
      val: 0,
      skills: {
        athletics: {
          val: 0,
          spec: false
        },
        resilience: {
          val: 0,
          spec: false
        },
        brawl: {
          val: 0,
          spec: false
        },
        melee: {
          val: 0,
          spec: false
        },
      }
    },
    int: {
      val: 0,
      skills: {
        astrogation: {
          val: 0,
          spec: false
        },
        computers: {
          val: 0,
          spec: false
        },
        mechanics: {
          val: 0,
          spec: false,
        },
        medicine: {
          val: 0,
          spec: false
        }
      }
    },
    cun: {
      val: 0,
      skills: {
        deception: {
          val: 0,
          spec: false
        },
        perception: {
          val: 0,
          spec: false
        },
        skulduggery: {
          val: 0,
          spec: false
        },
        streetwise: {
          val: 0,
          spec: false
        },
        survival: {
          val: 0,
          spec: false
        },
      }
    },
    will: {
      val: 0,
      skills: {
        coercion: {
          val: 0,
          spec: false
        },
        discipline: {
          val: 0,
          spec: false
        },
        vigilance: {
          val: 0,
          spec: 0
        }
      }
    },
    pres: {
      val: 0,
      skills: {
        charm: {
          val: 0,
          spec: false
        },
        cool: {
          val: 0,
          spec: false
        },
        leadership: {
          val: 0,
          spec: false
        },
        negotiation: {
          val: 0,
          spec: false
        }
      }
    },
    force: {
      val: 0
    }
  };

  knowledge = {
    coreWorlds: {
      spec: false,
      val: 0
    },
    education: {
      spec: false,
      val: 0
    },
    lore: {
      spec: false,
      val: 0
    },
    lore: {
      spec: false,
      val: 0
    },
    outerRim: {
      spec: false,
      val: 0
    },
    underworld: {
      spec: false,
      val: 0
    },
    warfare: {
      spec: false,
      val: 0
    },
    xeonology: {
      spec: false,
      val: 0
    }
  };

  //inventory
  inventory = {
    
  }

  //etc
  credits = 0;
  totalXP = 0;
  availableXP = 0
}
