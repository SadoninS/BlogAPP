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
  title: '',
  text: '',
};

function getPostFromUser(postTitleFromUser, postTextFromUser) {
  post.title = postTitleFromUser.value.trim();
  post.text = postTextFromUser.value.trim();
  return post;
}

function emptyStringValidation(post) {
  return post.title !== '' && post.text !== '';
}

function lengthValidation(post) {
  return post.title.length < 30 && post.text.length < 200;
}

function validationPassed(post) {
  return lengthValidation(post) && emptyStringValidation(post);
}

postTitleFromUser.addEventListener('input', function () {
  if (postTitleFromUser.value.length >= 0)
    postTitleValidationMessage.innerText = `${postTitleFromUser.value.length}/20`;
  postTitleValidationMessage.classList.remove('overLength');
  if (postTitleFromUser.value.length > 20)
    postTitleValidationMessage.classList.add('overLength');
});

postTextFromUser.addEventListener('input', function () {
  if (postTextFromUser.value.length >= 0)
    postTextValidationMessage.innerText = `${postTextFromUser.value.length}/200`;
  postTextValidationMessage.classList.remove('overLength');
  if (postTextFromUser.value.length > 200)
    postTextValidationMessage.classList.add('overLength');
});

function createPost(post) {
  postsList.push(
    (posts.innerHTML = `<div class="post"><h3>${post.title}</h3><p>${post.text}</p></div>`)
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
  postTitleValidationMessage.innerText = '0/20';
  postTextValidationMessage.innerText = '0/200';
  postTitleValidationMessage.classList.remove('overLength');
  postTextValidationMessage.classList.remove('overLength');
}

function showErrorMessage(inputErrorMessage) {
  if (!validationPassed(post)) inputErrorMessage.classList.remove('invisible');
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
