const getLocal = localName => localStorage[localName] ? JSON.parse(localStorage[localName]) : null
const setLocal = (localName, jsonData) => localStorage[localName] = JSON.stringify(jsonData)

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};



const displayExtension = () => {
    document.getElementById('emailDiv').style.display = 'none';
    document.getElementById('ExtensionToggle').style.display = 'flex';
}

document.querySelector('button').addEventListener('click', async () => {
    const stringValue = document.querySelector('input').value;
    if (validateEmail(stringValue)) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "emailAddress": stringValue
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch("http://localhost:3000/createUser", requestOptions);
        console.log(response);
        const res = await response.json();
        if (res.error) {
            alert("User with this email already exists");
        } else {
            setLocal('emailAddress', { emailAddress: stringValue });
            chrome.storage.local.set({extensionStatus: true})
            displayExtension(stringValue);

        }


    } else alert('Please enter a valid Email');
})

const checkEmail = async () => {
    const  emailAddress  = getLocal('emailAddress')?.emailAddress;
    if (emailAddress) {
        const response = await fetch("http://localhost:3000/checkUser", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "emailAddress": emailAddress
            }),
            redirect: 'follow'
        });
        const res = await response.json();
        if (res.error) {
            alert("No Such User Exists");
            localStorage.removeItem("emailAddress");
            chrome.storage.local.set({extensionStatus: false})
        } else {
            chrome.storage.local.set({extensionStatus: true})
            displayExtension();
        } 
    }
}

checkEmail();