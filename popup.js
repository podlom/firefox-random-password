function getCheckboxValue(checkboxId) {
  let checkbox = document.getElementById(checkboxId);
  return checkbox && checkbox.checked ? 1 : 0;
}

document.addEventListener("DOMContentLoaded", function() {
  let requestButton = document.getElementById("requestButton");
  let resultContainer = document.getElementById("resultContainer");

  requestButton.addEventListener("click", function(event) {
    event.preventDefault();

    let lenInput = document.getElementById("len");

    let params = {
      action: "makeRequest",
      url: "https://rndpwd.shkodenko.com",
      len: lenInput.value,
      lower: getCheckboxValue("lower"),
      upper: getCheckboxValue("upper"),
      digit: getCheckboxValue("digit"),
      special: getCheckboxValue("special"),
      bracket: getCheckboxValue("bracket"),
      punctuation: getCheckboxValue("punctuation")
    };

    browser.runtime.sendMessage(params).then(response => {
      if (!response || response.success === false) {
        resultContainer.textContent = "Error: " + (response?.error || "Unknown error");
        return;
      }

      try {
        let jsonResponse = JSON.parse(response.data);
        resultContainer.textContent = jsonResponse.randomPassword;
      } catch (e) {
        resultContainer.textContent = "Invalid server response";
      }

      document.getElementById("resultH1").classList.remove("ts-hidden");
    }).catch(error => {
      resultContainer.textContent = "Error: " + error.message;
    });
  });
});
