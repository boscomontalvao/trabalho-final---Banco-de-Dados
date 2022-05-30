//abrindo o index-modal
$('button.btn-add-tickets').on('click', () => {
    $('#modal').addClass('show-modal');
    console.log("teste");
});

//fechando o index modal
$('button.btn-close').on('click', () => {
    $('#modal').removeClass('show-modal');
});


// let listOfTickets = [];

// colocar data atual no input DataCompra
function setDate() {
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;


    return year + "-" + month + "-" + day;
}
$('#purchaseDate').val(setDate());

//adicionar tickets ta tabela com a tag template
// function addTicketsOnTable(ticket) {
//     let templateRow = $($('#templateRow').html());

//     templateRow.attr('id', `ticket-${ticket.id}`);

//     let ticketId = templateRow.find('.ticketId');
//     let ticketDescription = templateRow.find('.ticketDescription');
//     let ticketValue = templateRow.find('.ticketValue');

//     ticketId.html(ticket.id);
//     ticketDescription.html(ticket.description);
//     ticketValue.html(ticket.ticketValue);

// //   Confingurando botao que mostrar informações do ticket
//     let infoButton = templateRow.find('#infoButton');
//     infoButton.on('click', () => {
//         editTicket(ticket);
//     });


//     $('tbody#tbody').append(templateRow);
// }

//fetch usando get que vai rodar assim que a página for iniciada
// fetch('/tickets-system/api')
//         .then(response => {
//             if (response.status === 200) {
//                 response.json().then(data => {
//                     listOfTickets = data;
//                     listOfTickets.forEach(addTicketsOnTable);
//                 });
//             }
//         });



// Configurando botão de adicionar o ticket
// $('button#addTicket').on('click', () => {
//     let description = $('#addModal input[name=description]');
//     let eventsDate = $('#addModal input[name=eventsDate]');
//     let purchaseDate = $('#addModal input[name=purchaseDate]');
//     let eventsLocal = $('#addModal input[name=eventsLocal]');
//     let ticketValue = $('#addModal input[name=ticketsValue]');
//     let buyerId = $('#addModal input[name=buyerId]');

//     let ticket = {
//         description: description.val(),
//         eventsDate: eventsDate.val(),
//         purchaseDate: purchaseDate.val(),
//         eventsLocal: eventsLocal.val(),
//         ticketValue: ticketValue.val(),
//         buyerId: buyerId.val()
//     };

//     fetch('/tickets-system/api', {
//         method: 'POST',
//         body: JSON.stringify(ticket)
//     })
//             .then(response => {
//                 if (response.status === 201) {
//                     response.json().then(data => {
//                         $('tbody#tbody').html('');
//                         listOfTickets.push(data);
//                         listOfTickets.forEach(addTicketsOnTable);
//                     });
//                 }
//             });
//     description.val('');
//     eventsDate.val('');
//     eventsLocal.val('');
//     ticketValue.val('');
//     buyerId.val('');
// });

// Setando valores para os input de edição e configurando
// os botões dentro do modal editDelete
// function editTicket(ticket) {
//     let ticketIdUp = $('#editDeleteModal input[name=ticketsIdUp]');
//     let descriptionUp = $('#editDeleteModal input[name=descriptionUp]');
//     let eventsDateUp = $('#editDeleteModal input[name=eventsDateUp]');
//     let purchaseDateUp = $('#editDeleteModal input[name=purchaseDateUp]');
//     let eventsLocalUp = $('#editDeleteModal input[name=eventsLocalUp]');
//     let ticketValueUp = $('#editDeleteModal input[name=ticketsValueUp]');
//     let buyerIdUp = $('#editDeleteModal input[name=buyerIdUp]');

//     ticketIdUp.val(ticket.id);
//     descriptionUp.val(ticket.description);
//     eventsDateUp.val(ticket.eventsDate);
//     purchaseDateUp.val(ticket.purchaseDate);
//     eventsLocalUp.val(ticket.eventsLocal);
//     ticketValueUp.val(ticket.ticketValue);
//     buyerIdUp.val(ticket.buyerId);

//     //configurando o botão de atualizar o ticket
//     let updateButton = $('#editDeleteModal button#updateButton');
//     updateButton.on('click', () => {
//         updateTicket(ticket);
//         blockingInputs();
//     });

