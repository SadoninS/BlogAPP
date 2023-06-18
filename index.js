const POSTS_LIST_LOCAL_STORAGE_KEY = 'postlist';
const POST_TITLE_VALIDATION_MESSAGE = '0/50';
const POST_TEXT_VALIDATION_MESSAGE = '0/500';
const POSTS_DESCRIPTION_INIT_TEXT = 'Тут пока ничего нет...';
const POSTS_DESCRIPTION_TEXT = 'Самые свежие посты:';
const POSTS_DESCRIPTION_REFRESH_TEXT = 'Ah, shit, here we go again...';

const postTitleFromUserNode = document.querySelector('#post-title-input');
const postTextFromUserNode = document.querySelector('#post-text-input');
const postTitleValidationMessageNode = document.querySelector('#post-title-validation-message');
const postTextValidationMessageNode = document.querySelector('#post-text-validation-message');
const submitBtnNode = document.querySelector('#post-submit-btn');
const inputErrorMessageNode = document.querySelector('#inputErrorMessage');
const postListClearBtnNode = document.querySelector('#clearPostsList');
const postsNode = document.querySelector('#posts');
const postsDescription = document.querySelector('#postsDescription');

let post = {
  date: '',
  title: '',
  text: '',
};
let postsListStorage = JSON.parse(localStorage.getItem(POSTS_LIST_LOCAL_STORAGE_KEY));
let postsList = Array.isArray(postsListStorage) ? postsListStorage : [];

initApp();

postTitleFromUserNode.addEventListener('input', (e) => validateTitleInput(e));

postTextFromUserNode.addEventListener('input', (e) => validateTextInput(e));

submitBtnNode.addEventListener('click', (e) => submitFormByClick(e));

postTitleFromUserNode.addEventListener('keydown', (e) => submitFormByCltrlEnterInTitleInput(e));

postTextFromUserNode.addEventListener('keydown', (e) => submitFormByCtrlEnterInTextInput(e));

postListClearBtnNode.addEventListener('click', (e) => clearLocalStorageAndRefreshLayout(e));
