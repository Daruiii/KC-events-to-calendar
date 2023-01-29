{
    window.onload = async function () {
        const response = await fetch('https://api2.kametotv.fr/karmine/events');
        const data = await response.json();
        // add the data to the html page
        const events = document.getElementById('events');
        data.forEach(event => {
            // create a new element list item for each event and add it to the list
            const eventElement = document.createElement('div');
            eventElement.className = 'd-flex justify-content-between flex-row align-items-center mb-3 rounded-3 pt-3 px-5';
            eventElement.style.backgroundColor = '#1c243c';
            eventElement.innerHTML = `
            <div class="col-xs-3">
                <p><a class="hover-url" href="${event.link}" target="_blank">${event.initial}</a></p>
            </div>
            <div class="col-xs-3 d-flex justify-content-between flex-row align-items-center mb-3 ms-3">
                <img class="ms-3" src="${event.team_domicile}" class="img-fluid" width="25" height="25">
                <p class="mt-3 ms-2 fw-bold" style="color:#a5a19a;"> VS </p>
                <img class="ms-2" src="${event.team_exterieur}" class="img-fluid" width="25" height="25">
            </div>
            <div class="col-xs-3 ms-3 fw-bold" style="color:#a5a19a;">
                <p>${event.start.slice(0, 10).replace(/-/g, '/')}</p>
            </div>
            <div class="col-xs-3 ms-2 fw-bold" style="color:#a5a19a;">
                <p>${event.end.slice(11, 16)}</p>
            </div>
            <button class="btn ms-3 col-xs-3 mb-3" id="${event.title}" style="background-color: #1c243c; color: #fff;"> <img src="./src/img/addToCalendar.png" alt="Google Agenda Logo" width="25px" height="25px"> </button>

            `;
            events.appendChild(eventElement);
            // add an event listener to the button to save the event in the calendar
            const button = document.getElementById(event.title);
            button.addEventListener('click', () => {
                saveInCalendar(event.title, event.start, event.end, event.competition_name, event.team_domicile, event.team_exterieur, event.link, event.initial);
            });
        });
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
        <button class="btn" id="outlookButton" style="background-color: #1c243c; color: #fff;">Outlook Calendar <img src="./src/img/outlookCalendar.png" alt="Outlook Logo" width="25px" height="25px"> </button>
        `;
        popupDiv.appendChild(outlookButton);
        // add an event listener to the button to save the event in the calendar
        const button2 = document.getElementById('outlookButton');
        button2.addEventListener('click', () => {
            return window.open(`https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent&startdt=${start}&enddt=${end}&subject=${title}&body=${competition_name} ${title}+%0ALien liquipedia : ${liquipedia_link}`);
        });

        // add a button to save in google calendar
        const googleButton = document.createElement('div');
        googleButton.id = 'googleButton';
        googleButton.innerHTML = `
        <button class="btn mt-3" id="googleButton" style="background-color: #1c243c; color: #fff;">Google Agenda <img src="./src/img/logoGoogleAgenda.png" alt="Google Agenda Logo" width="40px" height="25px"> </button>
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