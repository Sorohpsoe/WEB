import React, { useState, useEffect } from 'react';
import { Checkbox } from '../Forms/Checkbox.js';
import { ActionButton } from '../Forms/ActionButton.js';
import Banner from '../Banner'


function AdminPage() {
    const [stockOnly, setStockOnly] = useState(false);
    const [actionButtons, setActionButtons] = useState([]);
    const [nextButtonLabel, setNextButtonLabel] = useState('');
    const [formDataList, setFormDataList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5038/api/app/Viandes')
            .then(response => response.json())
            .then(data => {
                const formData = data.map(viande => ({
                    idViande: viande.id,
                    nom: viande.nom,
                    cat1: viande.cat1,
                    cat2: viande.cat2,
                    poids: viande.poids,
                    prixKilo: viande.prix_kilo,
                    description: viande.description,
                    idImage: viande.id_image,
                    poidsIndicatif: viande.poids_indicatif
                }));
                setFormDataList(formData);
                setActionButtons(formData.map(viande => ({ label: viande.nom, showForm: false })));
            })
            .catch(error => console.error('Erreur lors de la récupération des données:', error));
    }, []);

    const handleStockOnlyChange = (checked) => {
        setStockOnly(checked);
    };

    const handleAddActionButton = () => {
        if (nextButtonLabel.trim() !== '') {
            const newFormData = {
                idViande: '',
                nom: nextButtonLabel,
                cat1: '',
                cat2: '',
                poids: '',
                prixKilo: '',
                description: '',
                idImage: '',
                poidsIndicatif: 0
            };

            setFormDataList([...formDataList, newFormData]);

            const newButton = {
                label: nextButtonLabel,
                showForm: false
            };
            setActionButtons([...actionButtons, newButton]);

            setNextButtonLabel('');
        }
    };

    const handleNextButtonLabelChange = (e) => {
        setNextButtonLabel(e.target.value);
    };

    const handleToggleForm = (index) => {
        const updatedButtons = [...actionButtons];
        updatedButtons[index].showForm = !updatedButtons[index].showForm;
        setActionButtons(updatedButtons);
    };

    const handleSubmit = (formData, index) => {
        const updatedFormDataList = [...formDataList];
        updatedFormDataList[index] = formData;
        setFormDataList(updatedFormDataList);
        console.log('Données soumises :', formData);
        updateDatabase(formData);
    };

    const handleDeleteForm = (index) => {
        const updatedFormDataList = [...formDataList];
        updatedFormDataList.splice(index, 1);
        setFormDataList(updatedFormDataList);

        const updatedActionButtons = [...actionButtons];
        updatedActionButtons.splice(index, 1);
        setActionButtons(updatedActionButtons);
    };

    const updateDatabase = (formData) => {
        fetch(`http://localhost:5038/api/app/Viandes/${formData.idViande}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de la base de données');
            }
            console.log('Base de données mise à jour avec succès');
        })
        .catch(error => console.error('Erreur lors de la mise à jour de la base de données:', error));
    };

    return (
        <div>
            <Banner />
            <div className="container my-3">
                <SearchBar stockOnly={stockOnly} onStockOnlyChange={handleStockOnlyChange}/>
                {actionButtons.map((button, index) => (
                    formDataList[index].poids !== 0 || !stockOnly ?  (
                        <div key={index}>
                            <ActionButton label={button.label} onClick={() => handleToggleForm(index)} />
                            {button.showForm && (
                                <>
                                    <ProductForm
                                        onSubmit={(formData) => handleSubmit(formData, index)}
                                        formData={formDataList[index]}
                                    />
                                    <button onClick={() => handleDeleteForm(index)}>Supprimer</button>
                                </>
                            )}
                        </div>
                    ) : null
                ))}
                <input type="text" value={nextButtonLabel} onChange={handleNextButtonLabelChange} placeholder="Nom du label" />
                <button onClick={handleAddActionButton}>+</button>
            </div>
        </div>
    );
}

function ProductForm({ onSubmit, formData }) {
    const [id, setId] = useState(formData.id || '');
    const [nom, setNom] = useState(formData.nom || '');
    const [cat1, setCat1] = useState(formData.cat1 || '');
    const [cat2, setCat2] = useState(formData.cat2 || '');
    const [poids, setPoids] = useState(formData.poids || '');
    const [prixKilo, setPrixKilo] = useState(formData.prix_kilo || '');
    const [description, setDescription] = useState(formData.description || '');
    const [idImage, setIdImage] = useState(formData.id_image || '');
    const [poidsIndicatif, setPoidsIndicatif] = useState(formData.poids_indicatif || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ id, nom, cat1, cat2, poids, prix_kilo: parseFloat(prixKilo), description, id_image: idImage, poids_indicatif: parseFloat(poidsIndicatif) });
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
                <label>Id:</label>
                <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Nom:</label>
                <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Catégorie 1:</label>
                <input type="text" value={cat1} onChange={(e) => setCat1(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Catégorie 2:</label>
                <input type="text" value={cat2} onChange={(e) => setCat2(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Poids:</label>
                <input type="text" value={poids} onChange={(e) => setPoids(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Prix au kilo:</label>
                <input type="text" value={prixKilo} onChange={(e) => setPrixKilo(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Id_Image:</label>
                <input type="text" value={idImage} onChange={(e) => setIdImage(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Poids indicatif:</label>
                <input type="text" value={poidsIndicatif} onChange={(e) => setPoidsIndicatif(e.target.value)} />
            </div>

            <button type="submit">Ajouter</button>
        </form>
    );
}



function SearchBar({ stockOnly, onStockOnlyChange }) {
    return (
        <div className="search-bar-container">
            <Checkbox
                id="stocked"
                checked={stockOnly}
                onChange={onStockOnlyChange}
                label="N'afficher que les produits en stock"
            />
        </div>
    );
}

export default AdminPage;