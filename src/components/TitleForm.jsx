// src/components/TitleForm.jsx
import React from "react";

export default function TitleForm({ data, onChange, onRemove, onMoveUp, onMoveDown }) {
    // Mise à jour du champ bigTitle
    const handleTitleChange = (e) => {
        onChange({ ...data, bigTitle: e.target.value });
    };

    const handleTextSizeChange = (e) => {
        onChange({ ...data, textSize: e.target.value });
    };

    const handleTextColorChange = (e) => {
        onChange({ ...data, textColor: e.target.value });
    };

    return (
        <section className="form-title">
                <div style={{ display: 'flex', gap: '5px', marginRight: '10px' }}>
                    <button type="button" className="move-btn" onClick={onMoveUp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-arrow-up"></i></button>
                    <button type="button" className="move-btn" onClick={onMoveDown} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-arrow-down"></i></button>
                    <button type="button" className="delete-btn" onClick={onRemove} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-delete-left"></i></button>
                </div>
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
            <select
                id="textsize"
                value={data.textSize || "22px"}
                onChange={handleTextSizeChange}
            >
                <option value="22px">22px</option>
                <option value="18px">18px</option>
            </select>
            <br></br>

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
