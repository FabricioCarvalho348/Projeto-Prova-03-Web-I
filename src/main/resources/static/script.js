const baseUrl = 'http://localhost:8080';

function carregarListaDeComidas() {
    fetch(`${baseUrl}/foods`)
        .then(response => response.json())
        .then(data => {
            const foodSelect = document.getElementById('food');
            foodSelect.innerHTML = '<option value="0">Selecione...</option>';

            if (data && data.length > 0) {
                data.forEach(food => {
                    const option = document.createElement('option');
                    option.value = food.id;
                    option.textContent = food.name;
                    foodSelect.appendChild(option);
                });
            }
        })
        .catch(error => console.error('Erro ao carregar as comidas:', error));
}

function carregarDetalhesDasComidas() {
    const foodId = document.getElementById('food').value;
    if (foodId === '0') return;

    fetch(`${baseUrl}/food?id=${foodId}`)
        .then(response => response.json())
        .then(data => {
            const price = data.price;
            document.getElementById('totalPrice').textContent = price.toFixed(2);

            document.getElementById('showRecheiosBtn').disabled = false;

            carregarRecheios(data.filings);
        })
        .catch(error => console.error('Erro ao carregar os detalhes da comida:', error));
}

function carregarRecheios(filings) {
    const filingsDiv = document.getElementById('recheiosList');
    filingsDiv.innerHTML = '';

    if (filings && filings.length > 0) {
        filings.forEach(filing => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = filing.name;
            checkbox.dataset.price = filing.price;
            checkbox.addEventListener('change', atualizarPrecoTotal);

            const label = document.createElement('label');
            label.textContent = `${filing.name} - R$ ${filing.price}`;

            filingsDiv.appendChild(checkbox);
            filingsDiv.appendChild(label);
            filingsDiv.appendChild(document.createElement('br'));
        });
    }
}

function atualizarPrecoTotal() {
    const foodId = document.getElementById('food').value;
    if (foodId === '0') return;

    fetch(`${baseUrl}/food?id=${foodId}`)
        .then(response => response.json())
        .then(data => {
            let totalPrice = data.price;

            const checkboxes = document.querySelectorAll('#recheiosList input[type="checkbox"]:checked');
            checkboxes.forEach(checkbox => {
                totalPrice += parseFloat(checkbox.dataset.price);
            });

            document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
        })
        .catch(error => console.error('Erro ao calcular o preço total:', error));
}

function processarPagamento() {
    const foodId = document.getElementById('food').value;
    const cpf = document.getElementById('cpf').value;
    const description = "Comida com recheios";
    const price = parseFloat(document.getElementById('totalPrice').textContent);

    if (!cpf || foodId === '0') {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    fetch(`${baseUrl}/payment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `idfood=${foodId}&cpf=${cpf}&description=${encodeURIComponent(description)}&price=${price}`
    })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(error => console.error('Erro ao processar o pagamento:', error));
}

function exibirHistorico() {
    const cpf = document.getElementById('cpf').value;
    if (!cpf) {
        alert("Por favor, insira o CPF.");
        return;
    }

    fetch(`${baseUrl}/history?cpf=${cpf}`)
        .then(response => response.json())
        .then(data => {
            const historyList = document.getElementById('historyList');
            historyList.innerHTML = '';

            if (data && data.length > 0) {
                data.forEach(sale => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${sale.description} - R$ ${sale.price}`;
                    historyList.appendChild(listItem);
                });
            } else {
                historyList.innerHTML = '<li>Nenhuma compra encontrada.</li>';
            }

            document.getElementById('historyModal').style.display = 'block';
        })
        .catch(error => console.error('Erro ao carregar o histórico:', error));
}

function limparItensSelecionados() {
    const foodSelect = document.getElementById("food");
    foodSelect.value = "0";

    const checkboxes = document.querySelectorAll("#recheiosList input[type='checkbox']");
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    document.getElementById("totalPrice").textContent = "R$ 0,00";
}

function fecharHistorico() {
    document.getElementById('historyModal').style.display = 'none';
}

function abrirModalDeRecheios() {
    document.getElementById("recheiosModal").style.display = "flex";
}

function fecharModalDeRecheios() {
    document.getElementById("recheiosModal").style.display = "none";
}

window.onload = carregarListaDeComidas;