import React from "react";

export default function LegalNotice({ data, onChange, onRemove }) {
    const handleChange = (e) => {
        onChange({ ...data, legalNotice: e.target.value });
    };
    return (
        <div className="form-legal-notice">
            <button type="button" className="delete-btn" onClick={onRemove}></button>
            <br></br>

            <label htmlFor="legal-notice" className="form-label">Legal Notice</label>
            <br></br>
            <input
                type="text"
                id="legal-notice"
                value={data.legalNotice || ""}
                onChange={handleChange}
            />
        </div>
    );
}