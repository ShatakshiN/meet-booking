let selectedSlot = null; // Variable to store the selected slot object

SlotObj1 = {
    time: document.getElementById('time1').textContent,
    link: 'https://meet.google.com/aum-pwzh-kmw'
};

SlotObj2 = {
    time: document.getElementById('time2').textContent,
    link: 'https://meet.google.com/mvx-waza-qhx'
};

function showForm(cardId) {
    var form = document.getElementById('bookingForm');
    form.style.display = 'block';
    // Set the selected slot based on the card ID
    selectedSlot = cardId === 'card1' ? SlotObj1 : SlotObj2;
}

function hideForm() {
    var form = document.getElementById('bookingForm');
    form.style.display = 'none';
}

async function sendData(event) {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;

    const userObj = {
        name,
        email,
        ...selectedSlot,
    };

    try {
        const response = await axios.post('http://localhost:4000/add-users', userObj);
        hideForm();

        const slotButtonId = `button${selectedSlot === SlotObj1 ? '1' : '2'}`;
        const slotButton = document.getElementById(slotButtonId);
        const availableSlots = parseInt(slotButton.textContent.split(' ')[0], 10);
        const parentElem = document.getElementById('listOfUsers');
        const childElem = createCardElement(response.data.userDetails, response.data.slotDetails);

        if ((availableSlots) > 0) {
           
            parentElem.appendChild(childElem);

            slotButton.textContent = `${availableSlots-1} available`;

            if(availableSlots-1===0){
                const cardId = selectedSlot === SlotObj1 ? 'card1' : 'card2';
                const card = document.getElementById(cardId);
                card.style.display = 'none';
            }

        }
    } catch (error) {
        console.log(error);
    }
}

function createCardElement(userDetails, slotDetails) {
    const childElem = document.createElement('li');
    childElem.className = 'card col-md-4';
    childElem.style.width = '18rem';
    

    // Text content with name
    const textContent = document.createTextNode(`Hi, ${userDetails.name}, your meeting is scheduled at ${slotDetails.time}. Please join the meeting: `);

    // Create a hyperlink element
    const linkElem = document.createElement('a');
    linkElem.href = slotDetails.link; // Use the link from the response
    linkElem.textContent = slotDetails.link;
    linkElem.target = '_blank'; // Open link in a new tab

    // Add click event listener to redirect on click
    linkElem.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = slotDetails.link; // Redirect to the link
    });

    childElem.appendChild(textContent);
    childElem.appendChild(document.createElement('br')); 
    childElem.appendChild(linkElem);

    const cancelButton = document.createElement('button');
    const cancelText = document.createTextNode('Cancel');
    cancelButton.id = 'cancelButtonId';
    cancelButton.appendChild(cancelText);
    childElem.appendChild(cancelButton);
    cancelButton.onclick = () => handleCancelButtonClick(childElem,slotDetails.time,userDetails);

    return childElem;
}

function updateAvailableSlots(selectedSlot) {
    const slotButtonId = `button${selectedSlot === SlotObj1 ? '1' : '2'}`;
    const slotButton = document.getElementById(slotButtonId);
    const availableSlots = parseInt(slotButton.textContent.split(' ')[0], 10);

    slotButton.textContent = `${availableSlots - 1} available`;
    
}

function handleCancelButtonClick(obj,slotTime,userDetails) {
    console.log('here');
    const slotButtonId = slotTime === SlotObj1.time ? 'button1' : 'button2';
    const cardId = slotTime === SlotObj1.time ? 'card1' : 'card2';

    const slotButton = document.getElementById(slotButtonId);
    const availableSlots = parseInt(slotButton.textContent.split(' ')[0], 10);

    if ((availableSlots) === 0) {
        console.log('here')
        // If the available slots reach 0, hide the card
        const card = document.getElementById(cardId);
        card.style.display = 'block';
        slotButton.textContent = `${availableSlots + 1} available`;
        slotButton.className = 'col-12'
    }

    if (availableSlots >= 1 && availableSlots <= 3) {
        slotButton.textContent = `${availableSlots + 1} available`;
    }

    try {
        // Make the corresponding DELETE request to update server-side slots count
        axios.delete(`http://localhost:4000/delete-user/${userDetails.id}`);
        
        // Your existing code for removing the card from the DOM
        const parentElem = document.getElementById('listOfUsers');
        // const childElem = document.getElementById('meetings');
        
        parentElem.removeChild(obj);
    } catch (error) {
        console.log(error);
    }
}

