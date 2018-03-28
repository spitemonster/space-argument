<!-- What players see -->
<template>
  <div class="character" >

    <!-- <button @click="updateWeapon">UPDATE WEAPON</button> -->
    <!-- <button @click="updateArmor">UPDATE ARMOR</button> -->
    <!-- <button @click="updateSkills">UPDATE SKILLS</button> -->
    <!-- <button @click="updateChars">UPDATE SKILLS</button> -->
    <!-- <button @click="updateKnow">UPDATE SKILLS</button> -->
    <keep-alive>
      <section v-if="dashboard">
        <player-info :player="player"
                     :weapons="weapons"></player-info>

        <player-characteristics :characteristics="player.characteristics"
                                :current="current"></player-characteristics>

        <div id="invButton" @click="inventory = !inventory">
          <h3>INVENTORY</h3>
        </div>

        <player-stats :characteristics="player.characteristics"
                      :refs="$firebaseRefs.player"
                      :exp="player.availableXP"
                      :know="player.knowledge"></player-stats>

        <player-inventory v-if="inventory"
                          :current="current"
                          :armor="armorInv"></player-inventory>
      </section>
    </keep-alive>
    <section v-if="brief">
      <single-brief :briefs="briefs"></single-brief>
    </section>
    <section v-if="party">
      <party :party="team"
             :current="current"></party>
    </section>
  </div>
</template>

<script>
import db from '../../assets/js/firebaseConfig.js'
import { bus } from '../../bus.js'

//import components
import playerCharacteristics from './player/player-characteristics.vue'
import playerStats from './player/player-stats.vue'
import singleBrief from './player/single-brief.vue'
import playerInventory from './player/player-inventory.vue'
import playerInfo from './player/player-info.vue'
import party from './party.vue'

