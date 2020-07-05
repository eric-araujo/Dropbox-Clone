class DropBoxController {

    constructor() {

        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.inputFileEl = document.querySelector('#files');
        this.snackModalEl = document.querySelector('#react-snackbar-root');
        this.progressBarEl = this.snackModalEl.querySelector('.mc-progress-bar-fg');
        this.nameFileEl = this.snackModalEl.querySelector('.filename');
        this.timeLeftEl = this.snackModalEl.querySelector('.timeleft');

        this.initEvent();

    }

    initEvent() {

        this.btnSendFileEl.addEventListener('click', event => {

            this.inputFileEl.click();

        });

        this.inputFileEl.addEventListener('change', event => {

            this.uploadTask(event.target.files);

            this.modalShow();

            this.inputFileEl.value = '';

        });

    }

    modalShow(show = true){

        this.snackModalEl.style.display = (show) ? 'block' : 'none';

    }

    uploadTask(files) {

        let promises = [];

        [...files].forEach(file => {

            promises.push(new Promise((resolve, rejetct) => {

                const ajax = new XMLHttpRequest();

                ajax.open('POST', '/upload');

                ajax.onload = event => {

                    this.modalShow(false);

                    try {

                        resolve(JSON.parse(ajax.responseText));

                    } catch (e) {

                        rejetct(e)

                    }

                }

                ajax.onerror = event => {

                    this.modalShow(false);

                    rejetct(event);

                }

                ajax.upload.onprogress = event => {

                    this.uploadProgress(event, file);

                }

                const formData = new FormData();

                formData.append('input-file', file);

                this.startUploadTime = Date.now();

                ajax.send(formData);

            }));

        });

        return Promise.all(promises);

    }

    uploadProgress(event, file) {

        const timespent = Date.now() - this.startUploadTime;
        const loaded = event.loaded;
        const total = event.total;
        const porcent = parseInt((loaded / total) * 100);
        const timeleft = ((100 - porcent) * timespent) / porcent;

        this.progressBarEl.style.width = `${porcent}%`;

        this.nameFileEl.innerHTML = file.name;
        this.timeLeftEl.innerHTML = this.formatTimeToHuman(timeleft);

    }

    formatTimeToHuman(duration) {

        const seconds = parseInt((duration / 1000) % 60);
        const minutes = parseInt((duration / (1000 * 60)) % 60);
        const hours = parseInt((duration / (1000 * 60 * 60)) % 24);;

        if(hours > 0) {

            return `${hours} horas, ${minutes} minutos, ${seconds} segundos`;

        }

        if(minutes > 0){

            return `${minutes} minutos, ${seconds} segundos`;

        }

        if(seconds > 0){

            return `${seconds} segundos`;

        }

        return '';

    }

}