//     //configurando o botão de cancelar edição 
//     let cancelButton = $('#editDeleteModal button#cancelButton');
//     cancelButton.on('click', () => {
//         editTicket(ticket);
//         blockingInputs();
//     });

//     let deleteButton = $('#deleteModal button#confirmDeletion');
//     deleteButton.on('click', () => {
//         deleteTicket(ticket);
//     });

// }

//função pra atualizar o ticket
// function updateTicket(ticket) {
//     let descriptionUp = $('#editDeleteModal input[name=descriptionUp]');
//     let eventsDateUp = $('#editDeleteModal input[name=eventsDateUp]');
//     let eventsLocalUp = $('#editDeleteModal input[name=eventsLocalUp]');
//     let ticketValueUp = $('#editDeleteModal input[name=ticketsValueUp]');
//     let buyerIdUp = $('#editDeleteModal input[name=buyerIdUp]');

//     ticket.description = descriptionUp.val();
//     ticket.eventsDate = eventsDateUp.val();
//     ticket.eventsLocal = eventsLocalUp.val();
//     ticket.ticketValue = ticketValueUp.val();
//     ticket.buyerId = buyerIdUp.val();

//     fetch('/tickets-system/api', {
//         method: 'PUT',
//         body: JSON.stringify(ticket)
//     })
//             .then(response => {
//                 if (response.status === 200) {
//                     let ticketRow = $(`tr#ticket-${ticket.id}`);
//                     let newDescription = ticketRow.find('.ticketDescription');
//                     let newValue = ticketRow.find('.ticketValue');

//                     newDescription.html(ticket.description);
//                     newValue.html(ticket.ticketValue);

//                 }
//             });
// }

//funcção pra excluir o ticket
// function deleteTicket(ticket) {
//     fetch(`/tickets-system/api/${ticket.id}`, {
//         method: 'DELETE'
//     })
//             .then(response => {
//                 if (response.status === 204) {
//                     $('tbody#tbody').html('');
//                     listOfTickets = listOfTickets.filter(t => t.id !== ticket.id);
//                     listOfTickets.forEach(addTicketsOnTable);
//                 }
//             });
// }


//configurando botão de "Editar" no modal editDelete
// $('button#editButton').on('click', () => {
//     let descriptionUp = $('#editDeleteModal input[name=descriptionUp]');
//     let eventsDateUp = $('#editDeleteModal input[name=eventsDateUp]');
//     let eventsLocalUp = $('#editDeleteModal input[name=eventsLocalUp]');
//     let ticketValueUp = $('#editDeleteModal input[name=ticketsValueUp]');
//     let buyerIdUp = $('#editDeleteModal input[name=buyerIdUp]');

//     let editButton = $('#editDeleteModal #editButton');
//     let updateButton = $('#editDeleteModal #updateButton');
//     let cancelButton = $('#editDeleteModal #cancelButton');

//     updateButton.removeClass('hidden');
//     cancelButton.removeClass('hidden');
//     editButton.addClass('hidden');

//     descriptionUp.removeAttr("readonly");
//     eventsDateUp.removeAttr("readonly");
//     eventsLocalUp.removeAttr("readonly");
//     ticketValueUp.removeAttr("readonly");
//     buyerIdUp.removeAttr("readonly");
// });


//funcão pra deixar os inputs com 'readonly'
// function blockingInputs() {
//     let descriptionUp = $('#editDeleteModal input[name=descriptionUp]');
//     let eventsDateUp = $('#editDeleteModal input[name=eventsDateUp]');
//     let eventsLocalUp = $('#editDeleteModal input[name=eventsLocalUp]');
//     let ticketValueUp = $('#editDeleteModal input[name=ticketsValueUp]');
//     let buyerIdUp = $('#editDeleteModal input[name=buyerIdUp]');

//     let editButton = $('#editDeleteModal #editButton');
//     let updateButton = $('#editDeleteModal #updateButton');
//     let cancelButton = $('#editDeleteModal #cancelButton');


//     editButton.removeClass('hidden');

//     updateButton.addClass('hidden');
//     cancelButton.addClass('hidden');

//     descriptionUp.attr('readonly', 'readonly');
//     eventsDateUp.attr('readonly', 'readonly');
//     eventsLocalUp.attr('readonly', 'readonly');
//     ticketValueUp.attr('readonly', 'readonly');
//     buyerIdUp.attr('readonly', 'readonly');
// }
