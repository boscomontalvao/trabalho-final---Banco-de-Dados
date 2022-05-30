import { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'


import './styles.scss'
import axios from 'axios'
import { Header } from '../../components/Header/Header'
import { Link } from 'react-router-dom'

type Category = {
    id: number;
    name: string;
}

export function Category() {

    const urlApi = "http://localhost:8080/api/categories"

    const [categories, setCategories] = useState<Category[] | null>([]);
    const [inputValue, setInputValue] = useState('');
    const [inputVisibility, setInputVisibility] = useState(false);
    const [selectedCategory, setSelectCategory] = useState<Category | null>();


    //listar categorias 
    async function showCategories() {
        axios.get(urlApi)
            .then(response => {
                setCategories(response.data);
            })
    }
    useEffect(() => {
        showCategories();
    }, [])


    //adicionar categorias
    async function addCategories(inputValue: string) {
        const response = await axios.post(urlApi, {
            name: inputValue
        });

        showCategories();
        setInputValue('');
        setInputVisibility(!inputVisibility);
    }

    //excluir categoria
    async function deleteCategories(category: Category) {
        const response = await axios.delete(urlApi + `/${category.id}`)
        showCategories();
    }


    //editar categoria
    function handleUpdateCategories(category: Category) {

        inputVisibility ? setInputVisibility(inputVisibility) : setInputVisibility(!inputVisibility);
        setInputValue(category.name);
        setSelectCategory(category);
    }

    async function updateCategory() {
        const response = await axios.put(urlApi + `/${selectedCategory?.id}`, {
            id: selectedCategory?.id,
            name: inputValue
        })
        setInputValue("");
        setInputVisibility(false);
        setSelectCategory(undefined);
        showCategories();
    }

    function handleCancelAction() {
        inputVisibility ? setInputVisibility(!inputVisibility) : setInputVisibility(inputVisibility);
        setSelectCategory(undefined);
        setInputValue("");
    }

    return (

        <>
            <Header />
            <main>
                <div className="container">
                    <div className="categories">

                        <div className="categories-header">
                            <h2>Lista de Categorias</h2>
                            <button><Link className="link" to="/">Listar Eventos</Link></button>
                        </div>

                        <div className="categories-main">

                            {categories?.map((category) =>
                                <div className="category">
                                    <p>{category.name}</p>

                                    <div className="btns-edit-delete">
                                        <button id="editBtn" onClick={() => handleUpdateCategories(category)}>
                                            <FontAwesomeIcon icon={faPenToSquare} size={'lg'} />
                                        </button>


                                        <button id="deleteBtn" onClick={() => deleteCategories(category)}>
                                            <FontAwesomeIcon icon={faTrash} size={'lg'} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="categories-footer">
                            <input type="text"
                                value={inputValue}
                                style={{ display: inputVisibility ? "block" : "none" }}
                                onChange={e => setInputValue(e.target.value)}
                            />

                            <div className="action-btns">

                                <button onClick={() => {
                                    inputVisibility ? selectedCategory ? updateCategory() : addCategories(inputValue) : setInputVisibility(!inputVisibility)
                                }}>
                                    {inputVisibility ? selectedCategory ? "Atualizar" : "Confirmar" : "Adicionar Categoria"}
                                </button>


                                <button id="cancel"
                                    onClick={() => { handleCancelAction() }}
                                    style={{ display: inputVisibility ? "block" : "none" }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </>
    )
}