export default {
  name: 'player-view',

  data() {
    return {
      current: firebase.auth().currentUser.uid,
      inventory: false,
    }
  },

  props: {
    dashboard: true,
    brief: false,
    party: false
  },

  components: {
    playerCharacteristics,
    playerStats,
    singleBrief,
    playerInventory,
    playerInfo,
    party
  },

  firebase() {
    return {
      team: db.ref('players/'),
      player: {
        source: db.ref('players/' + this.current),
        asObject: true
      },
      weapons: {
        source: db.ref('players/' + this.current + '/inventory/weapons'),
        asObject: true
      },
      armorInv: db.ref('players/' + this.current + '/inventory/armor'),
      briefs: {
        source: db.ref('briefs/')
      }
    }
  },

  computed: {
  },

  methods: {
    updateWeapon() {
      let test = "Boonta Blaster";

      this.$firebaseRefs.player.child('inventory').child('weapons').push({
        equipped: false,
        damage: 6,
        crit: 3,
        enc: 0,
        skill: 'Ranged (Light)',
        name: test,
        range: 'Short',
        Other: 'Stun'
      });;
    },

    updateArmor() {
      let test = "Heavy Clothing";

      this.$firebaseRefs.player.child('inventory').child('armor').push({
        equipped: true,
        soak: 1,
        name: test,

      });;
    },

    updateSkills() {
      this.$firebaseRefs.player.child('skills').set({
        astrogation: {
          value: 0,
          spec: false
        },
        athletics: {
          value: 0,
          spec: false
        },
        brawl: {
          value: 0,
          spec: false
        },
        charm: {
          value: 0,
          spec: false
        },
        coercion: {
          value: 0,
          spec: false
        },
        computers: {
          value: 0,
          spec: false
        },
        cool: {
          value: 1,
          spec: false
        },
        coreWorlds: {
          value: 0,
          spec: false
        },
        deception: {
          value: 4,
          spec: false
        },
        discipline: {
          value: 0,
          spec: false
        },
        education: {
          value: 0,
          spec: false
        },
        gunnery: {
          value: 0,
          spec: false
        },
        leadership: {
          value: 0,
          spec: false
        },
        lightsaber: {
          value: 0,
          spec: false
        },
        lore: {
          value: 0,
          spec: false
        },
        mechanics: {
          value: 0,
          spec: false
        },
        medicine: {
          value: 0,
          spec: false
        },
        melee: {
          value: 1,
          spec: false
        },
        negotiation: {
          value: 0,
          spec: false
        },
        outerRim: {
          value: 0,
          spec: false
        },
        perception: {
          value: 1,
          spec: false
        },
        pilotingPlanetary: {
          value: 0,
          spec: false
        },
        pilotingSpace: {
          value: 0,
          spec: false
        },
        rangedHeavy: {
          value: 0,
          spec: true
        },
        rangedLight: {
          value: 1,
          spec: false
        },
        resilience: {
          value: 0,
          spec: false
        },
        skulduggery: {
          value: 2,
          spec: false
        },
        stealth: {
          value: 2,
          spec: false
        },
        streetwise: {
          value: 1,
          spec: false
        },
        survival: {
          value: 0,
          spec: false
        },
        underworld: {
          value: 0,
          spec: false
        },
        vigilance: {
          value: 2,
          spec: false
        },
        warfare: {
          value: 0,
          spec: false
        },
        xenology: {
          value: 0,
          spec: false
        }
      })
    },
    updateChars() {
      this.$firebaseRefs.player.child('characteristics').set({
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
      })
    },

    updateKnow() {
      // <!-- <h3 :class="{spec: skills.coreWorlds.spec}">Core Worlds <span>{{ skills.coreWorlds.value }}</span></h3>
      // <h3 :class="{spec: skills.education.spec}">Education: <span>{{ skills.education.value }}</span></h3>
      // <h3 :class="{spec: skills.lore.spec}">Lore: <span>{{ skills.lore.value }}</span></h3>
      // <h3 :class="{spec: skills.outerRim.spec}">Outer Rim: <span>{{ skills.outerRim.value }}</span></h3>
      // <h3 :class="{spec: skills.underworld.spec}">Underworld: <span>{{ skills.underworld.value }}</span></h3>
      // <h3 :class="{spec: skills.warfare.spec}">Warfare: <span>{{ skills.warfare.value }}</span></h3>
      // <h3 :class="{spec: skills.xenology.spec}">Xenology: <span>{{ skills.xenology.value }}</span></h3> -->
      this.$firebaseRefs.player.child('knowledge').set({
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
      });
    }
  },

  created() {
  }
}
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';

.character {
  max-width: 800px;
  min-height: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
}

#invButton {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  margin-top: 1rem;
  background: none;
  border: 1px solid rgba(99, 99, 99, 1);
  color: rgba(99, 99, 99, 1);
  text-transform: uppercase;
  position: relative;
  cursor: pointer;
  z-index: 99;
  transition: all 100ms linear;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: rgba(222, 222, 222, 1);

    &::before {
      left: 0;
      width: 100%;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 0%;
    height: 100%;
    transition: all 100ms ease-out;
    background: rgba(99, 99, 99, 1);
    z-index: -1;
  }
}

#skills {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.statSection {
  margin-top: 1rem;
}

.skillSelector {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  border: 1px solid $white;
  margin: 0.5rem 0;
  cursor: pointer;

  @media (min-width: 1024px) {
    width: calc(25% - 0.5rem);
    height: 120px;
    font-size: 1.2rem;
  }

  @media (max-width: 1023px) {
    width: calc(50% - 0.5rem);
    height: 80px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    height: 65px;
    font-size: 0.8rem;
  }
}

.statsGrid {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  h2 {
    width: 100%;
    border-bottom: 1px solid $white;
    padding-bottom: 0.25rem;
    margin: 1rem 0;
  }

  h3 {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-right: 2rem;
    margin: 0.25rem 0;

    span {
      font-weight: 100;
      align-self: flex-end;
      align-content: flex-end;
    }
  }
}
</style>
