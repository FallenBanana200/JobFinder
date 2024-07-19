// src/App.tsx

import React, { useEffect, useState } from 'react';
import { getJobData, postJobData } from './api';

const App: React.FC = () => {
    const [jobs, setJobs] = useState<any[]>([]);
    const [newJob, setNewJob] = useState<{ name: string; description: string }>({
        name: '',
        description: '',
    });

    useEffect(() => {
        // Fetch job data when the component mounts
        getJobData().then(data => setJobs(data));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await postJobData(newJob);
        setNewJob({ name: '', description: '' });
        // Refresh job data after posting
        const updatedJobs = await getJobData();
        setJobs(updatedJobs);
    };

    return (
        <div>
            <h1>Job List</h1>
            <ul>
                {jobs.map(job => (
                    <li key={job.id}>{job.name}: {job.description}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newJob.name}
                    onChange={(e) => setNewJob({ ...newJob, name: e.target.value })}
                    placeholder="Job Name"
                    required
                />
                <input
                    type="text"
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    placeholder="Job Description"
                    required
                />
                <button type="submit">Add Job</button>
            </form>
        </div>
    );
};

export default App;
