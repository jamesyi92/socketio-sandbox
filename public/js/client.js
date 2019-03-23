const chatCtrl = (function (){

  const socket = io();

  const chatMsgHander = () => {
    const form = document.querySelector('form');
    const chatVal = document.querySelector('input.form-control.mb-3');
    form.addEventListener('submit', (e) => {
      if(!chatVal.value.length) {
        return alert('Enter a mesasge please');
      }
      e.preventDefault();
      socket.emit('chat message', chatVal.value);
      chatVal.value = '';
      return false;
    });
  };

  const createMsgBox = (msg, id) => {
    const msgBox = document.createElement('div');
    msgBox.className = 'msgbox animated faster flipInX';

    const msgBoxHead = document.createElement('div');
    const msgBoxId = document.createElement('strong');
    //const msgBoxDate = document.createElement('small');

    msgBoxHead.className = 'msgbox__head';
    msgBoxId.className = 'mr-auto';

    msgBoxId.textContent = id;
    //msgBoxDate.textContent = msgDate;

    msgBoxHead.appendChild(msgBoxId);
    //msgBoxHead.appendChild(msgBoxDate);

    const msgBoxBody = document.createElement('div');
    const msgBoxChatMsg = document.createElement('p');

    msgBoxBody.className = 'msgbox__body';
    msgBoxChatMsg.className = 'mb-0';

    msgBoxChatMsg.textContent = msg;

    msgBoxBody.appendChild(msgBoxChatMsg);

    msgBox.appendChild(msgBoxHead);
    msgBox.appendChild(msgBoxBody);

    return msgBox;
  }

  const printMsgToDOM = () => {
    socket.on('chat message', (msg, id) => {

      const chatBoxWindow = document.querySelector('.chatbox__msg');
      const msgBox = createMsgBox(msg, id);
      

      chatBoxWindow.appendChild(msgBox);

      setTimeout(() => {
        msgBox.className = 'msgbox animated faster fadeOut';
        setTimeout(() => {
          msgBox.style.display = 'none';
        }, 500)
      }, 15000);

    });
  }


  return {
    init: () => {
      chatMsgHander();
      printMsgToDOM();
    }
  }

})();

chatCtrl.init();