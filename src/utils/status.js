module.exports = {
  members: [],
  teamLimit: 1,
  splitChannelId: null,
  events: {
    command: {
      TEAM_SPLIT: "split_team",
      TEAM_CAHNNEL_CHOICE: "split_channel_setting",
      INFORMATION: "information",
    },
    button: {
      DELETE: "delete",
      ADD: "add",
      START: "start",
    },
    modal: {
      TEAM_CHANNEL_SETTING: "team-channel-setting",
    },
  },
};
