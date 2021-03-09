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
        <v-row>
          <v-col
            cols="3"
            style="position: relative; margin: auto; text-align: center"
          >
            <v-row>
              <v-col cols="4">
                <button>
                  <v-icon class="mdi mdi-emoticon-happy-outline"></v-icon>
                </button>
              </v-col>
              <v-col cols="4">
                <button>
                  <v-icon class="mdi mdi-file-link"></v-icon>
                </button>
              </v-col>
              <v-col cols="4">
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
          <v-col cols="9">
            <v-card-text class="card-text">
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
  created: function () {
    // console.log(_);
  },
  updated: function () {},
  methods: {
    recordAudio() {
      var device = navigator.mediaDevices.getUserMedia({ audio: true });
      device.then((stream) => {
        // use this!
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
      // audio.setAttribute("src", url);
      // var a = document.createElement("a");
      // document.body.appendChild(a);
      // a.style = "display: none";
      // a.href = url;
      // a.download = "test.mp3";
      // a.click();
      // window.URL.revokeObjectURL(url);
    },
    scrollToEnd: function () {
      var container = this.$el.querySelector("#list-chat");
      container.scrollTop = container.scrollHeight;
    },
    sendMessage() {
      if (!_.isEmpty(this.message) && this.message !== "\n") {
        this.messages.push({ name: "user_name", content: this.message });
        this.message = null;
      }
      if (!_.isEmpty(this.fileMessageAudio)) {
        this.messages.push({
          name: "user_name",
          content: this.fileMessageAudio,
        });
        this.fileMessageAudio = null;
        document.getElementById("main-audio").src = "";
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
  top: 23%;
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
.audio-send {
  position: absolute;
  left: 8%;
  z-index: 1;
  top: 22%;
}
#main-audio {
  width: 177px;
  height: 40px;
}
@media only screen and (min-width: 768px) {
  .audio-send {
    left: 10%;
    top: 22%;
  }
}
@media only screen and (max-width: 414px) {
  .audio-send {
    left: 10%;
    top: 0%;
  }
}
@media only screen and (max-width: 320px) {
  .audio-send {
    left: -4%;
  }
  #main-audio {
    width: 132px;
  }
}
</style>