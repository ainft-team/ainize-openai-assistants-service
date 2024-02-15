const Slack = require("slack-node");

const { SLACK_WEBHOOK_TOKEN, SLACK_CHANNEL_NAME } = require('./env');

const slack = new Slack();
slack.setWebhook(`https://hooks.slack.com/services/${SLACK_WEBHOOK_TOKEN}`);

const sendSlackMsg = (message, errObject) => {
  try {
    slack.webhook({
      channel: SLACK_CHANNEL_NAME,
      icon_emoji: ':dragon:',
      username: 'AINFT dragon',
      text: `${message}` + (errObject ? `\n\`\`\` ${JSON.stringify(errObject, null, 2)} \`\`\``: ''),
    }, (err) => {
      if (err)
        logger.error('Failed to send a slack message:', err);
    });
  } catch (e) {
    logger.error('Error while sending slack message:', e);
  }
};

module.exports = {
  sendSlackMsg
};
