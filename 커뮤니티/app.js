const postList = document.getElementById('post-list');
const postForm = document.getElementById('post-form');
const postTitle = document.getElementById('post-title');
const postContent = document.getElementById('post-content');
const postSubmit = document.getElementById('post-submit');

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');
const signupName = document.getElementById('signup-name');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupBtn = document.getElementById('signup-btn');
const signupLink = document.getElementById('signup-link');
const writePostBtn = document.getElementById('write-post-btn');
const anonymousWrite = document.getElementById('anonymous-write');


let posts = JSON.parse(localStorage.getItem('posts')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];
let nickname = '익명';
let isLoggedIn = false;
let anonymousCount = 1;

function renderPosts() {
postList.innerHTML = '';

posts.slice().reverse().forEach((post, index) => {
const postElement = document.createElement('div');
postElement.className = 'post';


let author = post.author || '익명';
if (!isLoggedIn && author === '익명') {
  author = `익명${anonymousCount}`;
  anonymousCount++;
}

const headerElement = document.createElement('div');
headerElement.className = 'post-header';
headerElement.style.display = 'flex';
headerElement.style.justifyContent = 'space-between';
headerElement.style.alignItems = 'center';

const titleElement = document.createElement('div');
titleElement.className = 'post-title';
titleElement.style.fontWeight = 'bold';
titleElement.style.fontSize = '1.1em';
titleElement.style.marginRight = '10px';
titleElement.textContent = post.title || '(제목없음)';

const authorElement = document.createElement('div');
authorElement.className = 'post-author';
authorElement.style.fontWeight = '300';
authorElement.style.textAlign = 'right';
authorElement.textContent = author;

const contentElement = document.createElement('div');
contentElement.className = 'post-content';
contentElement.style.marginTop = '10px';
contentElement.textContent = post.content;

const commentsElement = document.createElement('div');
commentsElement.className = 'comments';
if (post.comments.length > 0) {
let anonymousCommentCount = 1;
post.comments.forEach(comment => {
const commentElement = document.createElement('div');
commentElement.className = 'comment';


let commentAuthor = comment.author;
if (commentAuthor === '익명') {
  commentAuthor = `익명${anonymousCommentCount}`;
  anonymousCommentCount++;
}

const commentAuthorElement = document.createElement('div');
commentAuthorElement.className = 'comment-author';
commentAuthorElement.textContent = commentAuthor + ':';

const commentContentElement = document.createElement('div');
commentContentElement.className = 'comment-content';
commentContentElement.textContent = comment.content;

commentElement.appendChild(commentAuthorElement);
commentElement.appendChild(commentContentElement);
commentsElement.appendChild(commentElement);
});
} else {
commentsElement.style.display = 'none';
}

const commentFormElement = document.createElement('div');
commentFormElement.className = 'comment-form';

const commentInput = document.createElement('input');
commentInput.placeholder = '댓글 입력...';

const commentSubmit = document.createElement('button');
commentSubmit.textContent = '댓글 작성';
commentSubmit.addEventListener('click', () => {
  if (commentInput.value.trim() !== '') {
    post.comments.push({ author: nickname, content: commentInput.value.trim() });
    commentInput.value = '';
    renderPosts();
  }
});

  const deletePostBtn = document.createElement('button');
  deletePostBtn.textContent = '삭제';
  deletePostBtn.addEventListener('click', () => {
    if (post.author === nickname) {
      posts.splice(posts.length - index - 1, 1); // 해당 인덱스의 글 삭제
      renderPosts();
      saveData();
    } else {
      alert('자신의 글만 삭제할 수 있습니다.');
    }
  });
  if (post.author === nickname) {
    postElement.appendChild(deletePostBtn);
  }
  commentFormElement.appendChild(commentInput);
  commentFormElement.appendChild(commentSubmit);


headerElement.appendChild(titleElement);
headerElement.appendChild(authorElement);
postElement.appendChild(headerElement);
postElement.appendChild(contentElement);
postElement.appendChild(commentsElement);
postElement.appendChild(commentFormElement);
postElement.appendChild(deletePostBtn);
postList.prepend(postElement);
});

  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.remove();
  }

if (isLoggedIn) {
  postForm.appendChild(postSubmit);

  const logoutButton = document.createElement('button');
  logoutButton.id = 'logout-button';
  logoutButton.textContent = '로그아웃';
  logoutButton.addEventListener('click', () => {
    isLoggedIn = false;
    nickname = '익명';
    loginForm.style.display = 'block';
    postForm.style.display = 'none';
    renderPosts();
  });

  postForm.appendChild(logoutButton);
} else {
  postForm.appendChild(postSubmit);
}

  document.body.prepend(postForm);
}

renderPosts();

loginBtn.addEventListener('click', () => {
  const user = users.find(u => u.email === loginEmail.value && u.password === loginPassword.value);
  if (user) {
    loginForm.style.display = 'none';
    nickname = user.name;
    isLoggedIn = true;
    postForm.style.display = 'block';
    renderPosts();
  } else {
    alert('이메일 또는 비밀번호가 일치하지 않습니다.');
  }
});

loginBtn.addEventListener('click', () => {
const user = users.find(u => u.email === loginEmail.value && u.password === loginPassword.value);
if (user) {
loginForm.style.display = 'none';
logoutBtn.style.display = 'block';
writePostBtn.style.display = 'none';
nickname = user.name;
isLoggedIn = true;
postForm.style.display = 'block';
renderPosts();
} else {
alert('이메일 또는 비밀번호가 일치하지 않습니다.');
}
});

signupBtn.addEventListener('click', () => {
const newUser = {
name: signupName.value,
email: signupEmail.value,
password: signupPassword.value
};
users.push(newUser);
localStorage.setItem('users', JSON.stringify(users));
alert('회원가입이 완료되었습니다.');
signupForm.style.display = 'none';
loginForm.style.display = 'block';
});

signupLink.addEventListener('click', () => {
signupForm.style.display = 'block';
loginForm.style.display = 'none';
});

writePostBtn.addEventListener('click', () => {
if (isLoggedIn) {
postForm.style.display = 'block';
writePostBtn.style.display = 'none';
} else {
loginForm.style.display = 'block';
writePostBtn.style.display = 'none';
}
});

anonymousWrite.addEventListener('click', () => {
postForm.style.display = 'block';
loginForm.style.display = 'none';
writePostBtn.style.display = 'none';
nickname = '익명';
isLoggedIn = false;
});

postSubmit.addEventListener('click', () => {
if (postTitle.value.trim() !== '' && postContent.value.trim() !== '') {
const newPost = {
title: postTitle.value.trim(),
content: postContent.value.trim(),
author: nickname,
comments: []
};
posts.unshift(newPost);
postTitle.value = '';
postContent.value = '';
renderPosts();
saveData();
}
});

function saveData() {
localStorage.setItem('posts', JSON.stringify(posts));
localStorage.setItem('users', JSON.stringify(users));
}