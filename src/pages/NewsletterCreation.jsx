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
    const [headerTexte, setHeaderTexte] = useState("");

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

    // Déplace un formulaire vers le haut
    const moveFormUp = (formId) => {
        setRenderedForms((prev) => {
            const index = prev.findIndex((form) => form.id === formId);
            if (index <= 0) return prev;
            
            const newForms = [...prev];
            [newForms[index - 1], newForms[index]] = [newForms[index], newForms[index - 1]];
            return newForms;
        });
    };

    // Déplace un formulaire vers le bas
    const moveFormDown = (formId) => {
        setRenderedForms((prev) => {
            const index = prev.findIndex((form) => form.id === formId);
            if (index === -1 || index === prev.length - 1) return prev;
            
            const newForms = [...prev];
            [newForms[index], newForms[index + 1]] = [newForms[index + 1], newForms[index]];
            return newForms;
        });
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
    const [showSelect, setShowSelect] = useState(false);
    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    // Gère la saisie du Subject
    const handleDocumentTitleChange = (e) => {
        setDocumentTitle(e.target.value);
    };

    const handleHeaderTexteChange = (e) => {
        setHeaderTexte(e.target.value);
    };

    // Génération du HTML
    const handleGenerateHTML = () => {
        // Choix du header/footer
        const header = HEADERS[language] || "";
        const footer = FOOTERS[language] || "";

        // On appelle generateHtml en passant le titre et le headerTexte
        const html = generateHtml(renderedForms, header, footer, documentTitle, headerTexte);

        // Nom de fichier : si user n'a rien saisi, on met "newsletter".
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
            setHeaderTexte("");
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

                <label htmlFor="headerTexte">Header Text :</label>
                    <input
                        type="text"
                        id="headerTexte"
                        value={headerTexte}
                        onChange={handleHeaderTexteChange}
                    />
                
                <label htmlFor="language">
                    <button
                        type="button"
                        onClick={() => setShowSelect(!showSelect)}
                        className="country-select-button">
                            <i class="fa-solid fa-flag" style={{color: "white"}}></i>
                    </button>
                </label>

                {showSelect && (
                    <select
                        id="language"
                        value={language}
                        onChange={handleLanguageChange}
                        style={{ 
                            display: "block", 
                            marginTop: "0",
                            width: "100px" 
                        }}
                    >
                        <option value="">--Please choose an option--</option>
                        <option value="fr">France</option>
                        <option value="es">Espagne</option>
                        <option value="uk">Royaume-Uni</option>
                        <option value="de">Allemagne</option>
                        <option value="at">Autriche</option>
                        <option value="bfl">Belgique FL</option>
                        <option value="bfr">Belgique FR</option>
                        <option value="cde">Suisse DE</option>
                        <option value="cfr">Suisse FR</option>
                        <option value="cz">République Tchèque</option>
                        <option value="dk">Danemark</option>
                        <option value="hu">Hongrie</option>
                        <option value="it">Italie</option>
                        <option value="nl">Pays-Bas</option>
                        <option value="no">Norvège</option>
                        <option value="pl">Pologne</option>
                        <option value="pt">Portugal</option>
                        <option value="se">Suède</option>
                        <option value="sk">Slovaquie</option>
                    </select>
                )}
            </form>

            {/* LIGNE 2 : #main-container (2 colonnes) */}
            <div id="main-container">
                <div id="navigation-card">
                    <h3>Structure de la Newsletter</h3>
                    <div id="navigation-items">
                        {renderedForms.map((form, index) => {
                            const getFormTypeName = (type) => {
                                switch(type) {
                                    case "banner": return "Bannière";
                                    case "title": return "Titre";
                                    case "oneProduct": return "1 Produit";
                                    case "product": return "2 Produits";
                                    case "cta": return "CTA";
                                    case "legalNotice": return "Mentions Légales";
                                    default: return type;
                                }
                            };

                            return (
                                <div key={form.id} className="nav-item">
                                    <span className="nav-number">{index + 1}</span>
                                    <span className="nav-type">{getFormTypeName(form.type)}</span>
                                </div>
                            );
                        })}
                        {renderedForms.length === 0 && (
                            <div style={{ textAlign: 'center', color: '#666', fontSize: '0.9rem', padding: '10px' }}>
                                Aucun élément ajouté
                            </div>
                        )}
                    </div>
                </div>

                <div id="corps">
                    {renderedForms.map((form) => {
                        const { id, type, data } = form;
                        const onChange = (d) => updateFormData(id, d);
                        const onRemove = () => removeForm(id);
                        const onMoveUp = () => moveFormUp(id);
                        const onMoveDown = () => moveFormDown(id);

                        const formProps = {
                            key: id,
                            data,
                            onChange,
                            onRemove,
                            onMoveUp,
                            onMoveDown
                        };

                        switch (type) {
                            case "title":
                                return <TitleForm {...formProps} />;
                            case "banner":
                                return <BannerForm {...formProps} />;
                            case "oneProduct":
                                return <OneProductForm {...formProps} language={language} />;
                            case "product":
                                return <ProductForm {...formProps} language={language} />;
                            case "cta":
                                return <CTAForm {...formProps} />;
                            case "legalNotice":
                                return <LegalNotice {...formProps} />;
                            default:
                                return null;
                        }
                    })}
                </div>

                <div id="create-button">
                    <button type="button" onClick={() => addForm("banner")}>Add Banner</button>
                    <button type="button" onClick={() => addForm("title")}>Add Title</button>
                    <button type="button" onClick={() => addForm("oneProduct")}>Add 1 Product</button>
                    <button type="button" onClick={() => addForm("product")}>Add 2 Products</button>
                    <button type="button" onClick={() => addForm("cta")}>Add CTA</button>
                    <button type="button" onClick={() => addForm("legalNotice")}>Add Legal Notice</button>
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