const cancelButton = document.getElementById('cancel-button');
const sendButton = document.getElementById('send-button');
const form = document.getElementsByClassName('recipe-instruct-form')[0];
const title = document.getElementById('title');
const category = document.getElementById('category');
const photo = document.getElementById('photo');
const recipe = document.getElementById('recipe');
const link = document.getElementById('link');
let photoData;
let recipeData;
let titleErr = true; let categoryErr = true; let photoErr = true; let
    recipeErr = true;
const TITLE_REGEX = /^[\p{L}][\p{L} '-().]{1,64}$/u;

const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

recipe.addEventListener('change', (e) => {
    if (e.target.files.length === 0) recipeErr = true;
    else recipeErr = false;
});

photo.addEventListener('change', (e) => {
    if (e.target.files.length === 0) photoErr = true;
    else photoErr = false;
});

title.addEventListener('change', (e) => {
    if (!e.target.value) titleErr = true;
    else if (!TITLE_REGEX.test(e.target.value)) {
        titleErr = true;
    } else titleErr = false;
});

category.addEventListener('change', (e) => {
    if (!e.target.value) categoryErr = true;
    else categoryErr = false;
});

const cancel = () => {
    title.value = '';
    category.value = '';
    photo.value = '';
    recipe.value = '';
    link.value = '';
    sendButton.disabled = true;
    sendButton.classList.remove('valid-btn');
};

cancelButton.addEventListener('click', () => {
    cancel();
});

form.addEventListener('change', () => {
    if (titleErr || categoryErr || photoErr || recipeErr) {
        sendButton.disabled = true;
        sendButton.classList.remove('valid-btn');
    } else {
        sendButton.classList.add('valid-btn');
        sendButton.disabled = false;
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await toBase64(photo.files[0]).then((result) => {
        photoData = result;
    });
    await toBase64(recipe.files[0]).then((result) => {
        recipeData = result;
    });
    Email.send({

        Host: 'smtp.elasticemail.com',
        Username: 'masha.an.0122@gmail.com',
        Password: 'AAFAFB74CE7B7DA9B1390D10925A4DB53A22',
        To: 'masha.an.0122@gmail.com',
        From: 'masha.an.0122@gmail.com',
        Subject: 'This is the subject',
        Body: `Title: ${title.value}, Category: ${category.value}, Link: ${link.value}`,
        Attachments: [
            {
                name: photo.files[0].name,
                data: photoData,
            },
            {
                name: recipe.files[0].name,
                data: recipeData,
            }],
    });

    cancel();
});
