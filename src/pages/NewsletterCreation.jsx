import React, { useState } from "react";
import TitleForm from "../components/TitleForm";
import BannerForm from "../components/BannerForm";
import OneProductForm from "../components/OneProductForm";
import ProductForm from "../components/ProductForm";
import CTAForm from "../components/CTAForm";
import LegalNotice from "../components/LegalNotice";

import generateHtml from "../utils/generateHtml";
import { HEADERS, FOOTERS } from "../data/var"; // par exemple si vous avez un objet HEADERS, FOOTERS

export default function NewsletterCreation() {
    const [renderedForms, setRenderedForms] = useState([]);
    const [language, setLanguage] = useState("");
    const [documentTitle, setDocumentTitle] = useState("");

    // Ajoute un bloc
    const addForm = (type) => {
        setRenderedForms((prev) => [...prev, { id: Date.now(), type, data: {} }]);
    };

    // Enlève un bloc avec confirmation
    const removeForm = (formId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce bloc ?")) {
            setRenderedForms((prev) => prev.filter((x) => x.id !== formId));
        }
    };

    // Met à jour la data
    const updateFormData = (formId, newData) => {
        setRenderedForms((prev) =>
            prev.map((item) =>
                item.id === formId ? { ...item, data: newData } : item
            )
        );
    };

    // Gère la sélection du pays
    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    // Gère la saisie du Subject
    const handleDocumentTitleChange = (e) => {
        setDocumentTitle(e.target.value);
    };

    // Génération du HTML
    const handleGenerateHTML = () => {
        // Choix du header/footer
        const header = HEADERS[language] || "";
        const footer = FOOTERS[language] || "";

        // On appelle generateHtml en passant le titre
        // (on peut passer un 3eme ou 4eme paramètre “docTitle” si la fonction le gère).
        const html = generateHtml(renderedForms, header, footer, documentTitle);

        // Nom de fichier : si user n’a rien saisi, on met "newsletter".
        const fileName = documentTitle.trim() ? documentTitle.trim() : "newsletter";

        // Téléchargement
        const blob = new Blob([html], { type: "text/html" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName + ".html";
        link.click();
    };

    // Reset
    const handleReset = () => {
        if (window.confirm("Êtes-vous sûr de vouloir réinitialiser ?")) {
            setRenderedForms([]);
            setLanguage("");
            setDocumentTitle("");
        }
    };

    return (
        <div>
            <h1>RAJA Newsletter Creation</h1>

            {/* LIGNE 1 : Subject + Country */}
            <form id="formglobal">
                <label htmlFor="documentTitle">Subject :</label>
                <input
                    type="text"
                    id="documentTitle"
                    value={documentTitle}
                    onChange={handleDocumentTitleChange}
                />

                <label htmlFor="language">Country :</label>
                <select id="language" value={language} onChange={handleLanguageChange}>
                    <option value="">---Please choose an option---</option>
                    <option value="fr">FR</option>
                    <option value="es">ES</option>
                    <option value="uk">UK</option>
                    <option value="de">DE</option>
                    <option value="at">AT</option>
                    <option value="bfl">BFL</option>
                    <option value="bfr">BFR</option>
                    <option value="cde">CDE</option>
                    <option value="cfr">CFR</option>
                    <option value="cz">CZ</option>
                    <option value="dk">DK</option>
                    <option value="hu">HU</option>
                    <option value="it">IT</option>
                    <option value="nl">NL</option>
                    <option value="no">NO</option>
                    <option value="pl">PL</option>
                    <option value="pt">PT</option>
                    <option value="se">SE</option>
                    <option value="sk">SK</option>
                </select>
            </form>

            {/* LIGNE 2 : #main-container (2 colonnes) */}
            <div id="main-container">
                <div id="corps">
                    {renderedForms.map((form) => {
                        const { id, type, data } = form;
                        const onChange = (d) => updateFormData(id, d);
                        const onRemove = () => removeForm(id);

                        switch (type) {
                            case "title":
                                return <TitleForm key={id} data={data} onChange={onChange} onRemove={onRemove} />;
                            case "banner":
                                return <BannerForm key={id} data={data} onChange={onChange} onRemove={onRemove} />;
                            case "oneProduct":
                                return <OneProductForm key={id} data={data} onChange={onChange} onRemove={onRemove} />;
                            case "product":
                                return <ProductForm key={id} data={data} onChange={onChange} onRemove={onRemove} />;
                            case "cta":
                                return <CTAForm key={id} data={data} onChange={onChange} onRemove={onRemove} />;
                            case "legalNotice":
                                return <LegalNotice key={id} data={data} onChange={onChange} onRemove={onRemove} />;
                            default:
                                return null;
                        }
                    })}
                </div>

                <div id="create-button">
                    <button type="button" onClick={() => addForm("title")}>Add Title</button>
                    <button type="button" onClick={() => addForm("banner")}>Add Banner</button>
                    <button type="button" onClick={() => addForm("oneProduct")}>Add 1 Product</button>
                    <button type="button" onClick={() => addForm("product")}>Add 2 Products</button>
                    <button type="button" onClick={() => addForm("cta")}>Add CTA</button>
                    {/*<button type="button" onClick={() => addForm("legalNotice")}>Add Legal Notice</button>*/}
                </div>
            </div>

            <div id="button-container">
                <button type="button" onClick={handleGenerateHTML}>
                    Generate HTML
                </button>
                <button type="button" onClick={handleReset}>
                    Reset Information
                </button>
            </div>
        </div>
    );
}