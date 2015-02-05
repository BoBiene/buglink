(function($) {
    window.episerver = window.episerver || {};
    window.episerver.buglink = episerver.buglink || {};
    window.episerver.buglink.getBugs = function() {
        var pr = require('model/page-state').getPullRequest(),
            project = require('model/page-state').getProject(),
            repository = require('model/page-state').getRepository(),
            links = [];

        if (pr && pr.attributes
            && project && project.attributes
            && repository && repository.attributes) {
            if (pr.attributes.title) {
                links = links.concat(getLinks(pr.attributes.title));
            }
            if (pr.attributes.description) {
                links = links.concat(getLinks(pr.attributes.description));
            }
            if (pr.attributes.fromRef && pr.attributes.fromRef.attributes
                && pr.attributes.fromRef.attributes.displayId) {
                links = links.concat(getLinks(pr.attributes.fromRef.attributes.displayId));
            }

            var url = "/stash/rest/api/1.0/projects/"+project.attributes.key
                        +"/repos/"+repository.attributes.slug
                        +"/pull-requests/"+pr.attributes.id
                        +"/commits?withCounts=true";
            $.ajax({
                url: url,
                success: function(data) {
                    $.each(data.values, function(i, commit) {
                        links = links.concat(getLinks(commit.message));
                    })
                },
                async: false // TODO: Consider async: true, when find how to render SOY template with async data
            });
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
        var regex = /[#\/](\d+)/g, // TODO: Move these parameters to configuration
            pattern = "http://tfs01vm:8080/tfs/web/UI/Pages/WorkItems/WorkItemEdit.aspx?id={$id}",
            match = [], result = [];
        while(match = regex.exec(text)) {
            var href = pattern.replace("{$id}", match[1]);
            var title = "#"+match[1];
            result.push({href: href, title: title});
        }
        return result;
    }
})(AJS.$)