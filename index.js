const form = document.querySelector('#post-from-user');

const postTitleFromUser = document.querySelector('#post-title-input');
const postTextFromUser = document.querySelector('#post-text-input');

const postTitleValidationMessage = document.querySelector(
  '#post-title-validation-message'
);
const postTextValidationMessage = document.querySelector(
  '#post-text-validation-message'
);

const publishBtn = document.querySelector('#post-publish-btn');
const posts = document.querySelector('#posts');
const postsList = [];
const post = {
  title: '',
  text: '',
};

function getPostFromUser(postTitleFromUser, postTextFromUser) {
  post.title = postTitleFromUser.value;
  post.text = postTextFromUser.value;

  return post;
}

function validationPassed(post) {
  if (lengthValidation(post) && emptyStringValidation(post)) return true;
  else return false;
}

function lengthValidation(post) {
  if (post.title.length < 30) return true;
  else {
    postTitleValidationMessage.textContent =
      'Вы превысили длину заголовка! лимит - 30 симолов!';
  }
  return false;
}

function emptyStringValidation(post) {
  if (post.title !== '' && post.text !== '') return true;
  else return false;
}

function createPost(post) {
  postsList.push(
    (posts.innerHTML = `<div class="post"><h3>${post.title}</h3><p>${post.text}</p></div>`)
  );
  postTitleFromUser.value = '';
  postTextFromUser.value = '';
  postTitleValidationMessage.className = 'default';
}

function renderPosts(postsList) {
  posts.innerHTML = postsList.join('');
}

postTitleFromUser.addEventListener('input', function () {
  if (postTitleFromUser.value.length !== 0) {
    postTitleValidationMessage.classList.add('active');
    postTitleValidationMessage.innerHTML = `Вы ввели ${postTitleFromUser.value.length} символов`;
    postTitleFromUser.classList.remove('overLentghLimit');
  }
  if (postTitleFromUser.value.length > 30) {
    postTitleFromUser.className = 'overLentghLimit';
    postTitleValidationMessage.className = 'overLentghLimit';
  }

  if (postTitleFromUser.value.length < 30) {
    postTitleFromUser.classList.remove('overLentghLimit');
    postTitleValidationMessage.classList.remove('overLentghLimit');
  }

  if (!postTitleFromUser.value) {
    postTitleValidationMessage.classList.add('overLentghLimit');
    postTitleValidationMessage.textContent =
      'Вы пытаетесь опубликовать пост без заголовка!';
  }
});

publishBtn.addEventListener('click', function (event) {
  getPostFromUser(postTitleFromUser, postTextFromUser);
  console.log(validationPassed(post));
  if (validationPassed(post)) createPost(post);
  renderPosts(postsList);
  console.log(postsList);
});

postTitleFromUser.addEventListener('keydown', function (event) {
  if (event.which == '13') event.preventDefault();
  if (event.which == '13' && event.ctrlKey) {
    getPostFromUser(postTitleFromUser, postTextFromUser);
    console.log(validationPassed(post));
    if (validationPassed(post)) createPost(post);
    renderPosts(postsList);
    console.log(postsList);
  }
});

postTextFromUser.addEventListener('keydown', function (event) {
  if (event.which == '13' && event.ctrlKey) {
    event.preventDefault();
    getPostFromUser(postTitleFromUser, postTextFromUser);
    console.log(validationPassed(post));
    if (validationPassed(post)) createPost(post);
    renderPosts(postsList);
    console.log(postsList);
  }
});
