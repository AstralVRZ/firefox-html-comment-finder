function filterNone() {
    return NodeFilter.FILTER_ACCEPT;
}

function getAllComments(rootElem) {
    let comments = [];
    let iterator = document.createNodeIterator(rootElem, NodeFilter.SHOW_COMMENT, filterNone, false);
    let curNode;
    while (curNode = iterator.nextNode()) {
        comments.push(curNode.nodeValue);
    }
    return comments;
}

setTimeout(() => {
    browser.runtime.sendMessage({ action: "set", comments: getAllComments(document).filter(c => c.trim().length > 0) });
}, 500);

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "get") {
        sendResponse(getAllComments(document).filter(c => c.trim().length > 0));
    }
});
