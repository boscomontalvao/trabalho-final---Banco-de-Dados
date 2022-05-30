import { useState } from 'react';
import { EditModal } from '../EditModal/EditModal';
import './styles.scss'

type evento = {
    id: number;
    description: string,
    eventDate: string
    
    showEvento: Function;
}


export function TableRow(props: evento) {

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);


    return (
        
        <>
            <tr>
                <td>{props.description}</td>
                <td>{props.eventDate}</td>
                <td><button onClick={() => { setIsEditModalVisible(true) }}>Editar</button></td>
            </tr>


            {isEditModalVisible ? (
                <EditModal onClose={() => { setIsEditModalVisible(false) }} showEvents={() => {props.showEvento() }} ></EditModal>
            ) : null}
        </>
    )
}