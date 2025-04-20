import React from "react";

export default function LegalNotice({ data, onChange, onRemove, onMoveUp, onMoveDown }) {
    const handleChange = (e) => {
        onChange({ ...data, legalNotice: e.target.value });
    };
    return (
        <section className="form-legal-notice">
                <div style={{ display: 'flex', gap: '5px', marginRight: '10px' }}>
                    <button type="button" className="move-btn" onClick={onMoveUp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-arrow-up"></i></button>
                    <button type="button" className="move-btn" onClick={onMoveDown} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-arrow-down"></i></button>
                    <button type="button" className="delete-btn" onClick={onRemove} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-delete-left"></i></button>
                </div>
                <br></br>

            <label htmlFor="legal-notice" className="form-label">Legal Notice</label>
            <br></br>
            <textarea
                id="legal_notice"
                value={data.legalNotice || ""}
                onChange={handleChange}
                rows="6"
                style={{ width: '100%', resize: 'vertical' }}
            />
        </section>
    );
}