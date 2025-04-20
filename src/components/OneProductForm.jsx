// src/components/OneProductForm.jsx
import React, { useEffect, useRef } from "react";

const fromPriceOptions = {
    fr: "A partir de",
    es: "Desde",
    uk: "From",
    de: "Ab",
    at: "Ab",
    bfl: "Vanaf",
    bfr: "A partir de",
    cde: "Ab",
    cfr: "Dès",
    cz: "Již",
    dk: "Fra",
    hu: "Już",
    it: "Da",
    nl: "Vanaf",
    no: "Fra",
    pl: "Już",
    pt: "Desde",
    se: "Från",
    sk: "Už"
};

export default function OneProductForm({ data, onChange, onRemove, onMoveUp, onMoveDown, language }) {
    const titleInputRef = useRef(null);
    const textInputRef = useRef(null);

    function addMaxLengthListener(inputElement) {
        inputElement.addEventListener('input', () => {
            if (inputElement.value.length >= inputElement.maxLength) {
                inputElement.style.borderColor = 'red';
                inputElement.style.borderWidth = '2px';
            } else {
                inputElement.style.borderColor = ''; // Reset to default
                inputElement.style.borderWidth = '1px';
            }
        });
    }

    useEffect(() => {
        if (titleInputRef.current) {
            addMaxLengthListener(titleInputRef.current);
        }
        if (textInputRef.current) {
            addMaxLengthListener(textInputRef.current);
        }
    }, []);

    // Ajouter un useEffect pour mettre à jour le fromPrice
    useEffect(() => {
        if (language && fromPriceOptions[language] && data.one_from !== "") {
            onChange({ ...data, one_fromPrice: fromPriceOptions[language] });
        }
    }, [language, data.one_from]);

    // Helper pour mettre à jour un champ
    const updateField = (field) => (e) => {
        onChange({ ...data, [field]: e.target.value });
    };

    // Vérifie si l'URL de l'ecolabel est valide (commence par http)
    const hasEcoLabelPreview =
        data.one_ecolabel &&
        (data.one_ecolabel.startsWith("http://") || data.one_ecolabel.startsWith("https://"));

    const hasLabelPreview =
        data.one_label &&
        (data.one_label.startsWith("http://") || data.one_label.startsWith("https://"));


    return (
        <section className="product-group">
            <form className="form-product">
                <div>
                    <button type="button" className="move-btn" onClick={onMoveUp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-arrow-up"></i></button>
                    <button type="button" className="move-btn" onClick={onMoveDown} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-arrow-down"></i></button>
                    <button type="button" className="delete-btn" onClick={onRemove} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-delete-left"></i></button>
                </div>

                <section className="product-line">
                    <label htmlFor="one_productLink" className="form-label">Product Link</label>
                    <input
                        type="text"
                        id="one_productLink"
                        value={data.one_productLink || ""}
                        onChange={updateField("one_productLink")}
                    />

                    <label htmlFor="one_image" className="form-label">Image</label>
                    <input
                        type="text"
                        id="one_image"
                        value={data.one_image || ""}
                        onChange={updateField("one_image")}
                    />

                    <label htmlFor="one_ecolabel" className="form-label">Eco-Label</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', margin: '8px 0' }}>
                        <button
                            type="button"
                            onClick={() =>
                                window.open(
                                    "https://imgnews.raja-group.com/00-structure/crit-green/_crit-green-all-pays_app.html",
                                    "_blank"
                                )
                            }
                        >
                            Select and paste
                        </button>
                        <input
                            type="text"
                            id="one_ecolabel"
                            value={data.one_ecolabel || ""}
                            onChange={updateField("one_ecolabel")}
                            style={{ flex: 1 }}
                        />
                    </div>
                    {hasEcoLabelPreview && (
                        <img
                            src={data.one_ecolabel}
                            alt="Eco-label preview"
                            style={{ maxWidth: "200px", margin: "8px 0" }}
                        />
                    )}

                    <label htmlFor="one_title" className="form-label">Title</label>
                    <input
                        type="text"
                        id="one_title"
                        ref={titleInputRef}
                        value={data.one_title || ""}
                        onChange={updateField("one_title")}
                        maxLength={66}
                    />

                    <label htmlFor="one_text" className="form-label">Text</label>
                    <input
                        type="text"
                        id="one_text"
                        ref={textInputRef}
                        value={data.one_text || ""}
                        onChange={updateField("one_text")}
                        maxLength={85}
                    />

                    <label htmlFor="one_label" className="form-label">Label</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', margin: '8px 0' }}>
                        <button
                            type="button"
                            onClick={() =>
                                window.open(
                                    "https://imgnews.raja-group.com/00-structure/label/_label-all-pays_app.html",
                                    "_blank"
                                )
                            }
                        >
                            Select and paste
                        </button>
                        <input
                            type="text"
                            id="one_label"
                            value={data.one_label || ""}
                            onChange={updateField("one_label")}
                            style={{ flex: 1 }}
                        />
                    </div>
                    {hasLabelPreview && (
                        <img
                            src={data.one_label}
                            alt="Label preview"
                            style={{ maxWidth: "200px", margin: "8px 0" }}
                        />
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '8px 0' }}>
                        <label className="form-label" style={{ marginBottom: 0 }}>From ?</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input
                                type="checkbox"
                                id="fromNo"
                                checked={data.one_from === ""}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        onChange({ ...data, one_from: "", one_fromPrice: "" });
                                    } else {
                                        onChange({ ...data, one_from: "From", one_fromPrice: fromPriceOptions[language] });
                                    }
                                }}
                            />
                            <label htmlFor="fromNo">No</label>
                        </div>
                    </div>

                    <label htmlFor="one_crossed-out-price" className="form-label">Crossed Out Price</label>
                    <input
                        type="text"
                        id="one_crossed-out-price"
                        value={data.one_crossedOutPrice || ""}
                        onChange={updateField("one_crossedOutPrice")}
                    />

                    <label htmlFor="one_price" className="form-label">Price</label>
                    <input
                        type="text"
                        id="one_price"
                        value={data.one_price || ""}
                        onChange={updateField("one_price")}
                    />

                    <label htmlFor="one_unit" className="form-label">Unit</label>
                    <input
                        type="text"
                        id="one_unit"
                        value={data.one_unit || ""}
                        onChange={updateField("one_unit")}
                    />
                </section>
            </form>
        </section>
    );
}
