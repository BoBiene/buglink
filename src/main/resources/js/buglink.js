(function($) {
    window.episerver = window.episerver || {};
    episerver.buglink = episerver.buglink || {};
    episerver.buglink.getBugs = function() {
        var pr = require('model/page-state').getPullRequest(), links = [];
        if (pr && pr.attributes) {
            if (pr.attributes.title) {
                links = links.concat(getLinks(pr.attributes.title));
            }
            if (pr.attributes.description) {
                links = links.concat(getLinks(pr.attributes.description));
            }
            if (pr.attributes.fromRef && pr.attributes.fromRef.attributes && pr.attributes.fromRef.attributes.displayId) {
                links = links.concat(getLinks(pr.attributes.fromRef.attributes.displayId));
            }
        }
        var seen={}, uniqueLinks = $.grep(links, function(l) {
            if (seen[l.title]) {
                return false;
            }
            seen[l.title] = true;
            return true;
        });
        return {links: uniqueLinks};
    };

    function getLinks(text) {
        var regex = /[#\/](\d+)/g, pattern = "http://tfs01vm:8080/tfs/web/UI/Pages/WorkItems/WorkItemEdit.aspx?id={$id}";
        var match = [], result = [];
        while(match = regex.exec(text)) {
            var href = pattern.replace("{$id}", match[1]);
            var title = "#"+match[1];
            result.push({href: href, title: title});
        }
        return result;
    }
})(AJS.$)