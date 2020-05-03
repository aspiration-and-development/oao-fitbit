import { settingsStorage } from "settings";
import * as messaging from "messaging";

settingsStorage.onchange = function({key, newValue}) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    const parsedData = JSON.parse(newValue);
    const value = parsedData.values ? parsedData.values[0].value : parsedData
    messaging.peerSocket.send({ 
      key, value
    });
  }
};
