<template>
  <div id="characteristics">
    <div class="charCard">
      <h4>brawn</h4>
      <div class="charRank">
        {{ players.brawn }}
      </div>
    </div>

    <div class="charCard">
      <h4>agility</h4>
      <div class="charRank">
        {{ players.agility }}
      </div>
    </div>

    <div class="charCard">
      <h4>intellect</h4>
      <div class="charRank">
        {{ players.intellect }}
      </div>
    </div>

    <div class="charCard">
      <h4>cunning</h4>
      <div class="charRank">
        {{ players.cunning }}
      </div>
    </div>

    <div class="charCard">
      <h4>willpower</h4>
      <div class="charRank">
        {{ players.willpower }}
      </div>
    </div>

    <div class="charCard">
      <h4>presence</h4>
      <div class="charRank">
        {{ players.presence }}
      </div>
    </div>

    <div v-if="hasForce" class="charCard">
      <h4>force</h4>
      <div class="charRank">
        {{ players.forceRank }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'characteristics-row',
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
