<template lang="html">
  <div id="character-creation">
    <div>
      <h1>CHARACTER CREATION</h1>
      <h3>INFO</h3>
      <input type="text" placeholder="Name" v-model="name" required />
      <input type="text" placeholder="Species" v-model="species" required />
      <input type="text" placeholder="Career" v-model="career" required />
      <input type="text" placeholder="Specialization" v-model="specialization" required />
      <input type="text" placeholder="Soak" v-model="soak" required />
      <input type="text" placeholder="Wound Threshhold" v-model="woundThresh" required />
      <h3>CHARACTERISTICS</h3>
      <input type="text" placeholder="Brawn" required v-model="characteristics.br.val" />
      <input type="text" placeholder="Agility" required v-model="characteristics.ag.val" />
      <input type="text" placeholder="Intellect" required v-model="characteristics.int.val" />
      <input type="text" placeholder="Cunning" required v-model="characteristics.cun.val" />
      <input type="text" placeholder="Willpower" required v-model="characteristics.will.val"/>
      <input type="text" placeholder="Presence" required v-model="characteristics.pres.val" />
      <span>
        <label for="force">force available?</label>
        <input name="force" type="checkbox" value="true" v-model="hasForce">
        <input type="text" placeholder="Force" v-model="characteristics.force.val" required/>
      </span>
      <input type="text" placeholder="availableXP" v-model="availableXP" required>

    </div>
    <div>
      <h3>SPECIALIZATIONS</h3>
      <span class="spec" v-for="(skill, key) in this.skews">
        <p>{{ key }}:</p> <input type="checkbox" value="Astrogation" @change="specThis(skill)" />
      </span>
    </div>
    <button @click="create">CREATE CHARACTER</button>
  </div>
</template>

<script>
import db from '../../assets/js/firebaseConfig.js'
import Character from '../../assets/js/character'

export default {
  props: {},

  data() {
    return {
      name: '',
      species: '',
      career: '',
      specialization: '',
      hasForce: false,
      force: null,
      availableXP: null,
      soak: null,
      woundThresh: null,
      characteristics: {
        ag: {
          val: null,
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
          val: null,
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
            }
          }
        },
        int: {
          val: null,
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
              spec: false
            },
            medicine: {
              val: 0,
              spec: false
            }
          }
        },
        cun: {
          val: null,
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
            }
          }
        },
        will: {
          val: null,
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
          val: null,
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
          val: null
        }
      },

      skews: {}
    }
  },

  firebase() {
    return {
      players: db.ref('players/')
    }
  },

  created() {
    let self = this

    for (let char in self.characteristics) {
      for (let skill in self.characteristics[char].skills) {
        self.skews[skill] = self.characteristics[char].skills[skill]
        self.skews[skill].char = char
        self.skews[skill].key = skill
      }
    }

    // console.log(this.skills)
  },

  methods: {
    create() {
      let current = firebase.auth().currentUser.uid;

      let character = new Character(
        this.name,
        this.species,
        this.career,
        this.soak,
        this.woundThresh,
        this.specialization,
        this.characteristics,
        this.hasForce,
        this.force,
        this.availableXP
      )

      this.$firebaseRefs.players.child(current).set(character);
    },

    specThis(data) {
      let char = data.char
      let skill = data.key

      if (data.spec == false) {
        data.spec = true
        this.characteristics[char].skills[skill].spec = true
      } else if (data.spec == true) {
        data.spec = false
        this.characteristics[char].skills[skill].spec = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/_variables.scss';

#character-creation {
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  div {
    width: 50%;
    max-width: 300px;
    margin: 1rem;
    padding: 1rem;
    border: 1px solid black;

    h3 {
      margin: 1rem 0;
    }

    input {
      margin-bottom: 0.25rem;
    }

    span {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      input {
        width: auto;
      }
    }
  }

  button {
    width: 100%;
  }
}
</style>
