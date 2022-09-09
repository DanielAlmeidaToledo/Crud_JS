const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const crud_name = document.querySelector('#form-name')
const crud_cpf = document.querySelector('#form-cpf')
const crud_email = document.querySelector('#form-email')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    crud_name.value = itens[index].name
    crud_cpf.value = itens[index].cpf
    crud_email.value = itens[index].email
    id = index
  } else {
    crud_name.value = ''
    crud_cpf.value = ''
    crud_email.value = ''
  }
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.name}</td>
    <td>${item.cpf}</td>
    <td>${item.email}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit bx-sm' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash bx-sm'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (crud_name.value == '' || crud_cpf.value == '' || crud_email.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].name = crud_name.value
    itens[id].cpf = crud_cpf.value
    itens[id].email = crud_email.value
  } else {
    itens.push({'name': crud_name.value, 'cpf': crud_cpf.value, 'email': crud_email.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()