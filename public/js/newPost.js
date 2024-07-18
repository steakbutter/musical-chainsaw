const newPostHandler = async (event) => {

    event.preventDefault();

    const title = document.querySelector('#blog-title').value 
    const content = document.querySelector('#blog-content').value 

    console.log(title, content);
    if(title && content) {
        const response = await fetch('api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-type': 'application/json',
            }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to add blog post');
        }
    }
};

document.querySelector('#post-form').addEventListener('submit', newPostHandler);