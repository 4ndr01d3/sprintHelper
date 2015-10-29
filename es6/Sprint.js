import {Developer} from './developer.js';
import 'jsgrid';
import '../node_modules/jsgrid/dist/jsgrid.css';
import '../node_modules/jsgrid/dist/jsgrid-theme.css';

import '../node_modules/gauge-shsh/js/gauge.js';
import '../node_modules/gauge-shsh/css/gauge.css';
//import 'gauge-shsh';
//import Gauge from 'gauge-shsh';

export class Sprint {
    constructor(name,projects=[],developers=[]) {
        this.name = name;
        this.projects = projects;
        this.developers = [];
        for (let dev of developers)
            this.addDeveloper(dev);


    }
    addDeveloper(dev) {
        let dev_obj = new Developer(dev);
        for (let proj of this.projects)
            dev_obj[proj.name]=dev[proj.name] | 0;
        this.developers.push(dev_obj);
    }
    addDevelopers(...developers) {
        this.developers = [...this.developers, ...developers];
    }
    toString() {
        return '('+this.name+')';
    }
    getTotalHours() {
        let total = 0;
        for (let dev of this.developers){
            total += dev.availability;
        }
        return total;
    }
    renderTable(selector="body") {
        this.table_selector=selector;
        let fields =[
            {   name: "name",
                title: "Developer",
                type: "text",
                width: 150
            }, {
                name: "availability",
                title:"Availability (days)",
                type: "number",
                width: 80
            }, {
                name: "sprint_availability",
                title:"Sprint Availability (hours)",
                type: "number",
                width: 80
            }
        ];
        for (let project of this.projects)
            fields.push({name: project.name, type: "number", title: project.name+" (%)",width: 40})

        jQuery(selector).jsGrid({
            width: "80%",
            height: "400px",
            editing: true,
            fields: [...fields,{ type: "control" }],
            data: this.developers,
            onItemUpdated: ({row,item,itemIndex,previousItem,grid}) => {
                this.developers[itemIndex].refreshSprintAvailability();
                this.refreshProjectsAllocation();
                jQuery(this.table_selector).jsGrid("refresh");
                let total =this.getTotalHours();
                $('#total_available').html('Total hours: ' + total * 8+' - Productive hours:'+(total)*2.5);
            }

        });
    }
    refreshProjectsAllocation(){
        for (let proj of this.projects){
            proj.allocation=0;
            for (let dev of this.developers){
                proj.allocation += (dev.sprint_availability*dev[proj.name])/100;
            }
            this.refreshProjectBlock(proj);
        }

    }
    refreshProjectBlock (project) {
        $(`#project_${project.name} .allocation`).html(`${project.allocation}`);
        if (!project.gauge) {

            let element =document.querySelector(`#project_${project.name} .proj-gauge`);
            project.gauge = new Gauge(element);
            project.gauge.setValue(5.5);



        //    $(document.querySelector(`#project_${project.name} .gauge-widget`)).hide();
        }
    }
    renderProjects(selector){
        this.projects_selector = selector;
        let sel = "";

        for (let project of this.projects) {
            $(this.projects_selector).append(`<div id='project_${project.name}' class="project-block">${project.name}: <span class="allocation"></span><div class="proj-gauge"></div></div>`)
            sel = this.projects_selector;
        }

        //let element =document.querySelector(this.projects_selector);
        //let gauge = new Gauge(element);
        //gauge.setValue(5.5);
    }
}
