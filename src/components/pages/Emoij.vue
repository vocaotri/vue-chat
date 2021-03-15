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
              <button :title="emoij.name" @click="selectEmoij(emoij.char)">
                {{ emoij.char }}
              </button>
            </v-col>
          </template>
        </v-row>
        <v-img
          v-show="loadEmoij"
          alt="loading message"
          src="@/assets/gif/loading-message.gif"
          width="25px"
          height="25px"
          class="m-auto"
        ></v-img>
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
      loadEmoij: false,
      page: 1,
      limitPage: Number,
    };
  },
  computed: {
    urlEmoij() {
      return `https://api-emoji.herokuapp.com/emojis?limit=${this.limit}&name=${this.keyword}&page=${this.page}`;
    },
  },
  watch: {
    keyword: _.debounce(function () {
      this.page = 1;
      this.emoijs = [];
      var url = this.urlEmoij;
      this.fetchEmoij(url);
    }, 300),
  },
  methods: {
    async openEmoij() {
      this.showEmo = true;
      if (_.isEmpty(this.emoijs)) await this.fetchEmoij(this.urlEmoij);
    },
    fetchEmoij(url) {
      this.loadEmoij = true;
      fetch(url)
        .then((res) => {
          res.json().then((data) => {
            if (_.isEmpty(this.emoijs)) this.emoijs = data.data;
            else this.emoijs = [...this.emoijs, ...data.data];
            this.loadEmoij = false;
            this.limitPage = data.totalPage;
            this.scroll();
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
        if (
          box.scrollTop + box.offsetHeight === box.scrollHeight &&
          this.page < this.limitPage
        ) {
          this.page++;
          this.fetchEmoij(this.urlEmoij);
          this.loadEmoij = true;
          var _this = this;
          setTimeout(function () {
            _this.loadEmoij = false;
          }, 1000);
        }
      };
    },
    selectEmoij(emoij) {
      console.log(emoij);
    },
  },
};
</script>