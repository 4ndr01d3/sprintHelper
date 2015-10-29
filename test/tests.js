import { Point } from '../es6/point.js';
let expect = require('chai').expect;

describe('Point', () => {
    it('sets up instance properties correctly', () => {
         let p = new Point(1, 5);
         expect(p.x).to.be.equal(1);
         expect(p.y).to.be.equal(5);
    });
});
