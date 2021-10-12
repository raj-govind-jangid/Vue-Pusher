<template>
  <div class="hello" style="width: 100%">
    <v-layout row align-center>
      <div v-for="(member, index) of members" :key="index">
        <v-tooltip top>
          <v-avatar color="teal" v-on="tooltip.on" slot="activator">
            <span class="white--text headline">{{ member[0] }}</span>
          </v-avatar>
          <span v-if="member === me">{{ member }} (me)</span>
          <span v-else>{{ member }}</span>
        </v-tooltip>
      </div>
    </v-layout>
    <v-container
      id="scroll-target"
      style="height: 400px; overflow: auto;"
      class="scroll-y"
    >
      <v-layout column align-start justify-start fill-height>
        <v-list subheader style="width: 100%;height: 100%">
          <div v-for="(item, index) in messages" :key="index">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.msg"></v-list-tile-title>
                <v-list-tile-sub-title>
                  <span class="text--primary">{{ item.user }}</span> -
                  <v-tooltip top>
                    <span> {{ item.ts.toJSON() }} </span>
                    <span v-on="tooltip.on" slot="activator">
                      <timeago :datetime="item.ts" :auto-update="20" />
                    </span>
                  </v-tooltip>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset />
          </div>
          <div v-if="messages.length === 0">
            No messages yet, go ahead and send something!
          </div>
        </v-list>
      </v-layout>
    </v-container>
    <v-layout row align-center>
      <v-flex xs10>
        <v-text-field
          v-model="draft"
          hide-details
          label="Type your message"
          solo
          v-on:keydown="handleKeydown"
        ></v-text-field>
      </v-flex>
      <v-flex xs2>
        <v-btn large v-on:click="send" :disabled="draft === ''">Send</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import qs from 'querystring';
import uniq from 'lodash.uniq';
const AUTH_ENDPOINT = 'https://pusher-auth.now.sh';

export default {
  name: 'ChatMessages',
  mounted() {
    this.$pusher.connection.bind('state_change', function(states) {
      console.log('state.current=%s', states.current);
    });
    this.channel = this.$pusher.subscribe('chat');
    this.presenceChannel = this.$pusher.subscribe('presence-chat');
    this.channel.bind('message', obj => {
      this.messages.push({
        ...obj,
        ts: new Date(+obj.ts)
      });
    });
    this.presenceChannel
      .bind('pusher:subscription_succeeded', members => {
        const list = [];
        members.each(function(member) {
          // for example:
          list.push(member.id);
        });
        this.members = list;
        this.me = members.me.id;
      })
      .bind('pusher:member_added', member => {
        this.members = uniq(this.members.concat(member.id));
      })
      .bind('pusher:member_removed', member => {
        this.members = this.members.filter(m => m !== member.id);
      });
    this.channel.bind('pusher:subscription_succeeded', () => {
      //this.send('makákó');
    });
  },
  methods: {
    handleKeydown(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        this.send();
      }
    },
    send() {
      const query = {
        msg: this.draft,
        ts: Date.now(),
        user: this.me
      };
      fetch(`${AUTH_ENDPOINT}/message?${qs.stringify(query)}`);
      this.draft = '';
    }
  },
  data() {
    return {
      me: null,
      members: [],
      draft: '',
      tooltip: {},
      messages: [],
      messages1: [
        {
          msg: 'Hello folks',
          ts: 1549981451520,
          user: 'peter'
        },
        {
          ts: 1549981696520,
          msg: 'Hey peeps',
          user: 'stewie'
        },
        {
          ts: 1549981816520,
          msg: 'hello darling',
          user: 'lois'
        }
      ].map(item => ({
        ...item,
        ts: new Date(item.ts)
      }))
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
