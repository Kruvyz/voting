export async function getExperts(id) {
    const response = await fetch(`/experts/${id}`, { method: 'get' });
    const data = response.json();

    return data;
}

export async function addExpert(id, expert) {
    fetch(`/experts/${id}`, { 
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expert }) });
}

export async function deleteExperts() {
    fetch('/experts', { method: 'delete' });    
}

export async function getCandidates(id) {
    const response = await fetch(`/candidates/${id}`, { method: 'get' });
    const data =  response.json();

    return data;
}

export async function addCandidate(candidate) {
    return await fetch('/candidates', { 
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ candidate })
    });
}

export async function updateCandidate(id, candidates) {
    return await fetch(`/candidates/${id}`, { 
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ candidates })
    });
}

export async function deleteCandidates() {
    fetch('/candidates', { method: 'delete' });    
}