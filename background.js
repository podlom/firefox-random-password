browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("📩 Отримано повідомлення у background.js:", request);

  if (request.action === "makeRequest") {
    console.log("🔄 Виконуємо fetch-запит...");

    let params = new URLSearchParams();
    params.append('len', request.len);
    params.append('lower', request.lower);
    params.append('upper', request.upper);
    params.append('digit', request.digit);
    params.append('special', request.special);
    params.append('bracket', request.bracket);
    params.append('punctuation', request.punctuation);

    console.log("🌐 Виконуємо запит до API:", request.url);

    fetch(request.url, {
      method: 'POST',
      body: params
    })
        .then(response => response.text())
        .then(data => {
          console.log("✅ Отримано відповідь від сервера:", data);
          sendResponse({ success: true, data: data });
        })
        .catch(error => {
          console.error("❌ Помилка запиту:", error);
          sendResponse({ success: false, error: error.message });
        });

    return true; // Важливо для асинхронної обробки
  }
});
