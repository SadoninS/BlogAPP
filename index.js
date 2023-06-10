const POSTS_LIST_LOCAL_STORAGE_KEY = 'postlist';
const POSTS_EMPTY_INIT_HTML =
  '<h3 class="emptyPosts">Тут пока ничего нет... </h3>';
const POSTS_EMPTY_REFRESH_HTML =
  '<h3 class="emptyPosts">Ah, shit, here we go again...</h3>';

const postTitleFromUser = document.querySelector('#post-title-input');
const postTextFromUser = document.querySelector('#post-text-input');

const postTitleValidationMessageNode = document.querySelector(
  '#post-title-validation-message'
);
const postTextValidationMessageNode = document.querySelector(
  '#post-text-validation-message'
);
const publishBtnNode = document.querySelector('#post-publish-btn');
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

publishBtnNode.addEventListener('click', (e) => submitFormByClick(e));

postTitleFromUser.addEventListener('input', (e) => validationTitleInput(e));

postTitleFromUser.addEventListener('keydown', (e) =>
  submitFormByCltrlEnterInTitleInput(e)
);

postTextFromUser.addEventListener('input', (e) => validationTextInput(e));

postTextFromUser.addEventListener('keydown', (e) =>
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
