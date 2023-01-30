{
    // onclick event on the button #btnEvents to show the events div #events
    document.getElementById('btnEvents').addEventListener('click', () => {
        document.getElementById('eventsDiv').style.display = 'block';
        document.getElementById('resultsDiv').style.display = 'none';
        // style for the buttons
        document.getElementById('btnEvents').style.backgroundColor = '#04ccfc';
        document.getElementById('btnEvents').style.color = '#1b3fa6';
        document.getElementById('btnResults').style.backgroundColor = '#1d253c';
        document.getElementById('btnResults').style.color = '#fff';
        // hover btnResults
        document.getElementById('btnResults').addEventListener('mouseover', () => {
            document.getElementById('btnResults').style.backgroundColor = '#04ccfc';
            document.getElementById('btnResults').style.color = '#1b3fa6';
        });
        document.getElementById('btnResults').addEventListener('mouseout', () => {
            document.getElementById('btnResults').style.backgroundColor = '#1d253c';
            document.getElementById('btnResults').style.color = '#fff';
        });
        // hover btnEvents
        document.getElementById('btnEvents').addEventListener('mouseover', () => {
            document.getElementById('btnEvents').style.backgroundColor = '#04ccfc';
            document.getElementById('btnEvents').style.color = '#1b3fa6';
        });
        document.getElementById('btnEvents').addEventListener('mouseout', () => {
            document.getElementById('btnEvents').style.backgroundColor = '#04ccfc';
            document.getElementById('btnEvents').style.color = '#1b3fa6';
        });
    });
    // event listener on the button #btnResults to show the results div #results
    document.getElementById('btnResults').addEventListener('click', () => {
        document.getElementById('eventsDiv').style.display = 'none';
        document.getElementById('resultsDiv').style.display = 'block';
        // style for the buttons
        document.getElementById('btnEvents').style.backgroundColor = '#1d253c';
        document.getElementById('btnEvents').style.color = '#fff';
        document.getElementById('btnResults').style.backgroundColor = '#04ccfc';
        document.getElementById('btnResults').style.color = '#1b3fa6';
        // hover btnEvents
        document.getElementById('btnEvents').addEventListener('mouseover', () => {
            document.getElementById('btnEvents').style.backgroundColor = '#04ccfc';
            document.getElementById('btnEvents').style.color = '#1b3fa6';
        });
        document.getElementById('btnEvents').addEventListener('mouseout', () => {
            document.getElementById('btnEvents').style.backgroundColor = '#1d253c';
            document.getElementById('btnEvents').style.color = '#fff';
        });
        // hover btnResults
        document.getElementById('btnResults').addEventListener('mouseover', () => {
            document.getElementById('btnResults').style.backgroundColor = '#04ccfc';
            document.getElementById('btnResults').style.color = '#1b3fa6';
        });
        document.getElementById('btnResults').addEventListener('mouseout', () => {
            document.getElementById('btnResults').style.backgroundColor = '#04ccfc';
            document.getElementById('btnResults').style.color = '#1b3fa6';
    });
    });
    
}