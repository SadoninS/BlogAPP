const POSTS_LIST_LOCAL_STORAGE_KEY = 'postlist';
const POST_TITLE_VALIDATION_MESSAGE = '0/50';
const POST_TEXT_VALIDATION_MESSAGE = '0/500';
const POSTS_EMPTY_INIT_HTML =
  '<h3 class="emptyPosts">Тут пока ничего нет... </h3>';
const POSTS_EMPTY_REFRESH_HTML =
  '<h3 class="emptyPosts">Ah, shit, here we go again...</h3>';

const postTitleFromUserNode = document.querySelector('#post-title-input');
const postTextFromUserNode = document.querySelector('#post-text-input');
const postTitleValidationMessageNode = document.querySelector(
  '#post-title-validation-message'
);
const postTextValidationMessageNode = document.querySelector(
  '#post-text-validation-message'
);
const submitBtnNode = document.querySelector('#post-submit-btn');
const inputErrorMessageNode = document.querySelector('#inputErrorMessage');
const postListClearBtnNode = document.querySelector('#clearPostsList');
const postsNode = document.querySelector('#posts');
postsNode.innerHTML = POSTS_EMPTY_INIT_HTML;
let postListStorage = localStorage.getItem(POSTS_LIST_LOCAL_STORAGE_KEY);
checkStorageAndInitPostsList();
const post = {
  date: '',
  title: '',
  text: '',
};

postTitleFromUserNode.addEventListener('input', (e) => validateTitleInput(e));

postTextFromUserNode.addEventListener('input', (e) => validateTextInput(e));

submitBtnNode.addEventListener('click', (e) => submitFormByClick(e));

postTitleFromUserNode.addEventListener('keydown', (e) =>
  submitFormByCltrlEnterInTitleInput(e)
);

postTextFromUserNode.addEventListener('keydown', (e) =>
  submitFormByCtrlEnterInTextInput(e)
);

postListClearBtnNode.addEventListener('click', (e) =>
  clearLocalStorageAndRefreshLayout(e)
);

//Сломал весь мозг на том, как унести нижеследующие функции в другой файл, но понял что нужно переписать логику всего приложения и добиться чистоты функций, посему эти функции поживут здесь.

function checkStorageAndInitPostsList() {
  postListStorage = JSON.parse(
    localStorage.getItem(POSTS_LIST_LOCAL_STORAGE_KEY)
  );
  if (Array.isArray(postListStorage)) {
    postsList = postListStorage;
    renderPosts(postsList);
    postListClearBtnNode.classList.remove('invisible');
  } else postsList = [];
}

function renderPosts(postsList) {
  postsNode.innerHTML = postsList.join('');
}
