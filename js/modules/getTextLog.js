import { LOGS } from "../data.js";
import { getRandom, getTime } from "../utils.js";

const getTextLog = function (type, playerName1, playerName2) {
  switch (type) {
    case "start":
      return LOGS[type]
        .replace("[time]", getTime())
        .replace("[player1]", playerName1)
        .replace("[player2]", playerName2);
      break;
    case "end":
      return LOGS[type][getRandom(LOGS[type].length - 1)]
        .replace("[playerWins]", playerName1)
        .replace("[playerLose]", playerName2);
      break;
    case "hit":
      return LOGS[type][getRandom(LOGS[type].length - 1)]
        .replace("[playerKick]", playerName1)
        .replace("[playerDefence]", playerName2);
      break;
    case "defence":
      return LOGS[type][getRandom(LOGS[type].length - 1)]
        .replace("[playerKick]", playerName1)
        .replace("[playerDefence]", playerName2);
      break;
    case "draw":
      return LOGS[type];
      break;
  }
};

export { getTextLog };
