var isModern = function() { 
     return ('querySelector' in document && 'addEventListener' in window && 'localStorage' in window && 'sessionStorage' in window)
};
