import { useState } from 'react';

export function RecordForm() {
    const [goal, setGoal] = useState('');
    const [primaryMaterial, setPrimaryMaterial] = useState('');
    const [secondaryMaterial, setSecondaryMaterial] = useState('');
    const [focusOnStudent, setFocusOnStudent] = useState('');
    const [studentPerformance, setStudentPerformance] = useState('');
    const [studentSurprise, setStudentSurprise] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const record = {
            goal,
            primaryMaterial,
            secondaryMaterial,
            focusOnStudent,
            studentPerformance,
            studentSurprise,
            additionalNotes,
        };
        // Save record to database here
        // You can use a library like Axios to make a POST request to your backend API
        console.log(record); // For debugging
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Jaký máš cíl dnešní hodiny matematiky?
                <textarea value={goal} onChange={(event) => setGoal(event.target.value)} />
            </label>

            <label>
                Co plánuješ dnes zadat žákům z učebnice?
                <textarea value={primaryMaterial} onChange={(event) => setPrimaryMaterial(event.target.value)} />
            </label>

            <label>
                Co s nimi plánuješ dělat dál mimo učebnici?
                <textarea value={secondaryMaterial} onChange={(event) => setSecondaryMaterial(event.target.value)} />
            </label>

            <label>
                Zkus se dnes soustředit více na žáka X
                <input type="text" value={focusOnStudent} onChange={(event) => setFocusOnStudent(event.target.value)} />
            </label>

            <label>
                Dneska jsi měl za cíl/e xy. Jak s Ti ho podařilo naplnit?
                <textarea value={studentPerformance} onChange={(event) => setStudentPerformance(event.target.value)} />
            </label>

            <label>
                Stihl jsi všechno, co sis naplánoval?
                <textarea value={studentSurprise} onChange={(event) => setStudentSurprise(event.target.value)} />
            </label>

            <label>
                Zařadil jsi něco navíc?
                <textarea value={additionalNotes} onChange={(event) => setAdditionalNotes(event.target.value)} />
            </label>

            <button type="submit">Uložit</button>
        </form>
    );
}

/**
 * TODO: !!! Remove
 */
