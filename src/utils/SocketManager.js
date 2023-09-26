const WebSocket = require('ws');
class SocketManager{
    constructor() {
      this.wss = null;
    }
  
    updateSocket(socket){
      this.wss = socket;
      console.log('se actualizo la lista de clientes socket');
    }

    sendObjectAll(object){
      this.wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(object));
        }
      });
    }

    static getInstance() {
      if (!this.instance) {
        this.instance = new SocketManager();
      }
      return this.instance;
    }
  }
  
  module.exports = SocketManager.getInstance();