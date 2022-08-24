let words = "beever";

// Buatlah skema logika untuk memuat kata diatas menjadi berbentuk seperti berikut :
// b
// be
// bee
// beev
// beeve
// beever

let array = words.split("");
let word = "";
for (let i = 0; i < words.length; i++) {
  console.log((word += words[i]));
}
