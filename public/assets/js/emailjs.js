
(function () {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
        publicKey: "9cAhnLmP5LNeBLdII",
    });
})();


window.onload = function () {
    document.getElementById('formContact').addEventListener('submit', function (event) {
        event.preventDefault();
        // these IDs from the previous steps
        emailjs.sendForm('service_eln7o86', 'template_nyito7j', this)
            .then(() => {
                console.log('SUCCESS!');
                sentMessage.innerHTML = 'Merci! Votre message a bien été envoyé!!';
            }, (error) => {
                console.log('FAILED...', error);
            });
    });
}