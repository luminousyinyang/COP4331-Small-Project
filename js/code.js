const urlBase = 'http://proctest.group25ftw.xyz/API';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function doLogin()
{
    userId = 0;
    firstName = "";
    lastName = "";

    // PLACEHOLDERS are for both username and password
    // input fields from index.html
    let user = document.getElementById("username-login").value;
    let password = document.getElementById("password-login").value;

    // PLACEHOLDER is for element in index.html that will store
    // username and password, this line clears this information
    document.getElementById("loginResult").innerHTML = "";

    let temp = {login:user, password:password};
    let jsonPayload = JSON.stringify(temp);

    let url = urlBase + '/login.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;

                if(userId < 1)
                {
                    document.getElementById('loginResult').innerHTML = "User/Password combination incorrect";
                    return;
                }

                firstName = jsonObject.FirstName;
                lastName = jsonObject.LastName;

                saveCookie();

                window.location.href = "home.html";
            }
        };
        xhr.send(jsonPayload);

    }
    catch(err)
    {
        document.getElementById("loginResult").innerHTML = err.message;
    }

}

function saveCookie()
{
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime()+(minutes*60*1000));
    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ",expires=" + date.toGMTString();
}

function readCookie()
{
    userId = -1;
    let data = document.cookie;
    let splits = data.split(",");
    for ( var i = 0; i < splits.length; i++)
    {
        let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
        if(tokens[0] == "firstName")
        {
            firstName = tokens[1];
        }
        else if( tokens[0] == "lastName" )
        {
            lastName = tokens[1];
        }
        else if( tokens[0] == "userId" )
        {
            userId = parseInt( tokens[1].trim() );
        }
    }

    if (userId < 0)
    {
        window.location.href = "index.html";
    }
    else 
    {
        document.getElementById("user-initials").innerText = firstName.charAt(0) + lastName.charAt(0);
        document.getElementById("user-fullname").innerText = firstName + " " + lastName;
    }

}

function doLogout()
{
    userId = 0;
    firstName = "";
    lastName = "";
    console.log("Logout function called");
    document.cookie = "firstName =; expires =Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    document.cookie = "lastName =; expires =Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    document.cookie = "userId =; expires =Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    window.location.href = "index.html"; 
}

function signUp()
{
    userId = 0;
    firstName = "";
    lastName = "";

    // PLACEHOLDERS are for both username and password
    // input fields from index.html
    let firstNameSignUp = document.getElementById("first-name").value;
    let lastNameSignUp = document.getElementById("last-name").value;
    let user = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // // PLACEHOLDER is for element in index.html that will store
    // // username and password, this line clears this information
    // document.getElementById("loginResult").innterHTML = "";

    let temp = {FirstName:firstNameSignUp, LastName:lastNameSignUp, login:user, password:password};
    let jsonPayload = JSON.stringify(temp);

    let url = urlBase + '/signup.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    try
    {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;

                if(userId < 1)
                {
                    document.getElementById('signupResult').innerHTML = "User Account Already Exists";
                    return;
                }

                firstName = jsonObject.FirstName;
                lastName = jsonObject.LastName;

                saveCookie();

                window.location.href = "home.html";
            }
        };
        xhr.send(jsonPayload);

    }
    catch(err)
    {
        document.getElementById("signupResult").innerHTML = err.message;
    }


}

function createContact()
{
	let newFirstName = document.getElementById("first-name").value;
    let newLastName = document.getElementById("last-name").value;
    let newPhone = document.getElementById("phone-num").value;
    let newEmail = document.getElementById("email").value;

    // if (!isValidEmail(newEmail.value)) {
    //   document.getElementById('add-contact-result').textContent = 'Please enter a valid email.';
    //   document.getElementById('add-contact-result').style.color = 'red';
    //   document.getElementById("add-contact-result").innerHTML = err.message;
    //   return;
    // }

	document.getElementById("add-contact-result").innerHTML = "";

	let tmp = { FirstName:newFirstName, LastName:newLastName, Phone:newPhone, Email:newEmail, UserID:userId };
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/create.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				// document.getElementById("add-contact-result").innerHTML = "Contact has been added";
                document.getElementById("first-name").value = ""
                document.getElementById("last-name").value = ""
                document.getElementById("phone-num").value = ""
                document.getElementById("email").value = ""

                document.getElementById("search-input").value = "";
                retrieveContact();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("add-contact-result").innerHTML = err.message;
	}
	
}

