function addNewContact() {
  
  var name = document.getElementById('insertName').value;
  var phone = document.getElementById('insertPhone').value;

  if (name && phone) {
    var body = document.getElementById('inputValues');
    document.getElementById('middleContent').style.display = 'block';
    var addEntry = `
        <tr>
          <td class = "name">${name}</td>
          <td class = "phone">${phone}</td>
          <td class = "edit"><button id = "editButton" onclick="editEntry(this)">Edit</button></td>
          <td class = "delete"><button id = "deleteButton" onclick="deleteEntry(this)">Delete</button></td>
        </tr>
        `;
    body.innerHTML = body.innerHTML + addEntry;

    name.value = '';
    phone.value = '';
    document.getElementById("error").style.opacity = "0";
  } else {
    document.getElementById("error").style.opacity = "100";
  }
}

/*var secondinput = document.getElementById("insertPhone");
secondinput.addEventListener("keyup", function(addNewContact) {
  addNewContact.preventDefault();
if (event.keyCode === 13) {
    document.getElementById("addContact").click();
}
});*/

function deleteEntry(entry) {
  var row = entry.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function editEntry(entry) {
  var row = entry.parentNode.parentNode;
  var hrIndex = row.rowIndex;
  var rowValue = document.getElementsByTagName('tr').item(hrIndex);
  var name = rowValue.getElementsByClassName('name')[0].textContent;
  var phone = rowValue.getElementsByClassName('phone')[0].textContent;

  document.getElementById('insertName').value = name;
  document.getElementById('insertPhone').value = phone;

  document.getElementById('but').setAttribute("edited", hrIndex);
  document.getElementById('but').innerHTML = '<input type="button" id="saveNewEntry" value="Save ✓" onClick="saveEditedValues()">';
}

function saveEditedValues(entry) {

  document.getElementById('but').innerHTML = '<input type="button" id="addContact" value="Add contact" onClick="addNewContact()">';
  var name = document.getElementById('insertName');
  var phone = document.getElementById('insertPhone');

  if (name != "" && phone != "") {
    var hrIndex = document.getElementById('but').getAttribute('edited');
    var rowValue = document.getElementsByTagName('tr').item(hrIndex);

    rowValue.getElementsByClassName('name')[0].innerHTML = name.value;
    rowValue.getElementsByClassName('phone')[0].innerHTML = phone.value;

    name.value = '';
    phone.value = '';
  }

}

/*document.getElementById("form").addEventListener('submit', function (r) {
  r.preventDefault();

  let name = document.getElementById('insertName').value;
  let phone = document.getElementById('insertPhone').value;
  console.log(name);
  console.log(phone);
  if (name && phone) {

    addNewContact();

  } else {
    document.getElementById("error").style.display = "block";
  }
});*/

