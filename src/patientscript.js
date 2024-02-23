
    function save() {
        let data = {};
        data["patientName"] = document.getElementById("patientName");
        data["patientEmail"] = document.getElementById("patientEmail");
        data["orderingPhysician"] = document.getElementById("orderingPhysician");
        data["gender"] = document.getElementById("gender");
        data["dateOfBirth"] = document.getElementById("dateOfBirth");
        data["collectionDate"] = document.getElementById("collectionDate");
        data["specimenType"] = document.getElementById("specimenType");

        fetch("http://localhost:3090/renderpdf", {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                return response.blob();
            })
            .then(response => {
                //Create a Blob from the PDF Stream
                const file = new Blob([response], {type: 'application/pdf'});
                //Build a URL from the file
                const fileURL = URL.createObjectURL(file);
                //Open the URL on new Window
                window.open(fileURL);
            })
            .catch(error => {
                console.log(error);
            });
    }

