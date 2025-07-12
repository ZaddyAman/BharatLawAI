
import React, { useState, useEffect } from 'react';
import ActCard from '../components/ActCard';

const LegalLibraryPage = () => {
    const [acts, setActs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/api/acts')
            .then(response => response.json())
            .then(data => setActs(data));
    }, []);

    const filteredActs = acts.filter(act =>
        act.metadata.heading.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Legal Library</h1>
            <input
                type="text"
                placeholder="Search by heading..."
                className="w-full p-2 mb-4 border rounded"
                onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredActs.map((act, index) => (
                    <ActCard key={index} act={act} />
                ))}
            </div>
        </div>
    );
};

export default LegalLibraryPage;
