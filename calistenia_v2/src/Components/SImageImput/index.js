import SSocket from 'servisofts-socket';
export const choseFile = (props, callback) => {
    var form = document.createElement("FORM");
    form.setAttribute("method", "POST");
    form.setAttribute("enctype", "multipart/form-data");

    var x = document.createElement("INPUT");
    x.setAttribute("type", "file");
    x.setAttribute("name", "file");
    x.setAttribute("accept", "image/*");

    form.appendChild(x);

    x.addEventListener('change', () => {
        var body = new FormData(form);
        var data = JSON.stringify(props);
        // body.append('data', data);
        var myInit = {
            method: 'POST',
            body: body,
            mode: 'no-cors',
        };
        var servicios = SSocket.api;
        // console.log(props);
        var url = servicios[props.servicio];

        if (!url) {
            // alert(url);
            return false;
        }
        console.log(url)
        var myRequest = new Request(url + "upload/" + props.component + "/" + props.key, myInit);
        fetch(myRequest)
            .then(function (response) {
                if (callback) {
                    callback({
                        estado: "exito",
                        data: response.data
                    });
                }
            }).catch(error => {
                callback({
                    estado: "error",
                    error: error
                });
            })
    })
    x.click()


}