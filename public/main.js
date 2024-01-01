
const callApi = () => {
  document.getElementById("loader").classList.remove("hidden");

  let description = document.getElementById("description").value;
  let tone = document.getElementById("tone").value;
  let length = document.getElementById("length").value;

  fetch('/generate-tweets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },body:JSON.stringify({
      message:{
        'description': description,
        'tone' : tone,
         'length' : length
      }
  })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const tweet1 = JSON.parse(data).tweet1;
      const tweet2 = JSON.parse(data).tweet2;
      const tweet3 = JSON.parse(data).tweet3;
      document.getElementById("loader").classList.add("hidden");
      document.getElementById("final-answer").classList.remove("hidden");
      document.getElementById("first-result").textContent = tweet1;
      document.getElementById("second-result").textContent = tweet2;
      document.getElementById("third-result").textContent = tweet3;
      document.getElementById("results").scrollIntoView({ behavior: "smooth" });
    })
    .catch(error => {
      console.error('Fetch error:', error);
      // Handle errors here
    });
  
};

function validateForm(){
  var descriptionInput = document.getElementById("description");

  if (descriptionInput.value == "") {
    descriptionInput.classList.add("error-border");
    descriptionInput.placeholder = 'Please enter a description';
    descriptionInput.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });

    return false; 
  } else {
    if(descriptionInput.classList.contains("error-border")){
      descriptionInput.classList.remove("error-border");
    }
  scrollToDiv();
  callApi();


}
}
  

function scrollToDiv() {
  var element = document.querySelector('.scroll-here');

  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}



function copyTextToClipboard(elementId) {
  console.log(elementId)
  var element = document.getElementById(elementId);
  if(elementId == 'first-result'){
    var copyMessage = document.getElementById("clipboard-first")
  } else if(elementId =='second-result') {
    var copyMessage = document.getElementById("clipboard-second")
  } else {
    var copyMessage = document.getElementById("clipboard-third")
  }
  var copyInput = document.getElementById("hidden-input");

  if (element) {
    var textToCopy = element.textContent;
    copyInput.value = textToCopy;
    copyInput.select();

    navigator.clipboard.writeText(textToCopy).then(
      function () {
        console.log("Text successfully copied to clipboard");

        // Show the copy success message
        copyMessage.textContent = "Copied!";
        copyMessage.classList.remove("hidden");

        // Hide the message after 2 seconds
        setTimeout(function () {
          copyMessage.classList.add("hidden");
        }, 2000);
      });

      //
      try {
        document.execCommand("copy");
        console.log("Text successfully copied to clipboard");

              copyMessage.textContent = "Copied!";
              copyMessage.classList.remove("hidden");
    
              setTimeout(function () {
                copyMessage.classList.add("hidden");
              }, 2000);
      } catch (err) {
        console.error("Unable to copy text to clipboard", err);
        alert("Copy to clipboard is not supported on your device.");
      }
}}
