/*
Membeli makan siang dan menabung

Rusli adalah seorang anak sekolah di SD Beever
Setiap harinya, Rusli diberikan uang jajan oleh orang tuanya 
sebesar Rp. 10.000,- rupiah.

Rusli bisa menabung atau membeli makanan di sekolahnya untuk
makan siang. Kita telah diberikan catatan keuangan Rusli
dalam bentuk text biasa, dan kita diminta menghitung
jumlah uang tabungan Rusli per harinya dan total tabungannya.

OUTPUT:
{
    Senin: 2000,
    Selasa: 5500,
    Rabu: 3500,
    Kamis: 7000,
    Jumat: 5500,
    TotalTabungan: 23500
}

*/

function jumlahTabungan(listHarga, history) {
  // Write your code here

  let data = history.split(".").map(function (x) {
    let hari = x.split("-")[0];
    let makanan = x.split("-").pop();
    let obj = Object.assign({}, hari)
    return makanan
    // return makanan
  });

  let array = {}
  for(let i = 0; i < data.length; i++ ) {
    Object.assign(array, data[i]);
  }
  // let data = typeof historyHari
  // for (i of historyHari){
  //   data = i.split("-")
  // }

  // historyHari.forEach((element) => {
  //   return element;
  // });
  // switch(listHarga) {
  //   case nama = "ayam":
  // }
  // const data = {
  //   Senin: 2000,
  //   Selasa: 5500,
  //   Rabu: 3500,
  //   Kamis: 7000,
  //   Jumat: 5500,
  //   TotalTabungan: 23500,
  // };
  const res = data.reduce((acc,curr)=> (acc[curr]='',acc),{});
  console.log(res);
}

var hargaMakanan = [
  {
    nama: "ayam",
    harga: 5000,
  },
  {
    nama: "nasi",
    harga: 2000,
  },
  {
    nama: "cola",
    harga: 1000,
  },
  {
    nama: "chiki",
    harga: 1500,
  },
  {
    nama: "hotdog",
    harga: 3000,
  },
  {
    nama: "aqua",
    harga: 2000,
  },
];

var historyPembelian = `Senin-ayam,nasi,cola.Selasa-chiki,hotdog.Rabu-ayam,chiki.Kamis-hotdog.Jumat-chiki,cola,nasi`;
console.log(jumlahTabungan(hargaMakanan, historyPembelian));
