import React from "react";

export default function TitleForm({ data, onChange, onRemove, onMoveUp, onMoveDown }) {
    return (
        <section className="form-title">
            <div className="form-card-header">
                <span className="form-card-title">Title</span>
                <div className="form-card-actions">
                    <button type="button" className="move-btn" onClick={onMoveUp}>
                        <i className="fa-solid fa-arrow-up"></i>
                    </button>
                    <button type="button" className="move-btn" onClick={onMoveDown}>
                        <i className="fa-solid fa-arrow-down"></i>
                    </button>
                    <button type="button" className="delete-btn" onClick={onRemove}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>

            <div className="form-card-body">
                <div className="field-group">
                    <label className="form-label" htmlFor="bigTitle">Title</label>
                    <input
                        type="text"
                        id="bigTitle"
                        value={data.bigTitle || ""}
                        onChange={(e) => onChange({ ...data, bigTitle: e.target.value })}
                        placeholder="Title text…"
                    />
                </div>

                <div className="field-group">
                    <label className="form-label" htmlFor="textsize">Font size</label>
                    <select
                        id="textsize"
                        value={data.textSize || "22px"}
                        onChange={(e) => onChange({ ...data, textSize: e.target.value })}
                    >
                        <option value="22px">22px</option>
                        <option value="18px">18px</option>
                    </select>
                </div>

                <div className="field-group">
                    <label className="form-label" htmlFor="textcolor">Text color</label>
                    <input
                        type="color"
                        id="textcolor"
                        value={data.textColor || "#000000"}
                        onChange={(e) => onChange({ ...data, textColor: e.target.value })}
                    />
                </div>
            </div>
        </section>
    );
}
