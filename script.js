// Add this line at the beginning of the script file
const accessRightsSelect = new Choices('#access-rights-select');

const accessRights = {
    "PROCESS_TERMINATE": 0x0001,
    "PROCESS_CREATE_THREAD": 0x0002,
    "PROCESS_SET_SESSIONID": 0x0004,
    "PROCESS_VM_OPERATION": 0x0008,
    "PROCESS_VM_READ": 0x0010,
    "PROCESS_VM_WRITE": 0x0020,
    "PROCESS_DUP_HANDLE": 0x0040,
    "PROCESS_CREATE_PROCESS": 0x0080,
    "PROCESS_SET_QUOTA": 0x0100,
    "PROCESS_SET_INFORMATION": 0x0200,
    "PROCESS_QUERY_INFORMATION": 0x0400,
    "PROCESS_SUSPEND_RESUME": 0x0800,
    "PROCESS_QUERY_LIMITED_INFORMATION": 0x1000,
    "PROCESS_SET_LIMITED_INFORMATION": 0x2000,
    "PROCESS_ALL_ACCESS": 0x1FFFFF,
};

function grantedAccessToRights(grantedAccess) {
    const rights = [];
    for (const right in accessRights) {
        if ((grantedAccess & accessRights[right]) === accessRights[right]) {
            rights.push(right);
        }
    }
    return rights;
}

function rightsToGrantedAccess(rightsList) {
    let grantedAccess = 0;
    for (const right of rightsList) {
        if (right in accessRights) {
            grantedAccess |= accessRights[right];
        }
    }
    return grantedAccess;
}

document.getElementById("granted-access-btn").addEventListener("click", () => {
    const grantedAccess = document.getElementById("granted-access").value;
    const rightsList = grantedAccessToRights(parseInt(grantedAccess, 16));
    const rightsListElement = document.getElementById("access-rights-list");
    rightsListElement.innerHTML = '';
    for (const right of rightsList) {
        const listItem = document.createElement("li");
        listItem.textContent = right;
        rightsListElement.appendChild(listItem);
    }
});

document.getElementById("access-rights-btn").addEventListener("click", () => {
    const selectedRights = accessRightsSelect.getValue(true);
    const grantedAccessValue = rightsToGrantedAccess(selectedRights);
    document.getElementById("result-granted-access").textContent = `GrantedAccess: 0x${grantedAccessValue.toString(16).toUpperCase()}`;
});
