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

            this.uploadTask(event.target.files);

            this.snackModalEl.style.display = 'block';

        });

    }

    uploadTask(files) {

        let promises = [];

        [...files].forEach(file => {

            promises.push(new Promise((resolve, rejetct) => {

                const ajax = new XMLHttpRequest();

                ajax.open('POST', '/upload');

                ajax.onload = event => {

                    try {

                        resolve(JSON.parse(ajax.responseText));

                    } catch (e) {

                        rejetct(e)

                    }

                }

                ajax.onerror = event => {

                    rejetct(event);

                }

                const formData = new FormData();

                formData.append('input-file', file);

                ajax.send(formData);

            }));

        });

        return Promise.all(promises);

    }

}