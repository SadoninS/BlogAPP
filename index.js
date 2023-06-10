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

const postListClearBtnNode = document.querySelector('#clearPostsList');

const POST_EMPTY_iINIT_MESSAGE =
  '<h3 class="emptyPosts">Тут пока ничего нет... </h3>';
const POST_EMPTY_REFRESH_MESSAGE =
  '<h3 class="emptyPosts">Ah, shit, here we go again...</h3>';

const postsNode = document.querySelector('#posts');
postsNode.innerHTML = POST_EMPTY_iINIT_MESSAGE;

postListClearBtnNode.addEventListener('click', function () {
  localStorage.clear();
  renderPosts((postsList = []));
  postsNode.innerHTML = POST_EMPTY_REFRESH_MESSAGE;
  postListClearBtnNode.classList.add('invisible');
});

let postsList = [];
let postListStorage = localStorage.getItem('postlist');
postListStorage = JSON.parse(localStorage.getItem('postlist'));

checkStorageAndInitPostsList();

function renderPosts(postsList) {
  postsNode.innerHTML = postsList.join('');
}
function checkStorageAndInitPostsList() {
  if (Array.isArray(postListStorage)) {
    postsList = postListStorage;
    renderPosts(postsList);
    postListClearBtnNode.classList.remove('invisible');
  } else postsList = [];
}

const post = {
  date: '',
  title: '',
  text: '',
};

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
  } else showSubmitErrorMessage(inputErrorMessage);
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
    } else showSubmitErrorMessage(inputErrorMessage);
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
    } else showSubmitErrorMessage(inputErrorMessage);
  }
});
