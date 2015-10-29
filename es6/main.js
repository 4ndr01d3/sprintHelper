import {Developer} from './developer.js';
import {Sprint} from './sprint.js';


jQuery(function(){
    $.getJSON("sprint76.json").then((data) => {
        let spr = new Sprint(data.name, data.projects, data.developers);
        spr.renderTable("#developers");
        spr.renderProjects("#projects");
    });
});

