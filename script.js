let choose_lang = document.getElementById('lang');
chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, (tabs) => {
    function closeIfNotGoogle() {
        if (tabs[0].url.indexOf("https://www.google.com/search?")) {
            window.close();
        }
    }
    function changeLang() {
        next_url = tabs[0].url.replace(/&hl=[a-zA-Z-]{2,5}/g, "");
        next_lang = document.getElementById('lang').value;
        if (typeof next_lang !== 'undefined' && next_lang.length > 0) {
            next_url += '&hl=' + next_lang;
        }
        chrome.tabs.update(tabs[0].id, { url: next_url })
    }
    function activeLang() {
        query = tabs[0].url.split("?")[1].split("&");
        query.forEach(function (q) {
            if (q.split("=")[0] == "hl") {
                cur_lang = q.split("=")[1];
            }
        });
        if (typeof cur_lang !== 'undefined' && cur_lang.length > 0) {
            document.getElementById("lang").querySelector("option[value='"+cur_lang+"']").setAttribute("selected", "selected");
        } else {
            document.getElementById("lang").options[0].setAttribute("selected", "selected");
        }
    }
    closeIfNotGoogle();
    choose_lang.addEventListener('change', changeLang, false);
    activeLang();
})
