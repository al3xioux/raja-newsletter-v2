// src/components/TitleForm.jsx
import React from "react";

export default function TitleForm({ data, onChange, onRemove }) {
    // Mise à jour du champ bigTitle
    const handleTitleChange = (e) => {
        onChange({ ...data, bigTitle: e.target.value });
    };

    const handleTextSizeChange = (e) => {
        onChange({ ...data, textSize: e.target.value });
    };

    const handleTextBoldChange = (e) => {
        onChange({ ...data, bold: e.target.value });
    };

    const handleTextColorChange = (e) => {
        onChange({ ...data, textColor: e.target.value });
    };

    return (
        <section className="form-title">
                <button type="button" className="delete-btn" onClick={onRemove} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i class="fa-solid fa-delete-left"></i></button>
                <br></br>
            <label className="form-label" htmlFor="bigTitle">Title</label>
            <br></br>
            <input
                type="text"
                id="bigTitle"
                value={data.bigTitle || ""}
                onChange={handleTitleChange}
            />
            <br></br>

            <label className="form-label" htmlFor="textsize">Text size</label>
            <br></br>
            <input
                type="text"
                id="textsize"
                value={data.textSize || ""}
                onChange={handleTextSizeChange}
            />
            <br></br>

            <label className="form-label" htmlFor="textbold">Text bold</label>
            <section role="radiogroup">
                <label htmlFor="boldYes">Yes</label>
                <input
                    type="radio"
                    id="boldYes"
                    name="bold"
                    value="1000"
                    checked={data.bold === "1000"}
                    onChange={handleTextBoldChange}
                />
                <label htmlFor="boldNo">No</label>
                <input
                    type="radio"
                    id="boldNo"
                    name="bold"
                    value="500"
                    checked={data.bold === "500"}
                    onChange={handleTextBoldChange}
                />
            </section>

            <label className="form-label" htmlFor="textcolor">Text color</label>
            <br></br>
            <input
                type="color"
                id="textcolor"
                value={data.textColor || ""}
                onChange={handleTextColorChange}
            />
        </section>
    );
}
