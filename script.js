let choose_lang = document.getElementById('lang');
let change_lang = document.getElementById('change');
chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, (tabs) => {
    function changeLang() {
        next_lang = document.getElementById('lang').value;
        if (typeof cur_lang !== 'undefined' && cur_lang.length > 0 || next_lang.length == 0) {
            chrome.tabs.update(tabs[0].id, { url: tabs[0].url.replace("&hl=" + cur_lang, "") })
        } else if (typeof next_lang !== 'undefined') {
            chrome.tabs.update(tabs[0].id, { url: tabs[0].url + '&hl=' + next_lang })
        }
    }
    choose_lang.addEventListener('change', changeLang, false);
    change_lang.addEventListener('click', changeLang, false);

    query = tabs[0].url.split("?")[1].split("&");
    cur_lang = "";
    query.forEach(function (q) {
        if (q.split("=")[0] == "hl") {
            cur_lang = q.split("=")[1];
        }
    });
    if (cur_lang != "") {
        $("select.id").value = cur_lang;
    }
})
