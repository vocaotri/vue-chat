<template>
  <div>
    <v-card class="popup-emoij" v-if="showEmo">
      <v-card-title class="headline grey lighten-2">
        Emoij
        <v-text-field
          label="Search emoij"
          append-icon="mdi-magnify"
          class="ml-10"
          v-model="keyword"
        ></v-text-field>
      </v-card-title>

      <v-card-text>
        <v-row id="box-emoij" class="box-emoij">
          <template v-for="(emoij, index) in emoijs">
            <v-col cols="1" :key="index" class="emoij-item">
              <button :title="emoij.name">
                {{ emoij.char }}
              </button>
            </v-col>
          </template>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeEmoij"> x </v-btn>
      </v-card-actions>
    </v-card>
    <button @click="openEmoij">
      <v-icon class="mdi mdi-emoticon-happy-outline"></v-icon>
    </button>
  </div>
</template>

<script>
import "@/assets/css/emoij.css";
import _ from "lodash";
export default {
  name: "Emoij",
  data() {
    return {
      emoijs: [],
      showEmo: false,
      keyword: "",
      limit: 50,
    };
  },
  computed: {
    urlEmoij() {
      return `https://api-emoji.herokuapp.com/emojis?limit=${this.limit}&name=${this.keyword}`;
    },
  },
  watch: {
    keyword: _.debounce(function () {
      var url = this.urlEmoij;
      this.fetchEmoij(url);
    }, 300),
  },
  methods: {
    openEmoij() {
      this.showEmo = true;
      this.fetchEmoij(this.urlEmoij);
    },
    fetchEmoij(url) {
      fetch(url)
        .then((res) => {
          res.json().then((data) => {
            this.emoijs = data.data;
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    closeEmoij() {
      this.showEmo = false;
    },
    scroll() {
      document.getElementById("box-emoij").onscroll = () => {
        var box = document.getElementById("box-emoij");
        console.log(box.scrollTop);
        // if (document.getElementById("box-emoij").scrollTop === 0) {
        // this.loaddMessage = true;
        // var _this = this;
        // setTimeout(function () {
        //   _this.loaddMessage = false;
        // }, 1000);
        // }
      };
    },
  },
};
</script>