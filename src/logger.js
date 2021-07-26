/**
 * https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
 * @param {string} message
 * @param {string} color
 * @returns {void}
 */
function colorLogger(message, color = 'default') {
  const COLORS = {
    default: '',
    resetter: '\x1b[0m',
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
  };

  console.log(COLORS[color] + message + COLORS.resetter);
}

exports.log = {
  /**
   * @param {string} message
   * @param {string} color
   * @returns {void}
   */
  success(message, color) {
    colorLogger(`\n${message}`, color);
  },
  /**
   * @param {string} message
   * @returns {void}
   */
  error(message) {
    colorLogger(`\nERROR: ${message}`, 'red');
    process.exit(0);
  },
};
