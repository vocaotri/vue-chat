<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-subheader
          ><v-list-item-avatar color="grey darken-1"> </v-list-item-avatar>
          name</v-subheader
        >
        <v-list id="list-chat" two-line height="350px" class="overflow-y-auto">
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
  }),
  mounted: function () {
    this.scrollToEnd();
    this.scroll();
  },
  updated: function () {
    this.scrollToEnd();
  },
  methods: {
    scrollToEnd: function () {
      var container = this.$el.querySelector("#list-chat");
      container.scrollTop = container.scrollHeight;
    },
    sendMessage() {
      this.messages.push({ name: "user_name", content: this.message });
      this.message = "";
    },
    handleScroll: function (e) {
      console.log(e);
      if (e.target.scrollHeight - 300 <= e.target.scrollTop) {
        alert("oi sou Eduardo Martins");
      }
    },
    scroll() {
      document.getElementById("list-chat").onscroll = () => {
        // console.log();
        // let bottomOfWindow =
        //   document.getElementById("list-chat").scrollTop +
        //     window.innerHeight ===
        //   document.getElementById("list-chat").offsetHeight;

        if (document.getElementById("list-chat").scrollTop === 0) {
          alert("ok");
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
</style>