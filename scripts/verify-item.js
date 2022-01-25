console.log("Running Script");


(async () => {


    

    const div = document.createElement("div");
    div.id = 'myModal';
    div.className = 'modal'
    div.innerHTML = ` <div class="modal-content">
    <div class="modal-header">
      <span class="close">&times;</span>
      <h2>NFT Verification</h2>
    </div>
    <div class="modal-body">
      <p>Item Verified</p>
      <p>You can go ahead without any risk :)</p>
    </div>
  </div>
  `

  document.body.append(div);

    var modal = document.getElementById("myModal");

    var span = document.getElementsByClassName("close")[0];



    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    const interval = setInterval(() => {
        if (document.querySelector('[aria-modal]')) {
            if (document.querySelector('[aria-modal]').querySelector('header')) {
            clearInterval(interval);
                modal.style.display = "block";

            }
        }
    }, 300);


})()