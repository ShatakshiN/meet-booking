let selectedSlot = null;  // Variable to store the selected slot object

SlotObj1 = {
    time : document.getElementById('time1').textContent,
    link : 'https://meet.google.com/aum-pwzh-kmw'
}

SlotObj2 = {
    time :  document.getElementById('time2').textContent,
    link : 'https://meet.google.com/mvx-waza-qhx'
}

function showForm(cardId) {
  var form = document.getElementById('bookingForm');
  form.style.display = 'block';
  // Set the selected slot based on the card ID
  if (cardId === 'card1') {
    selectedSlot = SlotObj1;
  } else if (cardId === 'card2') {
    selectedSlot = SlotObj2;
  }
}

function hideForm() {
  var form = document.getElementById('bookingForm');
  form.style.display = 'none';
}


async function sendData(event){
  event.preventDefault();
  

  const name = event.target.name.value;
  const email = event.target.email.value;

  Userobj = {
    name,
    email
  }
  
  

    

  try{
    // Include the selected slot object in the request
    const dataToSend = { ...Userobj, ...selectedSlot };
    const response = await axios.post('http://localhost:4000/add-users', dataToSend);
    hideForm()
  }catch(error){
    console.log(error)
  }
  
};
