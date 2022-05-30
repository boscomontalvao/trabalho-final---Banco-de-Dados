import axios from 'axios';
import { useEffect, useState } from 'react';
import { Category } from '../../pages/Category/Category';
import { SelectedCards } from '../SelectedCards/SelectedCards';
import './styles.scss'

type modalProps = {
    onClose: Function;
    showEvents: Function;

}

type Category = {
    id: number;
    name: string;
}

export function EditModal(props: modalProps) {

    const [categories, setCategories] = useState<Category[] | null>([])
    const [selectedCategories, setSelectCategories] = useState<number[]>([]);
    const [inputNameValue, setInputNameValue] = useState('')
    const [inputDateValue, setInputDateValue] = useState('')




    function handleSelectedCategories(idCategory: string) {
        const category = categories?.find(category => category.id == Number(idCategory));
        let temp = selectedCategories;
        category ? temp.push(category?.id) : null
        setSelectCategories(temp);
    }




    async function editEvent() {
        const response = await axios.put("http://localhost:8080/api/events", {
            idsOfCategoriesToBeAdd: selectedCategories,
            description: inputNameValue,
            eventDate: inputDateValue
        })


        setInputNameValue('');
        setInputDateValue('');
        props.onClose();
        props.showEvents();
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Editar Evento</h2>
                    <button className="btn-close" onClick={() => { props.onClose() }}><i className="fa-solid fa-xmark"></i></button>
                </div>

                <div className="modal-body">
                    <div className="row">
                        <select name="category" defaultValue="" onChange={(e) => { handleSelectedCategories(e.target.value) }}>
                            <option disabled>Selecione a(as) categoria(s)</option>
                            {categories?.map((category) =>
                                <option value={category.id}>{category.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="row">
                        <div className="cards">

                            <h4>Categorias selecionas:</h4>
                            <div className="selected-cards">
                                {selectedCategories?.map((category) =>
                                    <SelectedCards name={(categories?.find(cate => cate.id === category))?.name} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label>Eventos</label>
                            <input type="text"
                                placeholder="Descrição do Evento"
                                value={inputNameValue}
                                onChange={e => setInputNameValue(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <label>Data do Evento</label>
                            <input type="date"
                                value={inputDateValue}
                                onChange={e => setInputDateValue(e.target.value)}
                            />
                        </div>
                    </div>
                    <button id="edit-events" onClick={editEvent}>Cadastrar</button>

                </div>
            </div>
        </div>
    )
}