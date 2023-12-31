
const callApi = () => {
  console.log("Inside callapi");
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
    console.log(JSON.parse(data));
    const tweet1 = JSON.parse(data).tweet1;
    const tweet2 = JSON.parse(data).tweet2;
    document.getElementById("loader").classList.add("hidden");
    console.log('GET successful:', data);
    document.getElementById("final-answer").classList.remove("hidden");
    document.getElementById("first-result").textContent = tweet1;
    document.getElementById("second-result").textContent = tweet2;
    document.getElementById("results").scrollIntoView({ behavior: "smooth" });
    // Handle the created post data as needed
  })
  .catch(error => {
    console.error('Fetch error:', error);
    // Handle errors here
  });

};


function copyTextToClipboard(elementId) {
console.log(elementId)
var element = document.getElementById(elementId);
if(elementId == 'first-result'){
var copyMessage = document.getElementById("clipboard-first")
} else{
  var copyMessage = document.getElementById("clipboard-second")
}
var copyInput = document.getElementById("hidden-input");

if (element) {
  var textToCopy = element.textContent;
  copyInput.value = textToCopy;
  copyInput.select();

  navigator.clipboard.writeText(textToCopy).then(
    function () {
      console.log("Text successfully copied to clipboard");
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
