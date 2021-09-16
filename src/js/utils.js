
function getQuerystringParams(querystring) {
    const urlSearchParams = new URLSearchParams(querystring ?? window.location.search) 
    const qsParams = Object.fromEntries(urlSearchParams.entries());

    return qsParams;
}

/**
 * 
 * @param {EventTarget} eventTarget 
 * @returns {Element}
 */
function getElemClickedByClass(eventTarget, classSelector){
    if(eventTarget.classList.contains(classSelector)){
        return eventTarget;
    }

    if(eventTarget.closest(`.${classSelector}`) != null){
        return eventTarget.closest(`.${classSelector}`);
    }

    return null;
}


module.exports = {getQuerystringParams, getElemClickedByClass}