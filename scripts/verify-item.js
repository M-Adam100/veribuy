console.log("Running Script");


(async () => {

    const checkVerification = () => {
        return document.querySelectorAll('[aria-label="verified-icon"')[1];
    }

    chrome.storage.local.get(['extensionStatus'], (CS) => {
        if (CS?.extensionStatus) {
            const div = document.createElement("div");
            div.id = 'myModal';
            div.className = 'modal'
            div.innerHTML = ` <div class="modal-content">
            <div id="header" class="modal-header">
              <span class="close">&times;</span>
              <h2>NFT Verification</h2>
            </div>
            <div class="modal-body">
              <p id="item-status">Item Verified</p>
              <p id="item-message">We double checked the NFT for you. You can continue with ease :)</p>
            </div>
          </div>
          `
        
          document.body.append(div);
        
            const modal = document.getElementById("myModal");
        
            const span = document.getElementsByClassName("close")[0];
    
            span.onclick = function () {
                modal.style.display = "none";
            }

            const startWorking = () => {
                const interval = setInterval(() => {
                    if (document.querySelector('[aria-modal]')) {
                        if (document.querySelector('[aria-modal]').querySelector('header')) {
                        clearInterval(interval);
                       if (!checkVerification()) {
                        document.querySelector('p#item-status').innerText = "Item Not Verified";
                        document.querySelector('p#item-message').innerText = "We double checked the NFT for you and it was not verifed. Please, Continue at your own risk.";
                        document.querySelector('div#header').style.backgroundColor = 'red';
                        modal.style.display = "block";
                       } else {
                        modal.style.display = "block";
                        window.onclick = function () {
                            modal.style.display = "none";
    
                        }
                       }
                           
            
                        }
                    }
                }, 300);
            }

            startWorking();
        
          
        }
    })
   


})()