{
    window.onload = async function () {
        const response = await fetch('https://api2.kametotv.fr/karmine/events');
        const response2 = await fetch('https://api2.kametotv.fr/karmine/events_results');
        const data2 = await response2.json();
        const data = await response.json();
        // launch the function to display the results
        displayResults(data2);
        displayEvents(data);
        document.getElementById('btnEvents').click();
        // add the data to the html page
    }

    // create function displayResults
    function displayResults(data2){
        const results = document.getElementById('results');
        if (data2.length == 0) {
            const resultElement = document.createElement('div');
            resultElement.className = 'd-flex justify-content-center flex-row align-items-center mb-3 rounded-3 px-4 pt-3 pb-3 ';
            resultElement.style.backgroundColor = '#1c243c';
            resultElement.innerHTML = `
            <div class="col-xs-3">
            <h3 class="fw-bold" style="color:#a5a19a;">Aucun résultat à afficher</h3>
            </div>
            `
            results.appendChild(resultElement);
        }
        data2.forEach(result => {
            // create a new element list item for each event and add it to the list
            const resultElement = document.createElement('div');
            resultElement.className = 'd-flex justify-content-center flex-row align-items-center mb-3 rounded-3 px-4';
            resultElement.style.backgroundColor = '#1c243c';
            if (result.competition_name != 'TFT') { // for not display TFT events
            resultElement.innerHTML = `
            <div class="col-xs-3 mt-3">
                <p><a class="hover-url" href="${result.link}" target="_blank">${result.initial}</a></p>
            </div>
            `
            if (result.team_domicile == "null") {
                resultElement.innerHTML += `
                <div class="col-xs-3 ms-5 align-items-start justify-content-center flex-row d-flex mt-3">
                    <p class="ms-2 fw-bold" style="color:#a5a19a;"> ${result.player.split(";")[0]} </p>
                </div>
                `
            }
            else {
                resultElement.innerHTML += `
            <div class="col-xs-3 ms-5 align-items-start justify-content-center flex-row d-flex mt-3">
                <img class="" src="${result.team_domicile}" class="img-fluid" width="25" height="25" id="team-img">
                <p class="ms-2 fw-bold" style="color:#a5a19a;"> VS </p>
                <img class="ms-2" src="${result.team_exterieur}" class="img-fluid" width="25" height="25" id="team-img">
            </div>`
            }
            if (result.score_exterieur == null) {
                resultElement.innerHTML += `
                <div class="col-xs-3 ms-4 fw-bold mt-3" style="color:${result.color};">
                    <p>${result.score_domicile}</p>
                </div>
                `;
            } else {
                resultElement.innerHTML += `
            <div class="col-xs-3 ms-4 fw-bold mt-3" style="color:${result.color};">
                <p>${result.score_domicile} - ${result.score_exterieur}</p>
            </div>
            `;
            }
            resultElement.innerHTML += `
            <div class="col-xs-3 ms-5 fw-bold mt-3" style="color:#a5a19a;">
            <p>${result.start.slice(8, 10)}/${result.start.slice(5, 7)}/${result.start.slice(0, 4)}</p>
        </div>
            `;
            results.appendChild(resultElement);
            }
        });
    }

    function displayEvents(data) {
    const events = document.getElementById('events');
    if (data.length == 0) {
        const eventElement = document.createElement('div');
        eventElement.className = 'd-flex justify-content-center flex-column align-items-center ';
        eventElement.innerHTML = `
        <div class="col-xs-3 d-flex justify-content-center flex-row align-items-center mb-2 rounded-3 px-4 pt-3 pb-3" style="background-color: #1c243c;">
        <h3 class="fw-bold" style="color:#a5a19a;">Aucun événement à venir</h3>
        </div>
        <div class="col-xs-3">
        <p class="fw-bold" style="color:#a5a19a;"><a class="hover-url" href="https://lebluewall.fr/calendar" target="_blank">(voir sur le blue wall)</a></p>
        </div>
        `
        events.appendChild(eventElement);
    }
    data.forEach(event => {
        // create a new element list item for each event and add it to the list
        const eventElement = document.createElement('div');
        eventElement.className = 'd-flex justify-content-center flex-row align-items-center mb-3 rounded-3 px-4';
        eventElement.style.backgroundColor = '#1c243c';
        if (event.competition_name != 'TFT') { // for not display TFT events
        eventElement.innerHTML = `
        <div class="col-xs-3 mt-3">
            <p><a class="hover-url" href="${event.link}" target="_blank">${event.initial}</a></p>
        </div>
        `
        if (event.team_domicile == "null") {
            eventElement.innerHTML += `
            <div class="col-xs-3 ms-5 align-items-start justify-content-center flex-row d-flex mt-3">
                <p class="ms-2 fw-bold" style="color:#a5a19a;"> ${event.player.split(";")[0]} </p>
            </div>
            `
        } else {
            eventElement.innerHTML += `
        <div class="col-xs-3 ms-5 align-items-start justify-content-center flex-row d-flex mt-3">
            <img class="" src="${event.team_domicile}" class="img-fluid" width="25" height="25" id="team-img">
            <p class="ms-2 fw-bold" style="color:#a5a19a;"> VS </p>
            <img class="ms-2" src="${event.team_exterieur}" class="img-fluid" width="25" height="25" id="team-img">
        </div>
        `
        }
        // re set the date to avoid the bug of the date
        let startMoreOneHour = new Date(event.start);
        let endMoreOneHour = new Date(event.end);
        let dateNow = new Date();
        // console log dateNow format : dd/mm/yyyy hh:mm
        let completeDateNow = dateNow.toString().slice(8, 10) + "/" + dateNow.toString().slice(4, 7) + "/" + dateNow.toString().slice(11, 15) + " " + dateNow.toString().slice(16, 21);
        let completeStartMoreOneHour = startMoreOneHour.toString().slice(8, 10) + "/" + startMoreOneHour.toString().slice(4, 7) + "/" + startMoreOneHour.toString().slice(11, 15) + " " + startMoreOneHour.toString().slice(16, 21);
        let completeEndMoreOneHour = endMoreOneHour.toString().slice(8, 10) + "/" + endMoreOneHour.toString().slice(4, 7) + "/" + endMoreOneHour.toString().slice(11, 15) + " " + endMoreOneHour.toString().slice(16, 21);
        // add one hour to the existing date to avoid the bug of the date
        if (completeStartMoreOneHour <= completeDateNow && completeEndMoreOneHour >= completeDateNow) {
            eventElement.innerHTML += `
        <div class="col-xs-3 ms-4 fw-bold mt-3">
            <a class="encours" href="https://www.twitch.tv/kamet0" target="_blank"><p>Match en cours<p/></a>
        </div>
        `
        }
        else if (startMoreOneHour.toString().slice(8, 10) == dateNow.toString().slice(8, 10) && startMoreOneHour.toString().slice(5, 7) == dateNow.toString().slice(5, 7) && startMoreOneHour.toString().slice(0, 4) == dateNow.toString().slice(0, 4)) {
            eventElement.innerHTML += `
        <div class="col-xs-3 ms-4 fw-bold mt-3">
            <p>Aujourd'hui</p>
        </div>
        <div class="col-xs-3 ms-2 fw-bold mt-3" style="color:#a5a19a;">
        <p>${startMoreOneHour.toString().slice(16, 21)} </p>
        </div>
        `
        } else {
            eventElement.innerHTML += `
        <div class="col-xs-3 ms-3 fw-bold mt-3" style="color:#a5a19a;">
            <p>${event.start.slice(8, 10)}/${event.start.slice(5, 7)}/${event.start.slice(0, 4)}</p>
        </div>
        <div class="col-xs-3 ms-2 fw-bold mt-3" style="color:#a5a19a;">
            <p>${startMoreOneHour.toString().slice(16, 21)} </p>
        </div>`}
        eventElement.innerHTML += `
        <button class="btn ms-3 col-xs-3" id="${event.title}" style="background-color: #1c243c; color: #fff;"> <img src="./src/img/addToCalendar.png" alt="Google Agenda Logo" width="25px" height="25px"> </button>

        `;
        events.appendChild(eventElement);
        // add an event listener to the button to save the event in the calendar
        const button = document.getElementById(event.title);
        button.addEventListener('click', () => {
            saveInCalendar(event.title, event.start, event.end, event.competition_name, event.team_domicile, event.team_exterieur, event.link, event.initial);
        });
        let teamImg = document.querySelectorAll('#team-img');
        teamImg.forEach(team => {
            team.addEventListener('mouseover', () => {
               team.title = team.src.replace(/^.*[\\\/]/, '').split(".")[0].replace(/_/g, " ").replace(/-/g, " ").replace(/%20/g, " ")
            })
        })
    }});
    }
    // create function saveInGoogleCalendar
    function saveInCalendar(title, start, end, competition_name, team_domicile, team_exterieur, liquipedia_link, initial) {
        
        //open popup to save in google calendar or in outlook calendar
        const popupDiv = document.createElement('div');
        popupDiv.id = 'all';
        document.body.appendChild(popupDiv);

        // add a button to save in outlook calendar
        const outlookButton = document.createElement('div');
        outlookButton.innerHTML = `
        <h5 class="text-center mb-3" style="color: #fff;">Ajouter à :</h5>
        <button class="btn" id="outlookButton">Outlook Calendar <img src="./src/img/outlookCalendar.png" alt="Outlook Logo" width="25px" height="25px"> </button>
        `;
        popupDiv.appendChild(outlookButton);
        // add an event listener to the button to save the event in the calendar
        const button2 = document.getElementById('outlookButton');
        button2.addEventListener('click', () => {
            return window.open(`https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent&startdt=${start}&enddt=${end}&subject=${title}&body=${competition_name} ${title}+%0ALien liquipedia : ${liquipedia_link}`);
        });

        // add a button to save in google calendar
        const googleButton = document.createElement('div');
        googleButton.id = 'googleButtonDiv';
        googleButton.innerHTML = `
        <button class="btn mt-3" id="googleButton">Google Agenda <img src="./src/img/logoGoogleAgenda.png" alt="Google Agenda Logo" width="40px" height="25px"> </button>
        `;
        popupDiv.appendChild(googleButton);
        // add an event listener to the button to save the event in the calendar
        const button = document.getElementById('googleButton');
        button.addEventListener('click', () => {
        // setup date for google calendar
        start = start.replace(/-/g, '');
        start = start.replace(/:/g, '');
        start = start.replace(/\./g, '');
        end = end.replace(/-/g, '');
        end = end.replace(/:/g, '');
        end = end.replace(/\./g, '');
            return window.open(`https://calendar.google.com/calendar/r/eventedit?text=${title}&dates=${start}/${end}&text=${title}&details=${competition_name} ${title}+%0ALien liquipedia : ${liquipedia_link}&location=&sf=true&output=xml`);
        });
        
        // add an element who take all the extension screen
        const popupClose = document.body.appendChild(document.createElement('div'));
        popupClose.id = 'popupClose';
        popupClose.style.position = 'fixed';
        popupClose.style.top = '0';
        popupClose.style.left = '0';
        popupClose.style.width = '100%';
        popupClose.style.height = '100%';
        popupClose.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        popupClose.style.zIndex = '199';
        // onclick on the popupClose, hide the popup and remove the popupClose
        popupClose.onclick = () => {
            popupClose.remove();
            popupDiv.remove();
        }
//         // for outlook calendar with vcs
//         const vcs = `BEGIN:VCALENDAR
// VERSION:2.0
// PRODID:-//Google Inc//Google Calendar 70.9054//EN
// CALSCALE:GREGORIAN
// METHOD:PUBLISH
// X-WR-CALNAME:KametoTV
// X-WR-TIMEZONE:Europe/Paris
// BEGIN:VTIMEZONE
// TZID:Europe/Paris
// X-LIC-LOCATION:Europe/Paris
// BEGIN:DAYLIGHT
// TZOFFSETFROM:+0100
// TZOFFSETTO:+0200
// TZNAME:CEST
// DTSTART:19700329T020000
// RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU
// END:DAYLIGHT
// BEGIN:STANDARD
// TZOFFSETFROM:+0200
// TZOFFSETTO:+0100
// TZNAME:CET
// DTSTART:19701025T030000
// RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU
// END:STANDARD
// END:VTIMEZONE
// BEGIN:VEVENT
// DTSTART;TZID=Europe/Paris:${start.slice(0, 10)}T${start.slice(11, 16)}:00
// DTEND;TZID=Europe/Paris:${end.slice(0, 10)}T${end.slice(11, 16)}:00
// DTSTAMP:20210722T131000Z
// UID:5f6b5c0c-1c1a-4b1a-9b1a-5f6b5c0c1c1a
// CREATED:20210722T131000Z
// DESCRIPTION:${competition_name} ${title} lien liquipedia : ${liquipedia_link} ${initial}
// LAST-MODIFIED:20210722T131000Z
// LOCATION:
// SEQUENCE:0
// STATUS:CONFIRMED
// SUMMARY:${title}
// TRANSP:OPAQUE
// END:VEVENT
// END:VCALENDAR`;
//         // create a blob to save the file
//         const blob = new Blob([vcs], { type: 'text/calendar' });
//         // create a link to download the file
//         const link = document.createElement('a');
//         link.href = window.URL.createObjectURL(blob);
//         link.download = `${title}.ics`;
//         link.click();
    }
}