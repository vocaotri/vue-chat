<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-subheader
          ><v-list-item-avatar color="grey darken-1"> </v-list-item-avatar>
          name</v-subheader
        >
        <v-list
          id="list-chat"
          two-line
          height="350px"
          class="overflow-y-auto"
          :class="loaddMessage ? 'loading' : ''"
        >
          <v-img
            v-show="loaddMessage"
            alt="loading message"
            src="@/assets/gif/loading-message.gif"
            width="25px"
            height="25px"
            class="m-auto"
          ></v-img>
          <template v-for="(message, index) in messages">
            <v-list-item :key="index">
              <v-list-item-content
                :class="message.name === 'user_name' ? 'text-right' : ''"
              >
                <v-list-item-title>{{ message.name }} </v-list-item-title>

                <v-list-item-subtitle
                  class="pre-formatted"
                  v-html="message.content"
                >
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar
                v-show="index === messages.length - 1"
                height="25"
                width="25"
                min-width="10"
                color="grey darken-1"
              >
              </v-list-item-avatar>
            </v-list-item>
          </template>
        </v-list>
        <v-card-text class="card-text">
          <v-textarea
            sm="6"
            class="mx-2"
            label="Typing to chat"
            rows="5"
            v-model="message"
            @keydown.enter.exact="sendMessage"
          ></v-textarea>
          <a @click="sendMessage" class="i-con-send">
            <v-icon sm="6" class="mdi mdi-send"></v-icon>
          </a>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import _ from "lodash";
export default {
  data: () => ({
    messages: [
      {
        name: "trivo",
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n 
          Nihil repellendus distinctio similique
           `,
      },
      {
        name: "trivo",
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n 
          Nihil repellendus distinctio similique
           `,
      },
      {
        name: "trivo",
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n 
          Nihil repellendus distinctio similique
           `,
      },
      {
        name: "trivo",
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n 
          Nihil repellendus distinctio similique
           `,
      },
    ],
    message: "",
    loaddMessage: false,
  }),
  mounted: function () {
    this.scrollToEnd();
    this.scroll();
  },
  watch: {
    messages: {
      handler: function () {
        var _this = this;
        setTimeout(function () {
          _this.scrollToEnd();
        });
      },
      deep: true,
    },
  },
  created: function () {
    // console.log(_);
  },
  updated: function () {},
  methods: {
    scrollToEnd: function () {
      var container = this.$el.querySelector("#list-chat");
      container.scrollTop = container.scrollHeight;
    },
    sendMessage() {
      if (!_.isEmpty(this.message) && this.message !== "\n") {
        this.messages.push({ name: "user_name", content: this.message });
      }
      this.message = "";
      this.scrollToEnd();
    },
    scroll() {
      document.getElementById("list-chat").onscroll = () => {
        if (document.getElementById("list-chat").scrollTop === 0) {
          this.loaddMessage = true;
          var _this = this;
          setTimeout(function () {
            _this.loaddMessage = false;
          }, 1000);
        }
      };
    },
  },
};
</script>

<style scoped>
.pre-formatted {
  white-space: pre;
}
.card-text {
  position: relative;
}
.i-con-send {
  position: absolute;
  right: 0;
  top: 50%;
  bottom: 0;
  padding: inherit;
  margin: auto;
}
.m-auto {
  margin: auto;
}
.loading {
  cursor: progress;
}
</style>