const newpostFormHandler = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const content = document.querySelector('#content').value.trim();
    

    const response = await fetch(`/api/forum`, {
        method: 'POST',
        body: JSON.stringify({ name, email, content }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/forum');
    }
    else {
        alert(response.statusText);
    }
};

document.querySelector('.newpost-form').addEventListener('submit', newpostFormHandler);