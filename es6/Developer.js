export class Developer {
    constructor({name="",availability=0}) {
        this.name = name;
        this.availability = availability;
        this.refreshSprintAvailability();
    }
    refreshSprintAvailability() {
        this.sprint_availability = this.availability * 2.5;
    }
    toString() {
        return '('+this.name+')';
    }

}
