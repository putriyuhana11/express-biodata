const express = require('express');
const app = express();
const PORT = 8000;

const {logger} = require('./middleware/log.middleware');

//middleware untuk penerimaan json dari express
app.use(express.json());
app.use (logger);

app.listen(PORT, "localhost", () => {
  console.log(`Server berjalan di port ${PORT}`);
});

app.get('/hello', (request,response) => {
    return response.send('hello dari expressjs')
});

let biodatas = [
  { id: 1, name: "putri yuhana" },
  { id: 2, umur: "16 tahun" },
  { id: 3, alamat: "jl.yayasan nurul huda bantargebang" },
  { id: 4, sosmed: "@pppyhnn" },
  { id: 5, nomer_telpon: "085717560523" },
];

    //get: ambil semua biodata (ini ngambil semua data)
app.get('/biodatas', (request, response) => {
    response.status(200).json(biodatas);
});


app.get('/biodatas/:id',function(request, response) {
    const biodata = biodatas.find(data => data.id === parseInt(request.params.id));

    if(biodata) {
        response.status(200).json(biodata);
    } else {
        response.status(400).json({
            pesan: "Data biodata tidak ditemukan",
        });
    }
});


app.post('/biodatas', (request, response) => {
    const newBiodata = {
        id: biodatas.length + 1,
        ...request.body
    };

    biodatas.push(newBiodata);

    response.status(200).json(newBiodata);
});

app.put('/biodatas/:id', (request, response) =>{
    const biodata = biodata.find((data) => data.id === parseInt(request.params.id)
);

if(biodata){
    biodata.nama = request.body.nama;
    biodata.umur = request.body.umur;
    biodata.alamat = request.body.alamat;
    biodata.social_media = request.body.social_media;
    biodata.nomer_telpon = request.body.nomer_telpon;

    response.json(biodata);
} else {
    response.status(404).json({
        pesan: "biodata tidak ditemukan"
    });
}

});