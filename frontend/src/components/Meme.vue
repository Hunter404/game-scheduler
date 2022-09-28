<template>
    <img :src="theMeme" />
</template>

<script>
export default {
  name: 'Meme',
  data() {
    const memes = [
        "https://i.redd.it/i2zoucfztzd51.png",
        "https://i.redd.it/ehp3h1r3m9y11.jpg?auto=webp&s=ff01cf91984e2d9166cc26f8147c026d5b6e6660",
        "https://i.redd.it/v0hktuk3x9a61.png?auto=webp&s=f86e3e138d0b5cdab5d97743ad6df29f7a965bac",
        "https://i.ytimg.com/vi/-Ysju5Ewu-w/maxresdefault.jpg",
        "https://i.redd.it/sdq9ppq1aqi71.png?auto=webp&s=e647f9d2114d78ad092c2be38946a417f7b683fc",
        "https://i.redd.it/1o8frkhawu971.png",
        "https://c.tenor.com/HUqYHQSJ334AAAAC/undertow-barotrauma.gif",
        "https://i.redd.it/zopp3d25bbq91.jpg",
        "https://i.redd.it/f5usta6nctp91.jpg",
        "https://i.redd.it/rf05gaht4tp91.jpg",
        "https://i.redd.it/zl30wg69wuk81.jpg",
        "https://i.redd.it/jhoqane1hoo91.jpg",
        "https://i.redd.it/0he2r08iz7w61.png",
        "https://i.redd.it/1ppjxksx4nq81.png",
        "https://i.redd.it/urz0f68zy7s61.png",
        "https://i.redd.it/h8rclwq4qaj81.png",
        "https://i.redd.it/8r588l9e35j71.png",
        "https://i.redd.it/h4edhk36vka61.jpg"
      ];

    return {
      memes,
      randomMeme: Math.floor(Math.random() * memes.length)
    }
  },
  props: {
  },
  computed: {
    theMeme() {
      return this.memes[this.randomMeme];
    },
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: 500px;
}
</style>