function retrieveContact()
{
    // reference
    // <div id="contacts-grid">
    //         <!-- Placeholder contacts -->
    //         <div class="contact-card">
    //             <form class="grid-form">
    //                 <i data-feather="trash-2"></i>
    //                 <span>PB</span>
    //                 <div class="fullname">
    //                     <p>Peanut</p>
    //                     <p>Butter</p>
    //                 </div>
    //                 <p>(407)899-9999</p>
    //                 <p>bobsburgers@gmail.com</p>
    //                 <i data-feather="edit"></i>
    //             </form>
    //         </div>

	let srch = document.getElementById("search-input").value.trim();
    


	// document.getElementById("contactSearchResult").innerHTML = "";
    // reference
    // <div id="contacts-grid">
    //         <!-- Placeholder contacts -->
    //         <div class="contact-card">
    //             <form class="grid-form">
    //                 <i data-feather="trash-2"></i>
    //                 <span>PB</span>
    //                 <div class="fullname">
    //                     <p>Peanut</p>
    //                     <p>Butter</p>
    //                 </div>
    //                 <p>(407)899-9999</p>
    //                 <p>bobsburgers@gmail.com</p>
    //                 <i data-feather="edit"></i>
    //             </form>
    //         </div>

	// let srch = document.getElementById("search-input").value;
	// document.getElementById("contactSearchResult").innerHTML = "";
	
	// let contactList = "";

	let tmp = {search:srch,UserId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/retrieve.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				// document.getElementById("contactSearchResult").innerHTML = "Contact(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );

                let contactsGrid = document.getElementById("contacts-grid");
                contactsGrid.innerHTML = "";

                let pageNum = (document.getElementById("page-indicator").innerText).split(' ')[1];
                let contactMax = 9 * pageNum;
                let contactNum = 1;

                jsonObject.results.forEach(element => {
                    let card = document.createElement("div");
                    card.className = "contact-card";

                    let form = document.createElement("form");
                    form.className = "grid-form"

                    let trashIcon = document.createElement("i");
                    trashIcon.setAttribute("data-feather", "trash-2")
                    trashIcon.className = "delete-contact-icon";
                    form.appendChild(trashIcon);

                    let nameInitials = document.createElement("span");
                    nameInitials.textContent = element.FirstName[0] + element.LastName[0];
                    form.appendChild(nameInitials);

                    let nameDiv = document.createElement("div");
                    nameDiv.className = "fullname";

                    let firstNameP = document.createElement("p");
                    firstNameP.textContent = element.FirstName;
                    nameDiv.appendChild(firstNameP);

                    let lastNameP = document.createElement("p");
                    lastNameP.textContent = element.LastName;
                    nameDiv.appendChild(lastNameP);

                    form.appendChild(nameDiv);

                    let phoneP = document.createElement("p");
                    phoneP.textContent = element.Phone;
                    form.appendChild(phoneP);

                    let emailP = document.createElement("p");
                    emailP.textContent = element.Email;
                    form.appendChild(emailP);

                    let editIcon = document.createElement("i");
                    editIcon.setAttribute("data-feather", "edit");
                    editIcon.className = "edit-contact-icon";
                    form.appendChild(editIcon);

                    card.appendChild(form);
                    if (contactNum <= contactMax && contactNum >= pageNum*9 - 8)
                        contactsGrid.appendChild(card);
                    contactNum++;

                });
                feather.replace();
				
				// for( let i=0; i<jsonObject.results.length; i++ )
				// {
				// 	contactList += jsonObject.results[i];
				// 	if( i < jsonObject.results.length - 1 )
				// 	{
				// 		colorList += "<br />\r\n";
				// 	}
				// }
				
				// document.getElementsByTagName("p")[0].innerHTML = contactList;
			}
		};
		xhr.send(jsonPayload);
        // if (window.feather) {
        //     feather.replace();
        // }
	}
	catch(err)
	{
		// document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
}

let contactsGrid = document.getElementById("contacts-grid")
let currDeleteCard = null;

if (contactsGrid) {

    document.getElementById("contacts-grid").addEventListener("click", function(event) {
        let deleteIcon = event.target.closest('.delete-contact-icon');
        if (deleteIcon) {
            currDeleteCard = deleteIcon.closest('.contact-card');
            document.getElementById('delete-contact-modal').showModal();
        }
    });
}


