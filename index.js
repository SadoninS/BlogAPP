const form = document.querySelector('#post-from-user');

const postTitleFromUser = document.querySelector('#post-title-input');
const postTextFromUser = document.querySelector('#post-text-input');

const postTitleValidationMessage = document.querySelector(
  '#post-title-validation-message'
);
const postTextValidationMessage = document.querySelector(
  '#post-text-validation-message'
);

const inputErrorMessage = document.querySelector('#inputErrorMessage');

const publishBtn = document.querySelector('#post-publish-btn');

const posts = document.querySelector('#posts');
const postsList = [];
const post = {
  date: '',
  title: '',
  text: '',
};

function getPostFromUser(postTitleFromUser, postTextFromUser) {
  const dt = new Date();
  const dtOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  post.date = dt.toLocaleString('ru', dtOptions);
  post.title = postTitleFromUser.value.trim();
  post.text = postTextFromUser.value.trim();

  return post;
}

function emptyStringValidation(post) {
  return post.title !== '' && post.text !== '';
}

function lengthValidation(post) {
  return post.title.length <= 50 && post.text.length <= 1000;
}

function validationPassed(post) {
  return lengthValidation(post) && emptyStringValidation(post);
}

postTitleFromUser.addEventListener('input', function () {
  inputErrorMessage.classList.add('invisible');
  if (postTitleFromUser.value.length >= 0) {
    postTitleValidationMessage.innerText = `${postTitleFromUser.value.length}/50`;
    postTitleValidationMessage.classList.remove('overLength');
    postTitleFromUser.classList.remove('borderRed');
  }
  if (postTitleFromUser.value.length > 50) {
    postTitleValidationMessage.classList.add('overLength');
    postTitleFromUser.classList.add('borderRed');
  }
});

postTextFromUser.addEventListener('input', function () {
  inputErrorMessage.classList.add('invisible');
  if (postTextFromUser.value.length >= 0) {
    postTextValidationMessage.innerText = `${postTextFromUser.value.length}/1000`;
    postTextValidationMessage.classList.remove('overLength');
    postTextFromUser.classList.remove('borderRed');
  }
  if (postTextFromUser.value.length > 1000) {
    postTextValidationMessage.classList.add('overLength');
    postTextFromUser.classList.add('borderRed');
  }
});

function createPost(post) {
  postsList.push(
    (posts.innerHTML = `<div class="post"><p class='post-date'>${post.date}</p><h3 class='post-title'>${post.title}</h3><p class='post-text'>${post.text}</p></div>`)
  );
  postTitleFromUser.value = '';
  postTextFromUser.value = '';
}

function renderPosts(postsList) {
  posts.innerHTML = postsList.join('');
}
function resetValidationMessages(
  postTitleValidationMessage,
  postTextValidationMessage
) {
  postTitleValidationMessage.innerText = '0/50';
  postTextValidationMessage.innerText = '0/1000';
  postTitleValidationMessage.classList.remove('overLength');
  postTextValidationMessage.classList.remove('overLength');
}

function showErrorMessage(inputErrorMessage) {
  if (!validationPassed(post)) {
    inputErrorMessage.classList.remove('invisible');
  }
}

function hideErrorMessage(inputErrorMessage) {
  inputErrorMessage.classList.add('invisible');
}

publishBtn.addEventListener('click', function () {
  getPostFromUser(postTitleFromUser, postTextFromUser);
  if (validationPassed(post)) {
    createPost(post);
    renderPosts(postsList);
    resetValidationMessages(
      postTitleValidationMessage,
      postTextValidationMessage
    );
    hideErrorMessage(inputErrorMessage);
  } else showErrorMessage(inputErrorMessage);
});

postTitleFromUser.addEventListener('keydown', function (event) {
  if (event.which == '13') event.preventDefault();
  if (event.which == '13' && event.ctrlKey) {
    event.preventDefault();
    getPostFromUser(postTitleFromUser, postTextFromUser);
    if (validationPassed(post)) {
      createPost(post);
      renderPosts(postsList);
      resetValidationMessages(
        postTitleValidationMessage,
        postTextValidationMessage
      );
      hideErrorMessage(inputErrorMessage);
    } else showErrorMessage(inputErrorMessage);
  }
});

postTextFromUser.addEventListener('keydown', function (event) {
  if (event.which == '13' && event.ctrlKey) {
    event.preventDefault();
    getPostFromUser(postTitleFromUser, postTextFromUser);
    if (validationPassed(post)) {
      createPost(post);
      renderPosts(postsList);
      resetValidationMessages(
        postTitleValidationMessage,
        postTextValidationMessage
      );
      hideErrorMessage(inputErrorMessage);
    } else showErrorMessage(inputErrorMessage);
  }
});
