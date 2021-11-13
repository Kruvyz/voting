export async function getExperts() {
    const response = await fetch('/experts', { method: 'get' });
    const data = response.json();

    return data;
}

export async function addExpert(expert, id) {
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

export async function getVote(id) {
    const response = await fetch('/candidates/' + id, { method: 'get' });
    const data =  await response.json();

    return data;
}

export async function addVote(vote) {
    const res = await fetch('/candidates', { 
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vote })
    });

    return res.json();
}

export async function updateVote(vote) {
    await fetch('/vote', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({vote})
    });
}

export async function deleteCandidates() {
    fetch('/candidates', { method: 'delete' });    
}


export async function checkLogin(login) {
    const responce = await fetch('/verify/'+login);
    const json = responce.json();

    return json;
}

export async function authorization(userCred) {
    const responce = await fetch('/verify', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCred)
    });

    const json = await responce.json();

    if (!json) {
        return Promise.reject('Логін або пароль не вірний');
    }

    return json;
}

export async function registerUser(user) {
    await fetch('/register', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}

export async function getUserLoginById(id) {
    const responce = await fetch(`/user/${id}`);
    const json = await responce.json();

    return json;
}

export async function deleteExpertise(id) {
    await fetch(`/expertise/${id}`, { method: 'DELETE' });
}