function deleteContact() 
{
    // document.getElementById("contactDeleteResult").innerHTML = "";
    pLen = currDeleteCard.querySelectorAll('p').length;

    let firstName = currDeleteCard.querySelector('.fullname').querySelectorAll('p')[0].textContent;
    let lastName = currDeleteCard.querySelector('.fullname').querySelectorAll('p')[1].textContent;
    let phone = currDeleteCard.querySelectorAll('p')[pLen - 2].textContent;
    let email = currDeleteCard.querySelectorAll('p')[pLen - 1].textContent;

    let tmp = { FirstName: firstName, LastName:lastName, Phone: phone, Email: email, UserID:userId };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + "/delete." + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    try 
	{
        xhr.onreadystatechange = function () 
		{
            if (this.readyState == 4 && this.status == 200) 
			{
                currDeleteCard.remove();
                currDeleteCard = null;

                let deleteContactModal = document.querySelector("#delete-contact-modal");
                deleteContactModal.close();
                // document.getElementById("contactDeleteResult").innerHTML = "Contact has been deleted";
            }
        };
        xhr.send(jsonPayload);
    } 
	catch (err) 
	{
        // document.getElementById("contactDeleteResult").innerHTML = err.message;
    }

    retrieveContact();
}




// stuff for editing

let currEditCard = null;

if (contactsGrid) {
    document.getElementById("contacts-grid").addEventListener("click", function(event) {
        let editIcon = event.target.closest('.edit-contact-icon');
    
        if (editIcon) {
            currEditCard = editIcon.closest('.contact-card');
    
            pLen = currEditCard.querySelectorAll('p').length;
    
            let firstName = currEditCard.querySelector('.fullname').querySelectorAll('p')[0].textContent;
            let lastName = currEditCard.querySelector('.fullname').querySelectorAll('p')[1].textContent;
            let phone = currEditCard.querySelectorAll('p')[pLen - 2].textContent;
            let email = currEditCard.querySelectorAll('p')[pLen - 1].textContent;
    
            document.getElementById('first-name-edit').value = firstName;
            document.getElementById('last-name-edit').value = lastName;
            document.getElementById('phone-num-edit').value = phone;
            document.getElementById('email-edit').value = email;

            document.getElementById('edit-ct-modal').showModal();
        }
    });
}

function incrementPage()
{
    let pageNum = (document.getElementById("page-indicator").innerText).split(' ')[1];
    pageNum++;
    document.getElementById("page-indicator").innerText = "Page " + pageNum;
    retrieveContact();
}

function decrementPage()
{
    let pageNum = (document.getElementById("page-indicator").innerText).split(' ')[1];
    if (pageNum > 1)
        pageNum--;
    document.getElementById("page-indicator").innerText = "Page " + pageNum;
    retrieveContact();
}




function updateContact() 
{
    let newFirstName = document.getElementById("first-name-edit").value;
    let newLastName = document.getElementById("last-name-edit").value;
    let newPhone = document.getElementById("phone-num-edit").value;
    let newEmail = document.getElementById("email-edit").value;

    let nameParts = currEditCard.querySelector('.fullname').querySelectorAll('p');
    let oldFirstName = nameParts[0].textContent;
    let oldLastName = nameParts[1].textContent;


    let pLen = currEditCard.querySelectorAll('p').length;
    let oldPhone = currEditCard.querySelectorAll('p')[pLen - 2].textContent
    let oldEmail = currEditCard.querySelectorAll('p')[pLen - 1].textContent

    // document.getElementById("contactUpdateResult").innerHTML = "";

    let tmp = { NewFirstName:newFirstName, NewLastName:newLastName, NewPhone:newPhone, NewEmail:newEmail, OldFirstName:oldFirstName, OldLastName:oldLastName, OldPhone:oldPhone, OldEmail:oldEmail, UserID:userId };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + "/update." + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    try 
	{
        xhr.onreadystatechange = function () 
		{
            if (this.readyState == 4 && this.status == 200) 
			{
                nameParts[0].textContent = newFirstName;
                nameParts[1].textContent = newLastName;

                let initialsSpan = currEditCard.querySelector('span');
                initialsSpan.textContent = newFirstName.charAt(0) + newLastName.charAt(0);

                currEditCard.querySelectorAll('p')[pLen - 2].textContent = newPhone;
                currEditCard.querySelectorAll('p')[pLen - 1].textContent = newEmail;

                // document.getElementById("contactUpdateResult").innerHTML = "Contact has been updated";
            }
        };
        xhr.send(jsonPayload);
    } 
	catch (err) 
	{
        // document.getElementById("contactUpdateResult").innerHTML = err.message;
    }
}