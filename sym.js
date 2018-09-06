$(document).ready(function () {
    var woodDict = {
        "siodma": () => {
            let os = new Array(Math.floor((Math.random() * 10) + 3)).join("Ó");
            let as = new Array(Math.floor((Math.random() * 8) + 2)).join("A");
            return `SI${os}DM${as}AAAAAAAA!!!`
        },
        "zarazbedzieciemno": () => {
            return "ZAMKNIJ SIĘ!!!"
        },
        "andrzej": () => {
            let es = new Array(Math.floor((Math.random() * 8) + 2)).join("E");
            return `ANDRZ${es}J!!!`
        }
    }

    var statusMsgs = ["Free hugs", "Zbieram na powrót do domu", "Zbieram uran dla Jurka", "Pomocy! Trzeźwieję!", "Kupię zioło", "SIÓÓÓÓÓÓDMAAAAAAAA!!!", "zaraz bedzie ciemno...", "ANDRZEEEEEEJ!!!"];

    var users = ["Jakiś radom", "Jurek Owsiak", "Konik", "Kuba", "Emil", "Kwieciu", "MichałGzyl", "Zjarany punk", "Jezus", "Typowy woodstockowicz"]

    async function sendMessage() {
        let submittedText = $("#messageText").val();
        if (submittedText) {
            postMessage("Ty", submittedText);
            $("#messageText").val("");
            postResponse(submittedText);
        }
    }

    async function postResponse(submittedText) {
        let timeout = Math.random() * 2000;
        await new Promise(resolve => setTimeout(resolve, timeout));

        let val = translate(submittedText);
        if(val in woodDict) {
            let randomUser = users[Math.floor(Math.random()*users.length)];
            postMessage(randomUser, woodDict[val]());
        }
    }

    function postMessage(user, msg) {
        $("#history ul").append('<li><div class="pull-left"><strong>' + user + ': </strong><span>' + msg + '</span></div></li>');
    }

    function translate(input) {
        let normalized = input.toLowerCase().replace(/ó/g, "o").replace(/ę/g, "e").replace(/[^a-z]/g,'');
        console.log(normalized);
        let output = "";
        let it = normalized[Symbol.iterator]();
        let char = it.next();

        while(!char.done) {
            if(char.value != output[output.length-1]) {
                output += char.value;
            }
            char = it.next();
        }
        return output;
    }

    function initPanel() {
        let randomMessage = statusMsgs[Math.floor(Math.random() * statusMsgs.length)];
        postMessage("Typowy woodstockowicz", randomMessage);
    }

    initPanel();
    $("#myForm").submit(function( event ) {
        sendMessage();
        event.preventDefault();
      });
});