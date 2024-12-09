function setCurrentPathInLocalStorage(currentPath) {
   localStorage.setItem('currentPath', JSON.stringify(currentPath));
}

function setLocalStorageValueOnLogin(firstName, lastName, user, role, access_token) {
   localStorage.setItem('firstName', JSON.stringify(firstName));
   localStorage.setItem('lastName', JSON.stringify(lastName));
   localStorage.setItem('user', JSON.stringify(user));
   localStorage.setItem('access_token', JSON.stringify(access_token));
   localStorage.setItem('isAuthenticated', JSON.stringify("true"));
   localStorage.setItem('role', JSON.stringify(role));
}

function setLocalStorageOnLogout() {
   localStorage.setItem('firstName', JSON.stringify(""));
   localStorage.setItem('lastName', JSON.stringify(""));
   localStorage.setItem('user', JSON.stringify(""));
   localStorage.setItem('access_token', JSON.stringify(""));
   localStorage.setItem('isAuthenticated', JSON.stringify("false"));
   localStorage.setItem('role', JSON.stringify(""));
}

function isUnauthorized(e) {
   return (e.status === 403);
}

export { setCurrentPathInLocalStorage, setLocalStorageValueOnLogin, setLocalStorageOnLogout, isUnauthorized }
