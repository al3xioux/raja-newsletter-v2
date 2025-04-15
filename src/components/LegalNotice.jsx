import React from "react";

export default function LegalNotice({ data, onChange, onRemove }) {
    const handleChange = (e) => {
        onChange({ ...data, legalNotice: e.target.value });
    };
    return (
        <div className="form-legal-notice">
                <button type="button" className="delete-btn" onClick={onRemove} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i class="fa-solid fa-delete-left"></i></button>
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
        </div>
    );
}