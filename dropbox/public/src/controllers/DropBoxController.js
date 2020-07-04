class DropBoxController {

    constructor() {
    
        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.inputFileEl = document.querySelector('#files');
        this.snackModalEl = document.querySelector('#react-snackbar-root');

        this.initEvent();
    
    }

    initEvent() {

        this.btnSendFileEl.addEventListener('click', event => {

            this.inputFileEl.click();
        
        });

        this.inputFileEl.addEventListener('change', event => {

            console.log(event.target.files);

            this.snackModalEl.style.display = 'block';

        });

    }

}