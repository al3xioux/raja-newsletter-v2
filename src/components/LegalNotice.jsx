import React from "react";

export default function LegalNotice({ data, onChange, onRemove }) {
    const handleChange = (e) => {
        onChange({ ...data, legalNotice: e.target.value });
    };
    return (
        <div className="form-legal-notice">
            <button type="button" className="delete-btn" onClick={onRemove}>
                X
            </button>
            <label htmlFor="legal-notice">Legal Notice</label>
            <input
                type="text"
                id="legal-notice"
                value={data.legalNotice || ""}
                onChange={handleChange}
            />
        </div>
    );
}