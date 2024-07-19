
const API_BASE_URL = 'http://localhost:8080/api'; // Your Spring Boot backend URL

export async function getJobData() {
    const response = await fetch(`${API_BASE_URL}/jobs`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export async function postJobData(job: { name: string; description: string }) {
    const response = await fetch(`${API_BASE_URL}/addEmployer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}
