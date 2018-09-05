export function formatPostData(data){
    const params = new URLSearchParams();

    for(let [k, v] of Object.entries(data)){
        params.append(k, v);
    }

    return params;
}


export function convertTime(militaryTime) {
    if (!militaryTime) {
        return;
    }
    var time = militaryTime;
    time = time.split(':');
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var seconds = Number(time[2]);
    var timeValue;
    if (hours > 0 && hours <= 12) {
        timeValue = "" + hours;
    } else if (hours > 12) {
        timeValue = "" + (hours - 12);
    } else if (hours == 0) {
        timeValue = "12";
    }
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
    timeValue += (hours >= 12) ? " P.M." : " A.M.";
    return timeValue;
}


export function convertDateFormat (yyddmm)  {
    var newDate = yyddmm.split('-');
    var returnDate = (newDate[1]) + '-' + newDate[2] + '-' + newDate[0];
    return returnDate;
}

export function parseParameters() {
    var queryObject = {};
    var pair = null;
    var sPageURL = window.location.search.substring(1),
        qArr = sPageURL.split('&');

    for (var i = 0; i < qArr.length; i++) {

        pair = qArr[i].split('=');
        queryObject[pair[0]] = pair[1];
    };
    this.props.get_concert_details(queryObject);
}