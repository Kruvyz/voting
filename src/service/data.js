export async function getExperts() {
    const response = await fetch('/experts', { method: 'get' });
    const data = response.json();

    return data;
}

export async function addExpert(expert) {
    fetch('/experts', { 
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expert }) });
}

export async function deleteExperts() {
    fetch('/experts', { method: 'delete' });    
}

export async function getCandidates() {
    const response = await fetch('/candidates', { method: 'get' });
    const data =  response.json();

    return data;
}

export async function addCandidate(candidate) {
    await fetch('/candidates', { 
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ candidate })
    });
}

export async function deleteCandidates() {
    fetch('/candidates', { method: 'delete' });    
}

export function setToStorage(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}

export function getFromStorage(name) {
    return JSON.parse(localStorage.getItem(name));
}