browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "makeRequest") {
    let params = new URLSearchParams();
    params.append('len', request.len);
    params.append('lower', request.lower);
    params.append('upper', request.upper);
    params.append('digit', request.digit);
    params.append('special', request.special);
    params.append('bracket', request.bracket);
    params.append('punctuation', request.punctuation);

    fetch(request.url, {
      method: 'POST',
      body: params
    })
        .then(response => response.text())
        .then(data => sendResponse({ success: true, data: data }))
        .catch(error => sendResponse({ success: false, error: error.message }));

    return true; // Асинхронна відповідь
  }
});
