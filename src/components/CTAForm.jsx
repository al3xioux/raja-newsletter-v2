import React from "react";

export default function CTAForm({ data, onChange, onRemove, onMoveUp, onMoveDown }) {
    return (
        <section className="form-cta">
            <div className="form-card-header">
                <span className="form-card-title">CTA</span>
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
                    <label htmlFor="cta-image" className="form-label">Image URL</label>
                    <input
                        type="text"
                        id="cta-image"
                        value={data.ctaImage || ""}
                        onChange={(e) => onChange({ ...data, ctaImage: e.target.value })}
                        placeholder="https://…"
                    />
                </div>

                <div className="field-group">
                    <label htmlFor="cta-link" className="form-label">Lien</label>
                    <input
                        type="text"
                        id="cta-link"
                        value={data.ctaLinkText || ""}
                        onChange={(e) => onChange({ ...data, ctaLinkText: e.target.value })}
                        placeholder="https://…"
                    />
                </div>

                <div className="field-group">
                    <label htmlFor="cta-alt" className="form-label">Alt / Title</label>
                    <input
                        type="text"
                        id="cta-alt"
                        value={data.ctaAltTitle || ""}
                        onChange={(e) => onChange({ ...data, ctaAltTitle: e.target.value })}
                        placeholder="Description de l'image…"
                    />
                </div>
            </div>
        </section>
    );
}
