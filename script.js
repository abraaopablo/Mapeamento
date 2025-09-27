document.addEventListener('DOMContentLoaded', () => {
    // --- Seletores de Elementos ---
    const switchContainer = document.getElementById('switch-container');
    
    // Modal de Edição (Admin)
    const editModal = document.getElementById('edit-modal');
    const closeEditButton = document.getElementById('close-edit');
    const portForm = document.getElementById('port-form');
    const editModalTitle = document.getElementById('edit-modal-title');
    const portIdInput = document.getElementById('port-id-input');
    const clearButton = document.getElementById('clear-port-data');

    // Modal de Visualização (Usuário)
    const viewModal = document.getElementById('view-modal');
    const closeViewButton = document.getElementById('close-view');
    const viewModalTitle = document.getElementById('view-modal-title');
    const viewInfo = document.getElementById('view-info');
    const editButton = document.getElementById('edit-button');

    // --- Configurações ---
    const totalPorts = 24;
    let portData = {};
    let currentPort = null;

    // --- Funções de Dados ---
    function loadDataFromStorage() {
        const savedData = localStorage.getItem('switchPortData');
        portData = savedData ? JSON.parse(savedData) : {};
    }

    function saveDataToStorage() {
        localStorage.setItem('switchPortData', JSON.stringify(portData));
    }

    // --- Funções de UI ---
    function updatePortsUI() {
        for (let i = 1; i <= totalPorts; i++) {
            const portDiv = document.querySelector(`.port[data-port-number='${i}']`);
            if (portDiv) {
                const isConfigured = portData[i] && portData[i].cableId;
                portDiv.classList.toggle('configured', isConfigured);
            }
        }
    }

    function createSwitchPorts() {
        switchContainer.innerHTML = ''; // Limpa o container antes de criar
        for (let i = 1; i <= totalPorts; i++) {
            const port = document.createElement('div');
            port.className = 'port';
            port.dataset.portNumber = i;
            port.textContent = i;
            port.addEventListener('click', () => handlePortClick(i));
            switchContainer.appendChild(port);
        }
    }

    // --- Funções dos Modais ---
    function openEditModal(portNumber) {
        currentPort = portNumber;
        editModalTitle.textContent = `Configurar Porta ${portNumber}`;
        portIdInput.value = portNumber;
        portForm.reset();

        if (portData[portNumber]) {
            document.getElementById('cable-id').value = portData[portNumber].cableId || '';
            document.getElementById('client-name').value = portData[portNumber].clientName || '';
            document.getElementById('install-date').value = portData[portNumber].installDate || '';
            document.getElementById('notes').value = portData[portNumber].notes || '';
        }
        viewModal.style.display = 'none';
        editModal.style.display = 'block';
    }

    function openViewModal(portNumber) {
        currentPort = portNumber;
        viewModalTitle.textContent = `Informações da Porta ${portNumber}`;
        const data = portData[portNumber];
        
        viewInfo.innerHTML = `
            <p><strong>Identificação do Cabo:</strong> ${data.cableId || 'Não informado'}</p>
            <p><strong>Cliente:</strong> ${data.clientName || 'Não informado'}</p>
            <p><strong>Data de Instalação:</strong> ${data.installDate ? new Date(data.installDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : 'Não informada'}</p>
            <p><strong>Observações:</strong> ${data.notes || 'Nenhuma'}</p>
        `;
        editModal.style.display = 'none';
        viewModal.style.display = 'block';
    }

    function closeModal() {
        editModal.style.display = 'none';
        viewModal.style.display = 'none';
    }

    // --- Lógica de Eventos ---
    function handlePortClick(portNumber) {
        if (portData[portNumber] && portData[portNumber].cableId) {
            openViewModal(portNumber);
        } else {
            openEditModal(portNumber);
        }
    }

    portForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const portNumber = portIdInput.value;
        portData[portNumber] = {
            cableId: document.getElementById('cable-id').value,
            clientName: document.getElementById('client-name').value,
            installDate: document.getElementById('install-date').value,
            notes: document.getElementById('notes').value,
        };
        saveDataToStorage();
        updatePortsUI();
        closeModal();
    });

    clearButton.addEventListener('click', () => {
        const portNumber = portIdInput.value;
        if (confirm(`Tem certeza que deseja limpar os dados da porta ${portNumber}?`)) {
            delete portData[portNumber];
            saveDataToStorage();
            updatePortsUI();
            closeModal();
        }
    });

    editButton.addEventListener('click', () => {
        if (currentPort) {
            openEditModal(currentPort);
        }
    });

    closeEditButton.addEventListener('click', closeModal);
    closeViewButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === editModal || event.target === viewModal) {
            closeModal();
        }
    });

    // --- Inicialização ---
    function init() {
        loadDataFromStorage();
        createSwitchPorts();
        updatePortsUI();
    }

    init();
});
