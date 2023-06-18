function initApp() {
  if (postsListStorage === null) {
    postsDescription.innerText = POSTS_DESCRIPTION_INIT_TEXT;
  } else {
    renderPosts(postsList);
    postsDescription.innerText = POSTS_DESCRIPTION_TEXT;
    postListClearBtnNode.classList.remove('invisible');
  }
}

function validateTitleInput() {
  inputErrorMessageNode.classList.add('opacity');
  if (postTitleFromUserNode.value.length >= 0) {
    postTitleValidationMessageNode.innerText = `${postTitleFromUserNode.value.length}/50`;
    postTitleValidationMessageNode.classList.remove('overLength');
    postTitleFromUserNode.classList.remove('borderRed');
  }
  if (postTitleFromUserNode.value.length > 50) {
    postTitleValidationMessageNode.classList.add('overLength');
    postTitleFromUserNode.classList.add('borderRed');
  }
}

function validateTextInput() {
  inputErrorMessageNode.classList.add('opacity');
  if (postTextFromUserNode.value.length >= 0) {
    postTextValidationMessageNode.innerText = `${postTextFromUserNode.value.length}/500`;
    postTextValidationMessageNode.classList.remove('overLength');
    postTextFromUserNode.classList.remove('borderRed');
  }
  if (postTextFromUserNode.value.length > 500) {
    postTextValidationMessageNode.classList.add('overLength');
    postTextFromUserNode.classList.add('borderRed');
  }
}

function emptyStringValidation(post) {
  return post.title !== '' && post.text !== '';
}

function lengthValidation(post) {
  return post.title.length <= 50 && post.text.length <= 500;
}

function validationPassed(post) {
  return lengthValidation(post) && emptyStringValidation(post);
}

function resetValidationMessages(postTitleValidationMessageNode, postTextValidationMessageNode) {
  postTitleValidationMessageNode.innerText = POST_TITLE_VALIDATION_MESSAGE;
  postTextValidationMessageNode.innerText = POST_TEXT_VALIDATION_MESSAGE;
  postTitleValidationMessageNode.classList.remove('overLength');
  postTextValidationMessageNode.classList.remove('overLength');
}

function clearLocalStorageAndRefreshLayout() {
  localStorage.clear();
  postsNode.innerHTML = '';
  postsList = [];
  postsDescription.innerText = POSTS_DESCRIPTION_REFRESH_TEXT;
  postListClearBtnNode.classList.add('invisible');
}

function showSubmitErrorMessage(inputErrorMessageNode) {
  if (!validationPassed(post)) {
    inputErrorMessageNode.classList.remove('opacity');
  }
}

function hideSubmitErrorMessage(inputErrorMessageNode) {
  inputErrorMessageNode.classList.add('opacity');
}

function getPostFromUser(postTitleFromUserNode, postTextFromUserNode) {
  const dt = new Date();
  const dtOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  post.date = dt.toLocaleString('ru', dtOptions);
  post.title = postTitleFromUserNode.value.trim();
  post.text = postTextFromUserNode.value.trim();
  post.text = postTextFromUserNode.value.replace(/\n/g, '<br/>');

  return post;
}

function setPost(post) {
  let newPost = {
    date: post.date,
    title: post.title,
    text: post.text,
  };

  postsList.push(newPost);

  postTitleFromUserNode.value = '';
  postTextFromUserNode.value = '';
  postListClearBtnNode.classList.remove('invisible');

  postsListStorage = JSON.stringify(postsList);
  localStorage.setItem(POSTS_LIST_LOCAL_STORAGE_KEY, postsListStorage);
  postsDescription.innerText = POSTS_DESCRIPTION_TEXT;
}

function renderPosts(postsList) {
  postsNode.innerHTML = '';
  postsList.forEach((post) => {
    let postHTML = document.createElement('li');
    postHTML.classList.add('post');
    postHTML.innerHTML = `
    <p class="post-date">${post.date}</p>
    <p class="post-title">${post.title}</p>
    <p class="post-text">${post.text}</p>`;
    postsNode.appendChild(postHTML);
  });
}

function submitFormByClick() {
  getPostFromUser(postTitleFromUserNode, postTextFromUserNode);
  if (validationPassed(post)) {
    setPost(post);
    renderPosts(postsList);
    resetValidationMessages(postTitleValidationMessageNode, postTextValidationMessageNode);
    hideSubmitErrorMessage(inputErrorMessageNode);
  } else showSubmitErrorMessage(inputErrorMessageNode);
}

function submitFormByCltrlEnterInTitleInput(event) {
  if (event.keyCode == '13') event.preventDefault();
  if (event.keyCode == '13' && event.ctrlKey) {
    event.preventDefault();
    getPostFromUser(postTitleFromUserNode, postTextFromUserNode);
    if (validationPassed(post)) {
      setPost(post);
      renderPosts(postsList);
      resetValidationMessages(postTitleValidationMessageNode, postTextValidationMessageNode);
      hideSubmitErrorMessage(inputErrorMessageNode);
    } else showSubmitErrorMessage(inputErrorMessageNode);
  }
}

function submitFormByCtrlEnterInTextInput(event) {
  if (event.keyCode == '13' && event.ctrlKey) {
    event.preventDefault();
    getPostFromUser(postTitleFromUserNode, postTextFromUserNode);
    if (validationPassed(post)) {
      setPost(post);
      renderPosts(postsList);
      resetValidationMessages(postTitleValidationMessageNode, postTextValidationMessageNode);
      hideSubmitErrorMessage(inputErrorMessageNode);
    } else showSubmitErrorMessage(inputErrorMessageNode);
  }
}
