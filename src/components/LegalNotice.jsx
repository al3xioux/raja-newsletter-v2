import React from "react";

export default function LegalNotice({ data, onChange, onRemove, onMoveUp, onMoveDown }) {
    return (
        <section className="form-legal-notice">
            <div className="form-card-header">
                <span className="form-card-title">Legal Notice</span>
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
                    <label htmlFor="legal-notice" className="form-label">Texte légal</label>
                    <textarea
                        id="legal-notice"
                        value={data.legalNotice || ""}
                        onChange={(e) => onChange({ ...data, legalNotice: e.target.value })}
                        rows="6"
                        placeholder="Mentions légales, CGV…"
                    />
                </div>
            </div>
        </section>
    );
}
