module.exports = {
  "tags": {
    "allowUnknownTags": true
  },
  "opts": {
    "destination": "./docs/developer/server"
  },
  "plugins": [
    "plugins/markdown"
  ],
  "templates": {
    "systemName": "IOTStateSync Client",
    "cleverLinks": false,
    "monospaceLinks": false,
    "default": {
      "outputSourceFiles": true
    },
    "path": "ink-docstrap",
    "theme": "flatly",
    "navType": "inline",
    "linenums": true,
    "dateFormat": "MMMM Do YYYY, h:mm:ss a"
  }
}
