// src/components/ProductForm.jsx
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

export default function ProductForm({ data, onChange, onRemove, onMoveUp, onMoveDown, language }) {
    const title1InputRef = useRef(null);
    const text1InputRef = useRef(null);
    const title2InputRef = useRef(null);
    const text2InputRef = useRef(null);

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
        if (title1InputRef.current) {
            addMaxLengthListener(title1InputRef.current);
        }
        if (text1InputRef.current) {
            addMaxLengthListener(text1InputRef.current);
        }
        if (title2InputRef.current) {
            addMaxLengthListener(title2InputRef.current);
        }
        if (text2InputRef.current) {
            addMaxLengthListener(text2InputRef.current);
        }
    }, []);

    useEffect(() => {
        if (language && fromPriceOptions[language]) {
            const newData = { ...data };
            
            if (data.from1 !== "") {
                newData.fromPrice1 = fromPriceOptions[language];
            }
            if (data.from2 !== "") {
                newData.fromPrice2 = fromPriceOptions[language];
            }
            
            onChange(newData);
        }
    }, [language, data.from1, data.from2]);

    const updateField = (field) => (e) => {
        if (field === "from1" || field === "from2") {
            const fromValue = e.target.value;
            const fromPriceField = field === "from1" ? "fromPrice1" : "fromPrice2";
            const fromPriceValue = fromValue === "From" ? fromPriceOptions[language] : "";
            onChange({ ...data, [field]: fromValue, [fromPriceField]: fromPriceValue });
        } else {
            onChange({ ...data, [field]: e.target.value });
        }
    };

    const hasEcoLabel1Preview =
        data.ecolabel1 &&
        (data.ecolabel1.startsWith("http://") || data.ecolabel1.startsWith("https://"));

    const hasLabel1Preview =
        data.label1 &&
        (data.label1.startsWith("http://") || data.label1.startsWith("https://"));

    const hasEcoLabel2Preview =
        data.ecolabel2 &&
        (data.ecolabel2.startsWith("http://") || data.ecolabel2.startsWith("https://"));

    const hasLabel2Preview =
        data.label2 &&
        (data.label2.startsWith("http://") || data.label2.startsWith("https://"));

    return (
        <section className="product-group">
            <form className="form-product">
                <div>
                    <button type="button" className="move-btn" onClick={onMoveUp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-arrow-up"></i></button>
                    <button type="button" className="move-btn" onClick={onMoveDown} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-arrow-down"></i></button>
                    <button type="button" className="delete-btn" onClick={onRemove} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-delete-left"></i></button>
                </div>

                <div className="product-columns-container">
                    <section className="product-line">
                        <label className="form-label">Product Link</label>
                        <input
                            type="text"
                            value={data.productLink1 || ""}
                            onChange={updateField("productLink1")}
                        />

                        <label className="form-label">Image</label>
                        <input
                            type="text"
                            value={data.image1 || ""}
                            onChange={updateField("image1")}
                        />

                        <label className="form-label">Eco-Label</label>
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
                                value={data.ecolabel1 || ""}
                                onChange={updateField("ecolabel1")}
                                style={{ flex: 1 }}
                            />
                        </div>
                        {hasEcoLabel1Preview && (
                            <img
                                src={data.ecolabel1}
                                alt="Eco-label preview"
                                style={{ maxWidth: "200px", margin: "8px 0" }}
                            />
                        )}

                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            ref={title1InputRef}
                            value={data.title1 || ""}
                            onChange={updateField("title1")}
                            maxLength={66}
                        />

                        <label className="form-label">Text</label>
                        <input
                            type="text"
                            ref={text1InputRef}
                            value={data.text1 || ""}
                            onChange={updateField("text1")}
                            maxLength={85}
                        />

                        <label className="form-label">Label</label>
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
                                value={data.label1 || ""}
                                onChange={updateField("label1")}
                                style={{ flex: 1 }}
                            />
                        </div>
                        {hasLabel1Preview && (
                            <img
                                src={data.label1}
                                alt="Label preview"
                                style={{ maxWidth: "200px", margin: "8px 0" }}
                            />
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '8px 0' }}>
                            <label className="form-label" style={{ marginBottom: 0 }}>From ?</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <input
                                    type="checkbox"
                                    id="fromNo1"
                                    checked={data.from1 === ""}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            onChange({ ...data, from1: "", fromPrice1: "" });
                                        } else {
                                            onChange({ ...data, from1: "From", fromPrice1: fromPriceOptions[language] });
                                        }
                                    }}
                                />
                                <label htmlFor="fromNo1">No</label>
                            </div>
                        </div>

                        <label htmlFor="crossed-out-price1" className="form-label">Crossed Out Price</label>
                        <input
                            type="text"
                            id="crossed-out-price1"
                            value={data.crossedOutPrice1 || ""}
                            onChange={updateField("crossedOutPrice1")}
                        />
                        
                        <label className="form-label">Price</label>
                        <input
                            type="text"
                            value={data.price1 || ""}
                            onChange={updateField("price1")}
                        />

                        <label className="form-label">Unit</label>
                        <input
                            type="text"
                            value={data.unit1 || ""}
                            onChange={updateField("unit1")}
                        />
                    </section>

                    <section className="product-line">
                        <label className="form-label">Product Link</label>
                        <input
                            type="text"
                            value={data.productLink2 || ""}
                            onChange={updateField("productLink2")}
                        />

                        <label className="form-label">Image</label>
                        <input
                            type="text"
                            value={data.image2 || ""}
                            onChange={updateField("image2")}
                        />

                        <label className="form-label">Eco-Label</label>
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
                                value={data.ecolabel2 || ""}
                                onChange={updateField("ecolabel2")}
                                style={{ flex: 1 }}
                            />
                        </div>
                        {hasEcoLabel2Preview && (
                            <img
                                src={data.ecolabel2}
                                alt="Eco-label preview"
                                style={{ maxWidth: "200px", margin: "8px 0" }}
                            />
                        )}

                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            ref={title2InputRef}
                            value={data.title2 || ""}
                            onChange={updateField("title2")}
                            maxLength={66}
                        />

                        <label className="form-label">Text</label>
                        <input
                            type="text"
                            ref={text2InputRef}
                            value={data.text2 || ""}
                            onChange={updateField("text2")}
                            maxLength={85}
                        />

                        <label className="form-label">Label</label>
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
                                value={data.label2 || ""}
                                onChange={updateField("label2")}
                                style={{ flex: 1 }}
                            />
                        </div>
                        {hasLabel2Preview && (
                            <img
                                src={data.label2}
                                alt="Label preview"
                                style={{ maxWidth: "200px", margin: "8px 0" }}
                            />
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '8px 0' }}>
                            <label className="form-label" style={{ marginBottom: 0 }}>From ?</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <input
                                    type="checkbox"
                                    id="fromNo2"
                                    checked={data.from2 === ""}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            onChange({ ...data, from2: "", fromPrice2: "" });
                                        } else {
                                            onChange({ ...data, from2: "From", fromPrice2: fromPriceOptions[language] });
                                        }
                                    }}
                                />
                                <label htmlFor="fromNo2">No</label>
                            </div>
                        </div>

                        <label htmlFor="crossed-out-price2" className="form-label">Crossed Out Price</label>
                        <input
                            type="text"
                            id="crossed-out-price2"
                            value={data.crossedOutPrice2 || ""}
                            onChange={updateField("crossedOutPrice2")}
                        />

                        <label className="form-label">Price</label>
                        <input
                            type="text"
                            value={data.price2 || ""}
                            onChange={updateField("price2")}
                        />

                        <label className="form-label">Unit</label>
                        <input
                            type="text"
                            value={data.unit2 || ""}
                            onChange={updateField("unit2")}
                        />
                    </section>
                </div>
            </form>
        </section>
    );
}
