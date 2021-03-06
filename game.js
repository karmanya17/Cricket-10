var generatetable = /** @class */ (function () {
    function generatetable(tableClass, team) {
        for (var i = 0; i < 11; i++) {
            var row = document.createElement("tr");
            var table = document.getElementById(tableClass);
           // console.log(table);
            table.appendChild(row);
            for (var j = 0; j < 8; j++) {
                var boxid = "team" + team + "_" + i + "," + j;
                new generatebox(boxid, row, i, j, team);
            }
        }
    }
    return generatetable;
}());
var generatebox = /** @class */ (function () {
    function generatebox(boxid, row, rowno, colno, team) {
        this.id = boxid;
        this.box = document.createElement("td");
        this.box.setAttribute("id", this.id);
        this.box.style.fontWeight = "bold";
        if (rowno == 0 && colno == 0) {
            this.box.innerText = "TEAM " + team;
        }
        if (rowno == 0 && colno > 0 && colno <= 6) {
            this.box.innerHTML = "B " + colno;
        }
        if (colno == 0 && rowno != 0) {
            this.box.innerHTML = "PLAYER " + rowno;
        }
        if (rowno == 0 && colno == 7) {
            this.box.innerText = "TOTAL";
        }
        row.appendChild(this.box);
    }
    return generatebox;
}());
var playinning = /** @class */ (function () {
    function playinning(btn, team, total) {
        var i = 1, j = 1, sum = 0;
        var button = document.getElementById(btn);
        button.onclick = this.play(i, j, sum, team, button, total);
    }
    playinning.prototype.play = function (i, j, sum, team, btn, total) {
        return function () {
            console.log(i + "," + j);
            var run = Math.floor(Math.random() * 6);
            var id = "team" + team + "_" + i + "," + j;
            if (i > 10 && run == 0 || i > 10 && j > 7) {
                btn.disabled = true;
            }
            if (run != 0) {
                if (j > 6) {
                    document.getElementById(id).innerText = sum;
                    i++;
                    j = 1;
                    sum = 0;
                }
                else {
                    document.getElementById(id).innerText = run.toString();
                    sum += run;
                    j++;
                    total += run;
                }
                console.log(total);
                document.getElementById("score" + team).innerText = total;
            }
            else {
                var totalid = "team" + team + "_" + i + ",7";
                document.getElementById(id).innerText = "0";
                //console.log(totalid);
                document.getElementById(totalid).innerText = sum;
                i++;
                j = 1;
                sum = 0;
            }
        };
    };
    return playinning;
}());
var gameplay = /** @class */ (function () {
    function gameplay() {
        var total1 = 0, total2 = 0;
        var start = document.getElementById("start");
        var btn = document.getElementById("btn1");
        start.onclick = this.startgame();
    }
    gameplay.prototype.startgame = function () {
        return function () {
            document.getElementById("btn2").disabled = true;
            document.getElementById("team1").style.backgroundColor = "#38A3A5";
            document.getElementById("team1bat").style.visibility = "visible";
            document.getElementById("team1").classList.add("shadows");
            var timeleft = 60;
            var i = 1;
            var timer = setInterval(function () {
                if (timeleft <= 0) {
                    document.getElementById("btn1").disabled = true;
                    if (i == 2) {
                        document.getElementById("btn2").disabled = true;
                        document.getElementById("start").innerText = "Relaod";
                        document.getElementById("start").setAttribute("id", "reload");
                        new result();
                        clearInterval(timer);
                    }
                    else {
                        document.getElementById("btn2").disabled = false;
                        document.getElementById("team1bat").style.visibility = "hidden";
                        document.getElementById("team2bat").style.visibility = "visible";
                        document.getElementById("team1").classList.remove("shadows");
                        document.getElementById("team2").classList.add("shadows");
                        document.getElementById("team1").style.backgroundColor = "#57CC99";
                        document.getElementById("team2").style.backgroundColor = "#38A3A5";
                        timeleft = 60;
                    }
                    i++;
                    console.log(i);
                }
                if (timeleft > 30 && timeleft < 60) {
                    document.getElementById("time").style.color = "#0C9463";
                }
                else if (timeleft < 30 && timeleft > 10) {
                    document.getElementById("time").style.color = "#F05D23";
                }
                else if (timeleft < 10) {
                    document.getElementById("time").style.color = "#BE0000";
                }
                document.getElementById("time").innerText = timeleft.toString();
                timeleft -= 1;
            }, 1000);
            new playinning("btn1", 1, 0);
            new playinning("btn2", 2, 0);
        };
    };
    return gameplay;
}());
var result = /** @class */ (function () {
    function result() {
        var button = document.getElementById("result");
        button.onclick = this.generateResult();
        var reload = document.getElementById("reload");
        reload.onclick = this.reload();
    }
    result.prototype.generateResult = function () {
        return function () {
            var max1 = 0, max2 = 0;
            var team1playerno = 0, team2playerno = 0;
            var score1 = parseInt(document.getElementById("score1").innerText);
            var score2 = parseInt(document.getElementById("score2").innerText);
            for (var i = 1; i <= 10; i++) {
                var totalscore1 = parseInt(document.getElementById("team1_" + i + ",7").innerText);
                var totalscore2 = parseInt(document.getElementById("team2_" + i + ",7").innerText);
                if (max1 < totalscore1) {
                    max1 = totalscore1;
                    team1playerno = i;
                }
                if (max2 < totalscore2) {
                    max2 = totalscore2;
                    team2playerno = i;
                }
                console.log(totalscore1);
                console.log(totalscore2);
            }
            console.log(score1);
            console.log(score2);
            console.log(max1);
            console.log(max2);
            document.getElementById("team1_" + 1 + ",7");
            if (score1 > score2) {
                document.getElementById("teamwon").innerText = "TEAM 1";
                document.getElementById("MOM").innerText = "Player " + team1playerno;
                document.getElementById("teamname").innerText = "TEAM 1";
                document.getElementById("playerscore").innerText = "Score : " + max1.toString();
            }
            else if (score2 > score1) {
                document.getElementById("teamwon").innerText = "TEAM 2";
                document.getElementById("MOM").innerText = "Player " + team2playerno;
                document.getElementById("teamname").innerText = "TEAM 2";
                document.getElementById("playerscore").innerText = "Score : " + max2.toString();
            }
            else {
                document.getElementById("teamwon").innerText = "DRAW";
                document.getElementById("MOM").innerText = "Player " + team1playerno;
                document.getElementById("teamname").innerText = "TEAM 1";
                document.getElementById("playerscore").innerText = "Score : " + max1.toString();
            }
        };
    };
    result.prototype.reload = function () {
        return function () {
            location.reload();
        };
    };
    return result;
}());
new generatetable("table1", 1);
new generatetable("table2", 2);
new gameplay();
