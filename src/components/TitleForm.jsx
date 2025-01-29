// src/components/TitleForm.jsx
import React from "react";

export default function TitleForm({ data, onChange, onRemove }) {
    // Mise à jour du champ bigTitle
    const handleTitleChange = (e) => {
        onChange({ ...data, bigTitle: e.target.value });
    };

    return (
        <section className="form-title">
            <button type="button" className="delete-btn" onClick={onRemove}>
                X
            </button>
            <label htmlFor="bigTitle">Title</label>
            <input
                type="text"
                id="bigTitle"
                value={data.bigTitle || ""}
                onChange={handleTitleChange}
            />
        </section>
    );
}
