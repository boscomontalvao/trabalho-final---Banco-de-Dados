import axios from "axios";
import Reaact, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Modal } from "../../components/Modal/Modal";
import { TableRow } from "../../components/TableRow/TableRow";

import "./styles.scss"

type Evento = {
    id: number;
    description: string;
    eventDate: string;
}


export function Home() {


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [eventos, setEventos] = useState<Evento[] | null>([]);

    async function showEvents() {
        axios.get("http://localhost:8080/api/events")
            .then(response => {
                setEventos(response.data);
            })
    }

    useEffect(() => {
        showEvents();
    }, [])

    return (
        <div>
            <Header />

            <main>
                <div className="container">
                    <div className="events">
                        <div className="events-header">
                            <h2>Lista de Eventos</h2>
                            <button><Link className="link" to="/category">Listar Categorias</Link></button>
                           
                        </div>

                        <div className="events-main">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Evento</th>
                                        <th>Data</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {eventos?.map((data) => 
                                        <TableRow {...data} showEvento={()=>{showEvents()}}/>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="events-footer">
                            <button onClick={() => { setIsModalVisible(true) }}>Adicionar Evento</button>
                        </div>

                        {isModalVisible ? (
                            <Modal  onClose={() => { setIsModalVisible(false) }} showEvents={()=>{showEvents()}} ></Modal>
                        ) : null}
                        
                        
                    </div>
                </div>
            </main>


        </div>
    )
}