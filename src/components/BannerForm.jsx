import React from "react";

export default function BannerForm({ data, onChange, onRemove, onMoveUp, onMoveDown }) {
    return (
        <section className="form-banner">
            <div className="form-card-header">
                <span className="form-card-title">Banner</span>
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
                    <label htmlFor="banner-image" className="form-label">Image URL</label>
                    <input
                        type="text"
                        id="banner-image"
                        value={data.bannerImage || ""}
                        onChange={(e) => onChange({ ...data, bannerImage: e.target.value })}
                        placeholder="https://…"
                    />
                </div>

                <div className="field-group">
                    <label htmlFor="banner-link" className="form-label">Link</label>
                    <input
                        type="text"
                        id="banner-link"
                        value={data.bannerLinkText || ""}
                        onChange={(e) => onChange({ ...data, bannerLinkText: e.target.value })}
                        placeholder="https://…"
                    />
                </div>

                <div className="field-group">
                    <label htmlFor="banner-alt" className="form-label">Alt / Title</label>
                    <input
                        type="text"
                        id="banner-alt"
                        value={data.bannerAltTitle || ""}
                        onChange={(e) => onChange({ ...data, bannerAltTitle: e.target.value })}
                        placeholder="Image description…"
                    />
                </div>
            </div>
        </section>
    );
}
