function initOptionsDialog() {
    const dialog = document.getElementById('options-dialog');
    if (!dialog) return null;
    
    const spraypaintImages = {
        'lambda': 'images/me1.jpg',
        'smiley': 'images/me2.jpg'
    };
    
    const spraypaintPreview = dialog.querySelector('#spraypaint-preview');
    const spraypaintImageSelector = dialog.querySelector('#spraypaint-image');
    const spraypaintFilterSelector = dialog.querySelector('#spraypaint-filter');
    
    function updateSpraypaintPreview() {
        const selectedImagePath = spraypaintImages[spraypaintImageSelector.value];
        const selectedFilter = spraypaintFilterSelector.value;
        
        spraypaintPreview.classList.remove('filter-orange', 'filter-yellow', 'filter-green', 'filter-ltblue');
        
        if (selectedImagePath) {
            spraypaintPreview.style.backgroundImage = `url('${selectedImagePath}')`;
        }
        
        if (selectedFilter && selectedFilter !== 'none') {
            spraypaintPreview.classList.add(`filter-${selectedFilter}`);
        }
    }
    
    updateSpraypaintPreview();
    
    spraypaintImageSelector.addEventListener('change', updateSpraypaintPreview);
    spraypaintFilterSelector.addEventListener('change', updateSpraypaintPreview);
    
    dialog.querySelector('#options-ok').addEventListener('click', function() {
        dialog.close();
    });
    
    dialog.querySelector('#options-cancel').addEventListener('click', function() {
        dialog.close();
    });
    
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
    });
    
    return dialog;
}

function initQuitDialog() {
    const dialog = document.getElementById('quit-dialog');
    if (!dialog) return null;
    
    dialog.querySelector('#confirm-quit').addEventListener('click', function() {
        window.location.href = 'https://github.com/reacheight';
    });
    
    dialog.querySelector('#quit-cancel').addEventListener('click', function() {
        dialog.close();
    });
    
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
    });
    
    return dialog;
}

function initServersDialog() {
    const dialog = document.getElementById('servers-dialog');
    if (!dialog) return null;
    
    const serverItems = dialog.querySelectorAll('.server-item');
    const connectBtn = dialog.querySelector('#connect-btn');
    const refreshBtn = dialog.querySelector('#refresh-btn');
    
    let selectedServer = null;
    function selectServer(serverItem) {
        serverItems.forEach(item => item.classList.remove('selected'));
        serverItem.classList.add('selected');
        selectedServer = serverItem;
        connectBtn.disabled = false;
    }

    serverItems.forEach(item => {
        item.addEventListener('click', function() {
            selectServer(this);
        });

        item.addEventListener('dblclick', function() {
            const url = this.getAttribute('data-url');
            window.open(url, '_blank', 'noopener');
        });
    });
    
    connectBtn.addEventListener('click', function() {
        if (selectedServer) {
            const url = selectedServer.getAttribute('data-url');
            window.open(url, '_blank', 'noopener');
        }
    });
    
    refreshBtn.addEventListener('click', function() {
        refreshBtn.disabled = true;
        
        const serverCountElement = dialog.querySelector('.server-list-header .project-description-column');
        
        serverItems.forEach(item => {
            item.style.display = 'none';
        });
        
        serverCountElement.textContent = 'Servers (0)';
        
        let delay = 50;
        serverItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.display = '';
                serverCountElement.textContent = `Servers (${index + 1})`;
                
                if (index === serverItems.length - 1) {
                    setTimeout(() => {
                        refreshBtn.disabled = false;
                    }, 100);
                }
            }, delay * (index + 1));
        });
    });
    
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
    });
    
    return dialog;
}

document.addEventListener('DOMContentLoaded', function() {
    const optionsDialog = initOptionsDialog();
    const quitDialog = initQuitDialog();
    const serversDialog = initServersDialog();
    
    optionsDialog.showModal();

    const buildLinks = document.querySelectorAll('.build-smth-link');
    buildLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (optionsDialog && optionsDialog.open) {
                optionsDialog.close();
            }
            
            if (serversDialog) {
                serversDialog.showModal();
            }
        });
    });

    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const sectionId = this.getAttribute('data-section');
            
            switch(sectionId) {
                case 'options':
                    if (optionsDialog) optionsDialog.showModal();
                    break;
                case 'find-servers':
                    if (serversDialog) serversDialog.showModal();
                    break;
                case 'quit':
                    if (quitDialog) quitDialog.showModal();
                    break;
                default:
                    break;
            }
        });
    });
});