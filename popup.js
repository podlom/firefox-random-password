function getCheckboxValue(checkboxId) {
  let checkbox = document.getElementById(checkboxId);
  return checkbox && checkbox.checked ? 1 : 0;
}

// Функція для кросбраузерного виклику sendMessage
const sendMessage = (params) => {
  return (browser && browser.runtime && browser.runtime.sendMessage)
      ? browser.runtime.sendMessage(params)
      : chrome.runtime.sendMessage(params);
};

document.addEventListener("DOMContentLoaded", function() {
  let requestButton = document.getElementById("requestButton");
  let resultContainer = document.getElementById("resultContainer");

  console.log("Елементи форми:", {
    lenInput: document.getElementById("len"),
    requestButton,
    resultContainer
  });

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

    console.log("Кнопка натиснута, відправка запиту:", params);

    sendMessage(params).then(response => {
      console.log("Відповідь від бекграунду:", response);

      if (!response || response.success === false) {
        resultContainer.textContent = "Error: " + (response?.error || "Unknown error");
        return;
      }

      try {
        let jsonResponse = JSON.parse(response.data);
        console.log("JSON відповідь:", jsonResponse);
        resultContainer.textContent = jsonResponse.randomPassword;
      } catch (e) {
        console.error("Помилка парсингу JSON:", e);
        resultContainer.textContent = "Invalid server response";
      }

      document.getElementById("resultH1").classList.remove("ts-hidden");
    }).catch(error => {
      console.error("Помилка відправки повідомлення:", error);
      resultContainer.textContent = "Error: " + error.message;
    });
  });
});
