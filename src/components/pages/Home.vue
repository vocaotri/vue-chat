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
          style="border-bottom: 1px solid #e8e8e8"
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
        <v-row>
          <v-col
            style="position: relative; margin: auto; text-align: center"
            sm="4"
            cols="12"
            class="pb-0"
          >
            <v-row>
              <v-col cols="4" class="pb-0">
                <button>
                  <v-icon class="mdi mdi-emoticon-happy-outline"></v-icon>
                </button>
              </v-col>
              <v-col cols="4" class="pb-0">
                <button>
                  <v-file-input
                    show-size
                    label="File input"
                    accept="image/x-png,image/gif,image/jpeg"
                    prepend-icon="mdi mdi-file-link"
                    class="choses-file"
                  />
                </button>
              </v-col>
              <v-col cols="4" class="pb-0">
                <button @click="recordAudio" v-if="recorder == null">
                  <v-icon class="mdi mdi-microphone"></v-icon>
                </button>
                <button
                  v-else
                  type="button"
                  id="button_stop"
                  class="btn btn-success"
                  @click="stop"
                >
                  <v-icon class="mdi mdi-microphone-off"></v-icon>
                </button>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="pt-0" sm="8" cols="12">
            <v-card-text class="card-text xs-pt-0">
              <div class="audio-send" v-show="fileMessageAudio">
                <audio id="main-audio" controls src=""></audio>
                <button
                  style="position: absolute; top: 14%"
                  @click="closeFileAudio"
                >
                  <v-icon class="mdi mdi-close-circle"></v-icon>
                </button>
              </div>
              <v-textarea
                sm="6"
                class="mx-2"
                label="Aa"
                rows="1"
                v-model="message"
                auto-grow
                @keydown.enter.exact="sendMessage"
                style="width: 95%; max-height: 250px"
              ></v-textarea>
              <a @click="sendMessage" class="i-con-send">
                <v-icon sm="6" class="mdi mdi-send"></v-icon>
              </a>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import _ from "lodash";
import "@/assets/css/chat-box.css";
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
    fileMessageAudio: "",
    loaddMessage: false,
    recorder: null,
    recordedChunks: [],
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
  created: function () {},
  updated: function () {},
  methods: {
    recordAudio() {
      var device = navigator.mediaDevices.getUserMedia({ audio: true });
      device.then((stream) => {
        this.recorder = new MediaRecorder(stream);
        this.recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
            this.download();
          } else {
            // ...
          }
        };
        this.recorder.start();
      });
    },
    stop() {
      this.recorder.stop();
      this.recorder = null;
    },
    closeFileAudio() {
      this.fileMessageAudio = null;
      document.getElementById("main-audio").src = "";
    },
    download() {
      var blob = new Blob(this.recordedChunks, {
        type: "audio/mp3",
      });
      var url = URL.createObjectURL(blob);
      document.getElementById("main-audio").src = url;
      this.fileMessageAudio = `<audio controls src="${url}"></audio>`;
    },
    scrollToEnd: function () {
      var container = this.$el.querySelector("#list-chat");
      container.scrollTop = container.scrollHeight;
    },
    sendMessage() {
      if (!_.isEmpty(this.fileMessageAudio)) {
        this.messages.push({
          name: "user_name",
          content: this.fileMessageAudio,
        });
        this.fileMessageAudio = null;
        document.getElementById("main-audio").src = "";
      }
      if (!_.isEmpty(this.message) && this.message !== "\n") {
        this.messages.push({ name: "user_name", content: this.message });
        this.message = null;
      }
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
